import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { loginFormSchema } from "./utils/validators/form-validators";
import { createSession } from "./lib/session";

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

          const parsedData = loginFormSchema.safeParse({
            email: credentials.email,
            password: credentials.password,
          });

          if (!parsedData.success) {
            throw new Error("Invalid credentials");
          }

          const { email, password } = parsedData.data;

          user = await prisma.user.findUnique({
            where: { email },
            select: { id: true, password: true, name: true, role: true },
          });

          if (!user) {
            throw new Error("User not found");
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

          await createSession(user as User);

          return user;
        } catch (error) {
          console.error(error);
          throw error;
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
