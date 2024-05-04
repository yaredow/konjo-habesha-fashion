import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import Credentials from "next-auth/providers/credentials";
import { loginFormSchema } from "./utils/validators/form-validators";
import prisma from "./lib/prisma";
import bcrypt from "bcryptjs";

export default {
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

          if (parsedData.success) {
            const { email, password } = parsedData.data;

            user = await prisma.user.findUnique({
              where: { email },
              select: { id: true, password: true, name: true, role: true },
            });

            if (!user || !user.password) return null;

            const isPasswordCorrect = await bcrypt.compare(
              password,
              user.password,
            );

            if (isPasswordCorrect) return user;
          }

          return null;
        } catch (error) {
          console.error(error);
          throw error;
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
