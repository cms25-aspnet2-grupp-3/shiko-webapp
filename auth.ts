import NextAuth from "next-auth";
import { SIGN_IN_PATH } from "@/auth/constants";
import { providers } from "@/auth/providers";
import { callbacks } from "@/auth/callbacks";
import { events } from "@/auth/events";
import { createProviderMap } from "@/auth/provider-map";

export const providerMap = createProviderMap(providers);

export const { handlers, auth, signIn, signOut } = NextAuth({
  debug: process.env.NODE_ENV === "development",
  providers,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: SIGN_IN_PATH,
  },
  events,
  callbacks,
});
