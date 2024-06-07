import dbConnect from "@/lib/dbConnect";
import Course from "@/models/Course";
import { CourseSchema } from "@/schemas/courseSchema";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {
  await dbConnect();
    try {
    const data = await req.json();
    const parsedData = CourseSchema.safeParse(data);

    if (!parsedData.success) {
      return NextResponse.json({ 
        message: parsedData.error.errors.map((err) => err.message).join(", ") 
      }, { status : 404});
    }

    const { title, description, price, duration, instructor, category, thumbnail } = parsedData.data;

    await Course.create({
      title,
      description,
      price,
      duration,
      instructor,
      category,
      thumbnail,
    });

    return NextResponse.json({ message: "Course created successfully" });
  } catch (error) {
    console.error("Error creating course:", error);
    return NextResponse.json({ message: "Internal Server Error" });
  }
};


