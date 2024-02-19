import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { userLoginSchema } from "@/app/validationSchema";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = userLoginSchema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400 });
    return NextResponse.json(body, { status: 200 });
}