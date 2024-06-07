import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";


export async function POST(req : NextRequest) {

    const session = getServerSession();



}