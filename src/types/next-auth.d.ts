import { ObjectId } from "mongoose";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      _id: ObjectId;
    };
  }
  interface User {
    _id: ObjectId;
    fullName: String;
    email: String;
    password: String;
    role: String;
    active: Boolean;
    verified: Boolean;
    __v: Number;
  }
}
