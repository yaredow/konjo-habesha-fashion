import NextAuth from "next-auth";
import authConfig from "./auth.config";

import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./lib/prisma";
import { getUserById } from "./data/user";

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    session: async ({ token, session }) => {
      if (token.sub && session.user) {
        session.user = {
          ...session.user,
          id: token.sub,
          image: token.picture,
          role: token.role as string,
          email: token.email as string,
        };
      }
      return session;
    },
    jwt: async ({ token }) => {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      token = {
        ...token,
        role: existingUser.role,
        image: existingUser.image,
        email: existingUser.email,
      };
      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  ...authConfig,
});
