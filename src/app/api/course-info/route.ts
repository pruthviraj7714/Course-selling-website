import dbConnect from "@/lib/dbConnect";
import Course from "@/models/Course";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    const courseId = req.nextUrl.searchParams.get("courseId");

    const course = await Course.findById(courseId);

    if (!course) {
      return NextResponse.json(
        {
          message: "No Course Found with the given Id",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        course,
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
