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

type EmailCheckResponse = {
  exists: boolean;
  emailConfirmed: boolean;
  email: string;
  userId: string;
  error: string;
};

const LOGIN_URL =
  "https://cms25-aspnet2-grupp3-auth-gateway-api.azurewebsites.net/api/auth/login";
const REFRESH_URL =
  "https://cms25-aspnet2-grupp3-auth-gateway-api.azurewebsites.net/api/auth/refresh";
const CHECK_URL =
  "https://cms25-aspnet2-grupp3-auth-gateway-api.azurewebsites.net/api/auth/check";
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

const isEmailCheckResponse = (value: unknown): value is EmailCheckResponse => {
  if (!isRecord(value)) return false;

  return (
    typeof value.exists === "boolean" &&
    typeof value.emailConfirmed === "boolean" &&
    typeof value.email === "string" &&
    typeof value.userId === "string" &&
    typeof value.error === "string"
  );
};

const calculateExpiresAt = (expiresInSeconds: number): number =>
  Date.now() + expiresInSeconds * 1000;

const shouldRefreshToken = (expiresAt: number): boolean =>
  !expiresAt || Date.now() >= expiresAt - REFRESH_BUFFER_MS;

const getSecondsUntilRefresh = (expiresAt: number): number =>
  Math.max(0, Math.ceil((expiresAt - REFRESH_BUFFER_MS - Date.now()) / 1000));

const getEmailConfirmedStatus = async (email: string): Promise<boolean> => {
  if (!email) return true;

  try {
    const response = await fetch(CHECK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      return true;
    }

    const payload: unknown = await response.json();
    if (!isEmailCheckResponse(payload)) {
      return true;
    }

    return payload.emailConfirmed;
  } catch {
    return true;
  }
};

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

        const checkResponse = await fetch(CHECK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: result.user.email }),
        });

        if (!checkResponse.ok) {
          return null;
        }

        const checkResult: unknown = await checkResponse.json();
        if (!isEmailCheckResponse(checkResult)) {
          return null;
        }

        return {
          id: result.user.userId,
          email: result.user.email,
          emailConfirmed: checkResult.emailConfirmed,
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
    signIn: async ({ user }) => {
      const emailConfirmed = await getEmailConfirmedStatus(user.email ?? "");
      if (!emailConfirmed) {
        return "/verify-code";
      }

      return true;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.userId = user.id ?? "";
        token.userEmail = user.email ?? "";
        token.emailConfirmed = user.emailConfirmed ?? true;
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
        emailConfirmed:
          typeof token.emailConfirmed === "boolean" ? token.emailConfirmed : true,
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
      const verifyCode = "/verify-code";
      const pathname = request.nextUrl.pathname;
      const isRoot = pathname === "/";
      const isOnSignIn = pathname.startsWith(signin);
      const isOnVerifyCode = pathname.startsWith(verifyCode);
      const pendingVerifyCookie = request.cookies.get("pendingVerify")?.value;
      const verifyEmailCookie = request.cookies.get("verifyEmail")?.value ?? "";

      const isLoggedIn = Boolean(
        auth?.accessToken && auth?.user?.id && auth?.user?.email,
      );
      const isEmailConfirmed = isLoggedIn
        ? await getEmailConfirmedStatus(auth?.user?.email ?? "")
        : true;
      const hasPendingVerify =
        pendingVerifyCookie === "1" || Boolean(verifyEmailCookie);

      if (isRoot) {
        if (!isLoggedIn && hasPendingVerify) {
          const verifyUrl = new URL(verifyCode, request.nextUrl);
          if (verifyEmailCookie) {
            verifyUrl.searchParams.set("email", verifyEmailCookie);
          }
          return NextResponse.redirect(verifyUrl);
        }

        return NextResponse.redirect(
          new URL(
            isLoggedIn ? (isEmailConfirmed ? dashboard : verifyCode) : signin,
            request.nextUrl,
          ),
        );
      }

      if (isOnSignIn && isLoggedIn) {
        return NextResponse.redirect(
          new URL(isEmailConfirmed ? dashboard : verifyCode, request.nextUrl),
        );
      }

      if (isOnSignIn && !isLoggedIn && hasPendingVerify) {
        const verifyUrl = new URL(verifyCode, request.nextUrl);
        if (verifyEmailCookie) {
          verifyUrl.searchParams.set("email", verifyEmailCookie);
        }
        return NextResponse.redirect(verifyUrl);
      }

      if (isLoggedIn && !isEmailConfirmed && !isOnVerifyCode) {
        const verifyUrl = new URL(verifyCode, request.nextUrl);
        const verifyEmail = auth?.user?.email ?? "";
        if (verifyEmail) {
          verifyUrl.searchParams.set("email", verifyEmail);
        }
        const response = NextResponse.redirect(verifyUrl);
        response.cookies.set("pendingVerify", "1", {
          path: "/",
          httpOnly: true,
          sameSite: "lax",
          maxAge: 15 * 60,
        });
        if (verifyEmail) {
          response.cookies.set("verifyEmail", verifyEmail, {
            path: "/",
            httpOnly: true,
            sameSite: "lax",
            maxAge: 15 * 60,
          });
        }
        return response;
      }

      if (isOnVerifyCode) {
        const verifyEmailParam = request.nextUrl.searchParams.get("email") ?? "";
        const response = NextResponse.next();
        response.cookies.set("pendingVerify", "1", {
          path: "/",
          httpOnly: true,
          sameSite: "lax",
          maxAge: 15 * 60,
        });
        if (verifyEmailParam) {
          response.cookies.set("verifyEmail", verifyEmailParam, {
            path: "/",
            httpOnly: true,
            sameSite: "lax",
            maxAge: 15 * 60,
          });
        }
        return response;
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
    user: {
      id: string;
      emailConfirmed: boolean;
      roles: string[];
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    email: string;
    emailConfirmed?: boolean;
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
    emailConfirmed?: boolean;
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
