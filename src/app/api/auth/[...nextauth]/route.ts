import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import connectMongoDB from "@/lib/utils/mongo/db";
import User from "@/models/authModel";
import bcrypt from "bcryptjs";

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
      return session;
    },
    async signIn({ user, account }) {
      if (account?.provider === "google" || "facebook") {
        const { name, email } = user as {
          name: string;
          email: string;
        };

        try {
          await connectMongoDB();
          const userExists = await User.findOne({ email });

          if (!userExists) {
            const res = await fetch("http://localhost:3000/api/register", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                fullName: name,
                email,
                verified: true,
              }),
            });

            console.log(res);

            if (res.ok) {
              return user;
            }
          }
        } catch (error) {
          console.log(error);
        }
        return user;
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
