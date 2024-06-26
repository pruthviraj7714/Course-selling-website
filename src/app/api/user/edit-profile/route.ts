import authOptions from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const editProfileSchema = z.object({
  name: z.string(),
  bio: z.string(),
  email: z.string().email(),
});

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        { status: 403 }
      );
    }

    const parsedData = editProfileSchema.safeParse(await req.json());

    if (!parsedData.success) {
      return NextResponse.json({
        message: "Invalid input",
        errors: parsedData.error.errors,
      });
    }

    const user = await User.findById(session.user.id);

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        { status: 403 }
      );
    }

    const {name, email, bio} = parsedData.data;

    user.name = name;
    user.email = email;
    user.bio = bio;

    await user.save();

    return NextResponse.json(
      {
        message: "Profile is Successfully updated",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
