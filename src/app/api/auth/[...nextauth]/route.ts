import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import connectMongoDB from "@/lib/utils/mongo/db";
import User from "@/models/authModel";
import { login } from "@/server/actions/account/login";

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
          console.log(error);
        }
      }
      return user;
    },
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id;
      }
      return token;
    },
    async session({ session, token, user }) {
      if (token._id) {
        session.user._id = token._id;
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
