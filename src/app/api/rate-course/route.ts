import authOptions from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Course from "@/models/Course";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

async function calculateOverallRating(
  currentRating: number,
  newRating: number
) {
  if (currentRating === null || currentRating === undefined) {
    return newRating; 
  }

  const overallRating =(currentRating + newRating) / 2;
  return Math.floor(overallRating);
}

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { message: "User not authenticated" },
        { status: 401 }
      );
    }

    const courseId = await req.nextUrl.searchParams.get("courseId");

    if (!courseId) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 }
      );
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 }
      );
    }

    const { newRating } = await req.json();

    if (!newRating || newRating < 1 || newRating > 5) {
      return NextResponse.json(
        { message: "Invalid Rating. Please provide a value between 1 and 5." },
        { status: 400 } // Use 400 for bad request (invalid rating)
      );
    }

    let overallRating;
    try {
      overallRating = course.rating
        ? await calculateOverallRating(course.rating, newRating)
        : newRating;
    } catch (error) {
      console.error("Error calculating overall rating:", error);
    }

    course.rating = overallRating;

    await course.save();

    return NextResponse.json(
      { message: "Rating Submitted Successfully" },
      { status: 201 } 
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
