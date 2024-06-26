import authOptions from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Course from "@/models/Course";
import User from "@/models/User";
import mongoose from "mongoose";
import { NextApiRequest } from "next";
import { getServerSession } from "next-auth";
import { NEXT_URL } from "next/dist/client/components/app-router-headers";
import { NextURL } from "next/dist/server/web/next-url";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await dbConnect();

  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json(
      {
        message: "User not found",
      },
      { status: 403 }
    );
  }

  const { courseId } = await req.json();

  if (!courseId) {
    return NextResponse.json({
      message: "Course not found",
    });
  }

  try {
    const user = await User.findById(session.user.id);

    if (user?.wishlist.includes(courseId)) {
      return NextResponse.json(
        {
          message: "Course is already in wishlist",
        },
        { status: 403 }
      );
    }

    user?.wishlist.push(courseId);
    user?.save();

    return NextResponse.json(
      {
        message: "Course is successfully added to wishlist",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Internal Server error",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  await dbConnect();

  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json(
      {
        message: "User not found",
      },
      { status: 403 }
    );
  }

  const courseId  = await req.nextUrl.searchParams.get("courseId");

  if (!courseId) {
    return NextResponse.json({
      message: "Course not found",
    });
  }
   try {
    const user = await User.findById(session.user.id).populate("wishlist");
    //@ts-ignore
    const isInWishlist = user?.wishlist.some((course) => course._id.toString() === courseId);

    return NextResponse.json({
      isInWishlist,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Internal Server error",
      },
      { status: 500 }
    );
  }
}


export async function DELETE(req: NextRequest) {
  await dbConnect();

  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json(
      {
        message: "User not found",
      },
      { status: 403 }
    );
  }

  const courseId = req.nextUrl.searchParams.get("courseId");

  if (!courseId) {
    return NextResponse.json({
      message: "Course not found",
    });
  }

  try {
    const user = await User.findById(session.user.id).populate("wishlist");

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        { status: 404 }
      );
    }

    // Filter out the course from the wishlist
    //@ts-ignore
    user.wishlist = user.wishlist.filter(course => course._id.toString() !== courseId);

    // Save the updated user document
    await user.save();

    return NextResponse.json(
      {
        message: "Course successfully removed from wishlist",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}