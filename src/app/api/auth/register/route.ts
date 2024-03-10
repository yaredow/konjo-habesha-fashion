import connectMongoDB from "@/lib/utils/mongo/db";
import User from "@/models/authModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(Request: NextRequest) {
  try {
    const { fullName, email, password, passwordConfirm } = await Request.json();
    await connectMongoDB();

    console.log(fullName, email, password);

    const user = await User.findOne({ email });

    if (user) {
      NextResponse.json({ message: "Account already exists" });
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
      {
        message: "An error occurred while registering user",
      },
      { status: 500 },
    );
  }
}
