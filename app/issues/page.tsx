'use client'
import React, { useEffect, useState } from 'react'
import { Badge, Button, Flex, Heading, ScrollArea, Select, Table } from '@radix-ui/themes';
import Link from 'next/link';
import { Issue, Status } from '@prisma/client';
import axios from 'axios';
import { FaRegEdit } from 'react-icons/fa';
import { useRouter, useSearchParams } from 'next/navigation';

function getEnumKeys<T extends string, TEnumValue extends string | number>(enumVariable: { [key in T]: TEnumValue }) {
  return Object.keys(enumVariable) as Array<T>;
}


const IssuesPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get('page') ?? 1;
  const status = searchParams.get('status') ?? '';
  const [issues, setIssues] = useState<Issue[]>([]);
  useEffect(() => {
    async function fetchIssues() {
      try {
        const response = await axios.get(`/api/issues?status=${status}&page=${page}`);
        setIssues(response.data);
      } catch (error) {
        
      }
    }
    fetchIssues();
  }, []);
  return (
    <div className='container mx-auto px-4'>
      <Heading className='py-5' size='8'>Issues</Heading>
      <Flex gap='3'>

        <Link href='/issues/new'>
          <Button>
            New Issue
          </Button>
        </Link>
        
        <Select.Root >
          <Select.Trigger placeholder='Select status' />
          <Select.Content>
            {getEnumKeys(Status).map((key, index) => (
                <Select.Item key={Status[key]} value={Status[key]}>
                    {Status[key]}
                </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>

      </Flex>
      <ScrollArea scrollbars='vertical'>
        <div className='py-5'>
          <Table.Root className='' size='3' variant='surface'>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
                {/* <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell> */}
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
      </ScrollArea>
    </div>
  )
}

export default IssuesPage