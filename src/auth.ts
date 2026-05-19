import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
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
        token.expiresAt = Date.now() + (user.expiresIn ?? 0) * 1000;
        token.expiresAtUtc = user.expiresAtUtc ?? "";
        token.refreshToken = user.refreshToken ?? "";
        token.error = undefined;
        return token;
      }

      if (!asString(token.refreshToken)) {
        token.error = "RefreshTokenError";
        return token;
      }

      const expiresAt = asNumber(token.expiresAt);
      const shouldRefresh = !expiresAt || Date.now() >= expiresAt;
      if (!shouldRefresh) {
        return token;
      }

      try {
        console.log("[auth] calling refresh endpoint");
        const response = await fetch(REFRESH_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken: token.refreshToken }),
        });
        console.log("[auth] refresh response returned", response.status);

        const payload: unknown = await response.json();
        if (!response.ok || !isLoginResponse(payload)) {
          throw payload;
        }

        token.userId = payload.user.userId;
        token.userEmail = payload.user.email;
        token.roles = payload.user.roles;
        token.accessToken = payload.accessToken;
        token.tokenType = payload.tokenType;
        token.expiresIn = payload.expiresIn;
        token.expiresAt = Date.now() + payload.expiresIn * 1000;
        token.expiresAtUtc = payload.expiresAtUtc;
        token.refreshToken =
          payload.refreshToken || asString(token.refreshToken);
        token.error = undefined;
      } catch (error) {
        console.error("Error refreshing access token", error);
        token.error = "RefreshTokenError";
      }

      return token;
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
      session.refreshToken = asString(token.refreshToken);
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
    refreshToken: string;
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
