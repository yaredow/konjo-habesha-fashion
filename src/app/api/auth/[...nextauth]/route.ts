import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import connectMongoDB from "@/lib/utils/mongo/db";
import User from "@/models/authModel";
import bcrypt from "bcryptjs";
import { SessionUserWithID } from "../../../../../type";

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
      id: "credentials",
      name: "Credentials",
      credentials: {},

      async authorize(credentials: any) {
        if (!credentials) return null;
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        try {
          await connectMongoDB();
          const user = await User.findOne({ email }).select("+password");

          console.log(user);

          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              password,
              user.password,
            );

            if (isPasswordCorrect) {
              return user;
            } else {
              throw new Error("Passord or email doesn't match");
            }
          } else {
            throw new Error("User does not exist.");
          }
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user?.email });

      if (session.user) {
        (session.user as SessionUserWithID).id = sessionUser._id;
      }

      return session;
    },
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
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
