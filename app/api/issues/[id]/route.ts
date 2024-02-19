import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createIssueSchema } from "../../../validationSchema";

export async function GET(request: NextRequest, { params }: { params: { id: number } }){
    console.log(params.id);
    const result = await prisma.issue.findFirst({
        where: {
            id: Number(params.id)
        }
    })
    return NextResponse.json(result, { status: 200 })
}

export async function PUT(request: NextRequest, { params }: { params: { id: number } }) {
    const body = await request.json();
    const validation = createIssueSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 });
    }
    const newIssue = await prisma.issue.update({
        where: {
            id: Number(params.id)
        },
        data: {
            description: body.description,
            status: body.status,
        },
    });
    return NextResponse.json(newIssue, { status: 200 });
}