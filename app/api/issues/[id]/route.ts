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