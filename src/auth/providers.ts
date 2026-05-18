import Credentials from "next-auth/providers/credentials";
import type { Provider } from "next-auth/providers";
import { SESSION_LIFETIME_SECONDS } from "./constants";
import { buildGatewayUrl, postJson } from "./gateway";
import { toSessionUser } from "./token";
import type { GatewayAuthResponse } from "./types";

const credentialsProvider = Credentials({
  credentials: {
    email: {},
    password: {},
  },
  authorize: async (credentials) => {
    const email = typeof credentials?.email === "string" ? credentials.email : "";
    const password =
      typeof credentials?.password === "string" ? credentials.password : "";
    if (!email || !password) return null;

    const loginUrl = buildGatewayUrl("/api/auth/login");
    const response = await postJson<GatewayAuthResponse>(loginUrl, {
      email,
      password,
    });
    if (!response.ok) return null;

    const result = response.data;
    const user = toSessionUser(result.user, email);
    return {
      ...user,
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
      expiresIn: result.expiresIn ?? SESSION_LIFETIME_SECONDS,
    };
  },
});

export const providers: Provider[] = [credentialsProvider];
