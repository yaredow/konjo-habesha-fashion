import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const { handlers, signIn, signOut, auth } = NextAuth({
  theme: {
    logo: "/images/logo/logo.png",
  },
  adapter: PrismaAdapter(prisma),
  providers: [Google, Facebook],
});
