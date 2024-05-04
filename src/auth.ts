import NextAuth from "next-auth";
import authConfig from "./auth.config";

import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    session: async ({ token, session }) => {
      if (token.sub && session.user) {
        session.user = {
          ...session.user,
          id: token.sub,
          image: token.picture,
          email: token.email as string,
        };
      }
      return session;
    },
    jwt: async ({ token }) => {
      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  ...authConfig,
});
