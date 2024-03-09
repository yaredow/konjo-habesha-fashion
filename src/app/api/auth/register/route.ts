import User from "@/models/authModel";
import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/utils/mongo/db";

export async function POST(req: Request, res: Response) {
  try {
    const { fullName, email, password, passwordConfirm } = await req.json();
    await connectMongoDB();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" });
    }
    const newUser = await User.create({
      fullName,
      email,
      password,
      passwordConfirm,
    });

    NextResponse.json(
      { message: "Account created successfully" },
      { status: 201 },
    );
  } catch (err) {
    NextResponse.json(
      { message: "An error occurred while registering user" },
      { status: 500 },
    );
  }
}
