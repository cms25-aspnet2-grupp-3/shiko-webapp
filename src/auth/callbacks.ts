import { NextResponse } from "next/server";
import type { NextAuthConfig } from "next-auth";
import { DASHBOARD_PATH, SIGN_IN_PATH } from "./constants";
import { getExpiryTimestamp, isTokenValid, refreshAccessToken } from "./token";

export const callbacks: NextAuthConfig["callbacks"] = {
  async jwt({ token, user }) {
    if (user) {
      token.user = {
        id: user.id ?? "",
        email: user.email,
        name: user.name,
        roles: user.roles ?? [],
      };
      token.accessToken = user.accessToken;
      token.refreshToken = user.refreshToken;
      token.expiresAt = getExpiryTimestamp(user.expiresIn);
      return token;
    }

    if (isTokenValid(token)) return token;
    return refreshAccessToken(token);
  },
  async session({ session, token }) {
    session.user = {
      ...session.user,
      id: token.user?.id ?? session.user?.email ?? "",
      roles: token.user?.roles ?? [],
      email: token.user?.email ?? session.user?.email ?? "",
      name: token.user?.name ?? session.user?.name ?? "",
    };
    session.accessToken = token.accessToken;
    session.error = token.error;
    session.roles = token.user?.roles ?? [];
    return session;
  },
  authorized({ auth, request }) {
    const isLoggedIn = !!auth?.user;
    const isRoot = request.nextUrl.pathname === "/";
    const isOnSignIn = request.nextUrl.pathname.startsWith(SIGN_IN_PATH);

    if (isRoot) {
      if (isLoggedIn) {
        return NextResponse.redirect(new URL(DASHBOARD_PATH, request.nextUrl));
      }
      return NextResponse.redirect(new URL(SIGN_IN_PATH, request.nextUrl));
    }

    if (isOnSignIn && isLoggedIn) {
      return NextResponse.redirect(new URL(DASHBOARD_PATH, request.nextUrl));
    }
    if (!isOnSignIn && !isLoggedIn) {
      return NextResponse.redirect(new URL(SIGN_IN_PATH, request.nextUrl));
    }
    return true;
  },
};
