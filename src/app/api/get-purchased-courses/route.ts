import authOptions from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await dbConnect(); // Ensure this function correctly handles database connections

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

   
    const user = await User.findById(session.user.id).populate("purchasedCourses");

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found in database",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      courses: user.purchasedCourses || []
    });

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
