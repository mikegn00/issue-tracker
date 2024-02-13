'use client'

import { Issue } from '@prisma/client'
import { Heading } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const IssueIdPage = ({ params }: { params: { id: number }}) => {
    // const router = useRouter();
    // const { issueId } = router.query;
    const [issued, setIssued] = useState<Issue | null>(null);
    console.log(params.id)
    useEffect(() => {
        async function fetchIssue() {
            try {
                const response = await axios.get(`/api/issues/${params.id}`);
                setIssued(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchIssue();
    }, [params.id]);
    if (!issued) {
        return <div>Loading...</div>
    }
    return (
        <div>
            <Heading>Update Issue {issued?.title}</Heading>
        </div>
    )
}

export default IssueIdPage