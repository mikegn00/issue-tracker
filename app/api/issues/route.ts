import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createIssueSchema } from "../../validationSchema";
import { Status } from "@prisma/client";

const ITEMS_PER_PAGE = 5;

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = createIssueSchema.safeParse(body);
    if (!validation.success) 
        return NextResponse.json(validation.error.format(), { status: 400 });
    const newIssue = await prisma.issue.create({
        data: { title: body.title, description: body.description }
    });
    return NextResponse.json(newIssue, { status: 200 });
}

// export async function GET() {
//     const issue = await prisma.issue.findMany();
//     return NextResponse.json(issue, { status: 200 })
// }

export async function GET(req: NextRequest) {
    const status = req.nextUrl.searchParams.get('status')?.toUpperCase();
    const page = req.nextUrl.searchParams.get('page');
    console.log(page);

    const offset = (Number(page??'1') - 1) * ITEMS_PER_PAGE;
    try {
        let issues;
        if (status && Object.values(Status).includes(status as Status)) {
            issues = await prisma.issue.findMany({
                where: {
                    status: status as Status
                },
                take: ITEMS_PER_PAGE,
                skip: offset
            });
        }
        else {
            issues = await prisma.issue.findMany({
                take: ITEMS_PER_PAGE,
                skip: offset,
            });
        }
        return NextResponse.json(issues, { status: 200 });
    } catch (error) {
        
    }
}

