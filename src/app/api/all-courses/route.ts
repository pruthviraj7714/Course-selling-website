import dbConnect from "@/lib/dbConnect";
import Course from "@/models/Course";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest) {
  await dbConnect();

  const category = req.nextUrl.searchParams.get("category") || "";

  try {
    const query = category ? { category } : {};

    const courses = await Course.find(query);

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
      { status: 500 }
    );
  }
}
