import type { NextAuthConfig } from "next-auth";
import { buildGatewayUrl, postJson } from "./gateway";

export const events: NextAuthConfig["events"] = {
  async signOut(message) {
    const refreshToken =
      "token" in message ? message.token?.refreshToken : undefined;
    if (!refreshToken) return;

    try {
      const logoutUrl = buildGatewayUrl("/api/auth/logout");
      await postJson(logoutUrl, { refreshToken });
    } catch {
      return;
    }
  },
};
