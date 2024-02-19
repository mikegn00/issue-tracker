import { NextRequest, NextResponse } from "next/server";
import prisma from '@/prisma/client'
import { createUserSchema } from '../../../validationSchema';

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = createUserSchema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.errors, { status: 400 });
    const newUser = await prisma.user.create({
        data: { fullname: body.fullname, password: body.password, email: body.email }
    });
    return NextResponse.json(newUser, { status: 200 });
}