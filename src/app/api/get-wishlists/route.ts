import authOptions from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
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
    const userId = session.user.id;

    const user = await User.findById(userId).populate("wishlist");

    return NextResponse.json(
      {
        courses: user?.wishlist,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({
      message: "Internal Server Error",
    });
  }
}
