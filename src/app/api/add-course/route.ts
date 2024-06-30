import authOptions from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Course from "@/models/Course";
import User from "@/models/User";
import { CourseSchema } from "@/schemas/courseSchema";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const data = await req.json();
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        { status: 403 }
      );
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

    const parsedData = CourseSchema.safeParse(data);

    if (!parsedData.success) {
      return NextResponse.json(
        {
          message: parsedData.error.errors.map((err) => err.message).join(", "),
        },
        { status: 404 }
      );
    }

    const {
      title,
      description,
      price,
      duration,
      instructor,
      category,
      thumbnail,
    } = parsedData.data;

    await Course.create({
      title,
      description,
      price,
      duration,
      instructor,
      category,
      thumbnail,
      creator: user._id,
    });

    return NextResponse.json({ message: "Course created successfully" });
  } catch (error) {
    console.error("Error creating course:", error);
    return NextResponse.json({ message: "Internal Server Error" });
  }
}
