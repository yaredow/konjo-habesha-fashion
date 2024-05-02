import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { loginFormSchema } from "./components/forms/LoginForm";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  theme: {
    logo: "/images/logo/logo.png",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    Google,
    Facebook,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          let user = null;

          const parsedData = loginFormSchema.safeParse(credentials);

          if (!parsedData.success) {
            return null;
          }

          const { email, password } = parsedData.data;

          user = await prisma.user.findUnique({
            where: { email },
            select: { password: true },
          });

          if (!user) {
            throw new Error("User does not exist.");
          }

          if (!user.password) {
            throw new Error(
              "It appears you previously signed up using social media. Please use your Google or Facebook account.",
            );
          }

          const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password,
          );
          if (!isPasswordCorrect) {
            throw new Error("Password or email doesn't match.");
          }

          return user;
        } catch (error) {
          if (error instanceof Error) {
            return null;
          } else {
            throw error;
          }
        }
      },
    }),
  ],
  callbacks: {
    session({ session, user }) {
      session.user.role = user.role;
      return session;
    },
  },
});
