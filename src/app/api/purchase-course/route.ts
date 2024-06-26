import authOptions from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Course from "@/models/Course";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
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

    const user = await User.findById(session.user.id).populate(
      "purchasedCourses"
    );

    //@ts-ignore
    const isCoursePurchased = user?.purchasedCourses.some((course) => course._id.toString() === courseId);

    return NextResponse.json({
      isCoursePurchased,
    });
  } catch (error : any) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const { courseId } = await req.json();

    if (!courseId) {
      return NextResponse.json(
        { message: "Course ID is required" },
        { status: 400 }
      );
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 }
      );
    }

    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { message: "User not authenticated" },
        { status: 401 }
      );
    }

    const user = await User.findById(session.user.id);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (user.learningPoints < course.price) {
      return NextResponse.json(
        { message: "Insufficient learning points" },
        { status: 403 }
      );
    }

    const Icourse = await Course.findById(courseId);

    if (!Icourse) {
      return NextResponse.json({
        message: "Course is not found",
      });
    }
    Icourse.studentsEnrolledCount = Icourse.studentsEnrolledCount + 1;

    await Icourse.save();

    user.learningPoints -= course.price;
    user.purchasedCourses.push(courseId);

    await user.save();

    return NextResponse.json(
      { message: "Course successfully purchased" },
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
