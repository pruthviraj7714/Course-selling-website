import authOptions from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req : NextRequest) {
    await dbConnect();

    try {
        const session = await getServerSession(authOptions);

        if(!session || !session.user) {
            return NextResponse.json({
                message : "User not found"
            }, {status : 403})
        }

        const userInfo = await User.findById(session.user.id).populate(["wishlist", "purchasedCourses"]).select("-password");

        return NextResponse.json({
            info : userInfo
        }, {status : 200})



    } catch (error : any) {
        console.log(error.message);
        return NextResponse.json({
            message : "Internal Server error"
        }, {status : 500})
    }

}