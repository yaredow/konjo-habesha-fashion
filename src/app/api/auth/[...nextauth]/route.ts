import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import User from "@/models/authModel";
import { login } from "@/server/actions/account/login";
import connectMongoDB from "@/utils/db/db";

const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,

      authorization: {
        params: {
          prompt: "consent",
        },
      },
      httpOptions: {
        timeout: 10000,
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_APP_ID as string,
      clientSecret: process.env.FACEBOOK_APP_ID_SECRET as string,

      httpOptions: {
        timeout: 10000,
      },
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "" },
        password: { label: "Password", type: "password", placeholder: "" },
      },

      async authorize(credentials: any) {
        if (!credentials.email || !credentials.password) {
          throw new Error("Invalid credentials");
        }
        const user = await login(credentials);

        if (user) {
          return user;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("signin");
      if (account?.provider === "google" || "facebook") {
        const { name, email } = user as {
          name: string;
          email: string;
        };

        try {
          await connectMongoDB();
          const userExists = await User.findOne({ email });

          if (!userExists) {
            const newUser = await User.create({
              fullName: name,
              email,
              verified: true,
            });

            return newUser;
          }
        } catch (error) {
          console.error(error);
        }
      }
      return user;
    },
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user._id,
          fullName: user.fullName,
          role: user.role,
        };
      }
      return token;
    },
    async session({ session, token, user }) {
      if (user) {
        session.user = {
          ...session.user,
          id: token.id,
          name: token.fullName,
          role: token.role,
        };
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
