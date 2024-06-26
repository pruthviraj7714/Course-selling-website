import authOptions from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from 'bcryptjs';

const passwordSchema = z.object({
    oldPassword: z.string(),
    newPassword: z.string(),
    reNewPassword: z.string()
});

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({
                message: "User not found",
            }, { status: 403 });
        }

        const parsedData = passwordSchema.safeParse(await req.json());

        if (!parsedData.success) {
            return NextResponse.json({
                message: "Invalid input",
                errors: parsedData.error.errors,
            }, { status: 400 });
        }

        const user = await User.findById(session.user.id);

        if (!user) {
            return NextResponse.json({
                message: "User not found",
            }, { status: 403 });
        }

        const { oldPassword, newPassword, reNewPassword } = parsedData.data;

        const isCurrentPasswordCorrect = await bcrypt.compare(oldPassword, user.password);

        if (!isCurrentPasswordCorrect) {
            return NextResponse.json({
                message: "Current Password is incorrect, please try again",
            }, { status: 403 });
        }

        if (newPassword !== reNewPassword) {
            return NextResponse.json({
                message: "Please ensure that the Re-type password is the same as the new password",
            }, { status: 401 });
        }

        user.password = await bcrypt.hash(newPassword, 10);

        await user.save();

        return NextResponse.json({
            message: "Password is successfully changed",
        }, { status: 200 });

    } catch (error: any) {
        console.error('Error changing password:', error.message);
        return NextResponse.json({
            message: "Internal Server Error",
        }, { status: 500 });
    }
}
