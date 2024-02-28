import { Status } from "@prisma/client";


const ITEMS_PER_PAGE = 5;
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