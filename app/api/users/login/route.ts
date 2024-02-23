import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { userLoginSchema } from "@/app/validationSchema";
import { cookies } from "next/headers";
import { encrypt, login } from "@/app/lib/authentication";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = userLoginSchema.safeParse(body);
    if (!validation.success) {
        // cookies().set('session', )
        return NextResponse.json(validation.error.format(), { status: 400 });
    }
    const result = await prisma.user.findFirst({
        where: {
            password: body.password,
            email: body.email,
        },
    });
    if (!result) {
        return NextResponse.json({ success: false, data: "Incorrect password" }, { status: 200 });
    }
    await login(result);
    request.cookies.set('session', JSON.stringify(result));
    return NextResponse.json(result, { status: 200 });
}