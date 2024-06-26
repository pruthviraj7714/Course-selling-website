import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import dbConnect from "@/lib/dbConnect";

export async function POST(request: NextRequest) {
  const { name, email, password, gender } = await request.json();

  await dbConnect();

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      gender
    });

    // Assign role based on email
    if (email === process.env.ADMIN_EMAIL) {
      user.role = 'admin';
    }

    user.learningPoints = 12000;

    await user.save();


    return NextResponse.json(
      {
        message: "User Signed Up Successfully!"
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error(error.message);

    return NextResponse.json(
      {
        message: "Error signing up user",
        error: error.message
      },
      { status: 500 }
    );
  }
}
