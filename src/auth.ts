import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { JWT } from "next-auth/jwt";
import { NextResponse } from "next/server";

type LoginResponse = {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  expiresAtUtc: string;
  refreshToken: string;
  user: {
    userId: string;
    email: string;
    roles: string[];
  };
};

const LOGIN_URL =
  "https://cms25-aspnet2-grupp3-auth-gateway-api.azurewebsites.net/api/auth/login";
const REFRESH_URL =
  "https://cms25-aspnet2-grupp3-auth-gateway-api.azurewebsites.net/api/auth/refresh";
const isDev = process.env.NODE_ENV !== "production";
const REFRESH_BUFFER_MS = 60_000;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === "string");

const asString = (value: unknown): string =>
  typeof value === "string" ? value : "";

const asNumber = (value: unknown): number =>
  typeof value === "number" ? value : 0;

const isLoginResponse = (value: unknown): value is LoginResponse => {
  if (!isRecord(value) || !isRecord(value.user)) return false;

  return (
    typeof value.accessToken === "string" &&
    typeof value.tokenType === "string" &&
    typeof value.expiresIn === "number" &&
    typeof value.expiresAtUtc === "string" &&
    typeof value.refreshToken === "string" &&
    typeof value.user.userId === "string" &&
    typeof value.user.email === "string" &&
    isStringArray(value.user.roles)
  );
};

const calculateExpiresAt = (expiresInSeconds: number): number =>
  Date.now() + expiresInSeconds * 1000;

const shouldRefreshToken = (expiresAt: number): boolean =>
  !expiresAt || Date.now() >= expiresAt - REFRESH_BUFFER_MS;

const getSecondsUntilRefresh = (expiresAt: number): number =>
  Math.max(0, Math.ceil((expiresAt - REFRESH_BUFFER_MS - Date.now()) / 1000));

const refreshToken = async (token: JWT): Promise<JWT> => {
  try {
    if (isDev) {
      console.log("[auth] calling refresh endpoint");
    }

    const response = await fetch(REFRESH_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: token.refreshToken }),
    });

    if (isDev) {
      console.log("[auth] refresh response returned", response.status);
    }

    if (!response.ok) {
      throw new Error(`Refresh request failed (${response.status})`);
    }

    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.toLowerCase().includes("application/json")) {
      throw new Error("Refresh response was not JSON");
    }

    const payload: unknown = await response.json();
    if (!isLoginResponse(payload)) {
      throw new Error("Refresh token response shape was invalid");
    }

    return {
      ...token,
      userId: payload.user.userId,
      userEmail: payload.user.email,
      roles: payload.user.roles,
      accessToken: payload.accessToken,
      tokenType: payload.tokenType,
      expiresIn: payload.expiresIn,
      expiresAt: calculateExpiresAt(payload.expiresIn),
      expiresAtUtc: payload.expiresAtUtc,
      refreshToken: payload.refreshToken || token.refreshToken,
      error: undefined,
    };
  } catch (error) {
    const reason =
      error instanceof Error ? error.message : "Unknown refresh failure";
    console.error(`[auth] Refresh failed: ${reason}`);
    return {
      ...token,
      error: "RefreshTokenError",
      accessToken: "",
    };
  }
};

export const providerMap: Record<string, { id: string; name: string }> = {};

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {
          type: "email",
          label: "Email",
          placeholder: "johndoe@gmail.com",
        },
        password: {
          type: "password",
          label: "Password",
          placeholder: "*****",
        },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        if (isDev) {
          console.log("[auth] calling login endpoint");
        }
        const response = await fetch(LOGIN_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });
        if (isDev) {
          console.log("[auth] login response returned", response.status);
        }

        if (!response.ok) {
          return null;
        }

        const result: unknown = await response.json();
        if (!isLoginResponse(result)) {
          return null;
        }

        return {
          id: result.user.userId,
          email: result.user.email,
          roles: result.user.roles,
          accessToken: result.accessToken,
          tokenType: result.tokenType,
          expiresIn: result.expiresIn,
          expiresAtUtc: result.expiresAtUtc,
          refreshToken: result.refreshToken,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.userId = user.id ?? "";
        token.userEmail = user.email ?? "";
        token.roles = user.roles ?? [];
        token.accessToken = user.accessToken ?? "";
        token.tokenType = user.tokenType ?? "";
        token.expiresIn = user.expiresIn ?? 0;
        token.expiresAt = calculateExpiresAt(user.expiresIn ?? 0);
        token.expiresAtUtc = user.expiresAtUtc ?? "";
        token.refreshToken = user.refreshToken ?? "";
        token.error = undefined;
        return token;
      }

      if (!asString(token.refreshToken)) {
        token.error = "RefreshTokenError";
        token.accessToken = "";
        return token;
      }

      const expiresAt = asNumber(token.expiresAt);
      if (!shouldRefreshToken(expiresAt)) {
        return token;
      }

      return refreshToken(token);
    },
    session: async ({ session, token }) => {
      session.user = {
        ...session.user,
        id: asString(token.userId),
        email: asString(token.userEmail),
        roles: isStringArray(token.roles) ? token.roles : [],
      };

      session.accessToken = asString(token.accessToken);
      session.tokenType = asString(token.tokenType);
      session.expiresIn = asNumber(token.expiresIn);
      session.expiresAtUtc = asString(token.expiresAtUtc);
      session.error =
        asString(token.error) === "RefreshTokenError"
          ? "RefreshTokenError"
          : undefined;

      return session;
    },
    authorized: async ({ auth, request }) => {
      const dashboard = "/dashboard";
      const signin = "/signin";
      const pathname = request.nextUrl.pathname;
      const isRoot = pathname === "/";
      const isOnSignIn = pathname.startsWith(signin);

      const isLoggedIn = Boolean(
        auth?.accessToken && auth?.user?.id && auth?.user?.email,
      );

      if (isRoot) {
        return NextResponse.redirect(
          new URL(isLoggedIn ? dashboard : signin, request.nextUrl),
        );
      }

      if (isOnSignIn && isLoggedIn) {
        return NextResponse.redirect(new URL(dashboard, request.nextUrl));
      }

      if (!isOnSignIn && !isLoggedIn) {
        return NextResponse.redirect(new URL(signin, request.nextUrl));
      }

      return true;
    },
  },
  pages: {
    signIn: "/signin",
  },
});

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken: string;
    tokenType: string;
    expiresIn: number;
    expiresAtUtc: string;
    error?: "RefreshTokenError";
    user: { id: string; roles: string[] } & DefaultSession["user"];
  }

  interface User {
    id: string;
    email: string;
    roles: string[];
    accessToken: string;
    tokenType: string;
    expiresIn: number;
    expiresAtUtc: string;
    refreshToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId?: string;
    userEmail?: string;
    roles?: string[];
    accessToken?: string;
    tokenType?: string;
    expiresIn?: number;
    expiresAt?: number;
    expiresAtUtc?: string;
    refreshToken?: string;
    error?: "RefreshTokenError";
  }
}
