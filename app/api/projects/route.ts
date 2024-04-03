import { createProjectSchema } from "@/app/validationSchema";
import { Status } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const ITEMS_PER_PAGE = 5;

// POST async function for api/projects
export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = createProjectSchema.safeParse(body);
    if (!validation.success){
        return NextResponse.json(validation.error.format(), { status: 400 });
    }
    const newIssue = await prisma?.project.create({
        data: { 
            title: body.title, 
            description: body.description, 
            createdUser: body.createdUser, 
            updatedUser: body.updatedUser,
        }
    });
    return NextResponse.json(newIssue, { status: 200 });
}

// GET async function for api/projects
export async function GET(request: NextRequest) {
    const status = request.nextUrl.searchParams.get('status')?.toUpperCase();
    const page = request.nextUrl.searchParams.get('page');
    console.log(page);

    const offset = (Number(page ?? '1') - 1) * ITEMS_PER_PAGE;

    let issues;
    if (status && Object.values(Status).includes(status as Status)) {
        issues = await prisma?.issue.findMany({
            where: {
                status: status as Status
            },
            take: ITEMS_PER_PAGE,
            skip: offset
        });
    }
    else {
        issues = await prisma?.issue.findMany({
            take: ITEMS_PER_PAGE,
            skip: offset,
        });
    }
    return NextResponse.json(issues, { status: 200 });
}