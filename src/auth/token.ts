import type { JWT } from "next-auth/jwt";
import { SESSION_LIFETIME_SECONDS } from "./constants";
import { buildGatewayUrl, postJson } from "./gateway";
import type { GatewayAuthResponse } from "./types";

export function getExpiryTimestamp(expiresIn = SESSION_LIFETIME_SECONDS) {
  return Date.now() + expiresIn * 1000;
}

export function isTokenValid(token: JWT) {
  return Date.now() < (token.expiresAt ?? 0);
}

export function toSessionUser(
  authUser: GatewayAuthResponse["user"],
  fallbackEmail = "",
) {
  return {
    id: authUser?.userId ?? authUser?.email ?? fallbackEmail,
    email: authUser?.email ?? fallbackEmail,
    name: authUser?.email ?? fallbackEmail,
    roles: authUser?.roles ?? [],
  };
}

export async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    if (!token.refreshToken) throw new Error("Missing refresh token.");
    const refreshUrl = buildGatewayUrl("/api/auth/refresh");
    const response = await postJson<GatewayAuthResponse>(refreshUrl, {
      refreshToken: token.refreshToken,
    });
    if (!response.ok) throw new Error("Failed to refresh token.");
    const result = response.data;

    return {
      ...token,
      accessToken: result.accessToken,
      refreshToken: result.refreshToken ?? token.refreshToken,
      expiresAt: getExpiryTimestamp(result.expiresIn),
      error: undefined,
    };
  } catch {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
