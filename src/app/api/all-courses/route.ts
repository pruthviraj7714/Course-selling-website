import dbConnect from "@/lib/dbConnect";
import Course from "@/models/Course";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();

  try {
    const courses = await Course.find({});

    return NextResponse.json(
      {
        courses,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error.message);

    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 400 }
    );
  }
}
