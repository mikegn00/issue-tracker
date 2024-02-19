'use client'
import React, { useEffect, useState } from 'react'
import { Badge, Button, Heading, ScrollArea, Table } from '@radix-ui/themes';
import Link from 'next/link';
import { Issue, Status } from '@prisma/client';
import axios from 'axios';
import { FaRegEdit } from 'react-icons/fa';


const IssuesPage = () => {
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
    <div className='container mx-auto px-4'>
      <Heading className='py-5' size='8'>Issues</Heading>
      <ScrollArea scrollbars='vertical'>
        <div>
          <Link href='/issues/new'>
            <Button>
              New Issue
            </Button>
          </Link>
        </div>
        <div className='py-5'>
          <Table.Root className='' size='3' variant='surface'>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {issues.map(issue => 
              <Table.Row key={issue.id}>
                <Table.Cell>{issue.title}</Table.Cell>
                <Table.Cell>{issue.description}</Table.Cell>
                <Table.Cell><Badge color={
                  issue.status === Status.OPEN ? 'green' :
                  issue.status === Status.IN_PROGRESS ? 'yellow' :
                  issue.status === Status.TESTING ? 'purple' : 'red'}>{issue.status}</Badge></Table.Cell>
                <Table.Cell><Link href={`/issues/${issue.id}`}><Button><FaRegEdit/></Button></Link></Table.Cell>
              </Table.Row>)}
            </Table.Body>
          </Table.Root>
        </div>
      </ScrollArea>
    </div>
  )
}

export default IssuesPage