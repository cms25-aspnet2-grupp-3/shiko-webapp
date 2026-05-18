import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    error?: string;
    roles?: string[];
    user: {
      id?: string;
      roles?: string[];
    } & DefaultSession["user"];
  }

  interface User {
    id?: string;
    roles?: string[];
    accessToken?: string;
    refreshToken?: string;
    expiresIn?: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: number;
    error?: string;
    user?: {
      id?: string;
      email?: string | null;
      name?: string | null;
      roles?: string[];
    };
  }
}
