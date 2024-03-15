'use client';

import { Issue, Status } from "@prisma/client";
import { Badge, Button, Table } from "@radix-ui/themes";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";

export default function IssueTable() {
    const [issues, setIssues] = useState<Issue[]>([]);
    useEffect(() => {
        async function fetchIssues() {
            try {
                const response = await axios.get('/api/issues');
                setIssues(response.data);
            } catch (error) {
                
            }
        }
        fetchIssues();
    }, []);

    return (
        <div className="py-5">
            <Table.Root>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {issues.map(issue => 
                    <Table.Row key={issue.id}>
                        <Table.Cell>{issue.title}</Table.Cell>
                        {/* <Table.Cell>{issue.description}</Table.Cell> */}
                        <Table.Cell><Badge color={
                        issue.status === Status.OPEN ? 'green' :
                        issue.status === Status.IN_PROGRESS ? 'yellow' :
                        issue.status === Status.TESTING ? 'purple' : 'red'}>{issue.status}</Badge></Table.Cell>
                        <Table.Cell><Link href={`/issues/${issue.id}`}><Button><FaRegEdit/></Button></Link></Table.Cell>
                    </Table.Row>)}
                </Table.Body>
            </Table.Root>
        </div>
    )
}