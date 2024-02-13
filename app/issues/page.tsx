'use client'
import React, { useEffect, useState } from 'react'
import { Badge, Button, Table } from '@radix-ui/themes';
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
    <div className='max-w-xl'>
      <div>
        <Button>
          <Link href='/issues/new'>
            New Issue
          </Link>
        </Button>
      </div>
      <div className='py-5'>
        <Table.Root className='pd-5' variant='surface'>
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
              <Table.Cell><Badge color={issue.status === Status.OPEN ? 'green' : 'red'}>{issue.status}</Badge></Table.Cell>
              <Table.Cell><Button><Link href={`/issues/${issue.id}`}><FaRegEdit/></Link></Button></Table.Cell>
            </Table.Row>)}
          </Table.Body>
        </Table.Root>
      </div>
    </div>
  )
}

export default IssuesPage