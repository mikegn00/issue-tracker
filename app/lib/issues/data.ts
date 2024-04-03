import { Status } from "@prisma/client";


const ITEMS_PER_PAGE = 5;

// Get filtered issues
export async function fetchFilteredIssues(page: string, status: string) {
    const offset = (Number(page??'1') - 1) * ITEMS_PER_PAGE;
    try {
        let issues;
        if (status && Object.values(Status).includes(status as Status)) {
            issues = await prisma?.issue.findMany({
                where: {
                    status: status as Status
                },
                take: ITEMS_PER_PAGE,
                skip: offset,
            });
        }
        else {
            issues = await prisma?.issue.findMany({
                take: ITEMS_PER_PAGE,
                skip: offset,
            });
        }
        return issues;
    } catch (error) {
        
    }
}

// Get total issues
export async function totalIssues(status: string) {
    let issues;
    try {
        if (status && Object.values(Status).includes(status as Status)) {
            issues = await prisma?.issue.findMany({
                where: {
                    status: status as Status
                }
            });
        }
        else {
            issues = await prisma?.issue.findMany();
        }
        return issues;
    } catch (error) {
        
    }
}

// GET filtered projects
export async function fecthFilteredProjects(page: string, status: string) {
    const offset = (Number(page??'1') - 1) * ITEMS_PER_PAGE;
    try {
        let projects;
        if (status && Object.values(Status).includes(status as Status)) {
            projects = await prisma?.project.findMany({
                where: {
                    status: status as Status
                },
                take: ITEMS_PER_PAGE,
                skip: offset,
            });
        }
        else {
            projects = await prisma?.project.findMany({
                take: ITEMS_PER_PAGE,
                skip: offset,
            });
        }
        return projects;
    } catch (error) {
        
    }
}

// GET total projects
export async function totalProjects(status: string) {
    try {
        if (status && Object.values(Status).includes(status as Status)) {
            return await prisma?.project.findMany({
                where: {
                    status: status as Status
                }
            });
        }
        else {
            return await prisma?.project.findMany();
        }
    } catch (error) {
        
    }
}