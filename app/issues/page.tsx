import React, { useEffect, useState } from 'react';
import { Badge, Button, Flex, Heading, ScrollArea, Select, Table } from '@radix-ui/themes';
import Link from 'next/link';
import { Issue, Status } from '@prisma/client';
import axios from 'axios';
import { FaRegEdit } from 'react-icons/fa';
import { useRouter, useSearchParams } from 'next/navigation';
import Pagination from '../components/ui/Pagination';
import { fetchFilteredIssues, totalIssues } from '../lib/issues/data';
import StatusSelect from '../components/ui/issues/status';
import { ClearFilters } from '../components/ui/issues/buttons';
import Head from 'next/head';

function getEnumKeys<T extends string, TEnumValue extends string | number>(enumVariable: { [key in T]: TEnumValue }) {
  return Object.keys(enumVariable) as Array<T>;
}


const IssuesPage = async ({ searchParams, }: {
  searchParams?: {
    page?: string;
    status?: string;
  }
}) => {
  const page = Number(searchParams?.page) || 1;
  const status = searchParams?.status || '';
  const filteredIssues = await fetchFilteredIssues(page.toString(), status);
  const totalIssue = await totalIssues(status);
  
  return (
    <>
    <title>Issues</title>
    <div className='container mx-auto px-4'>
      <Flex gap='3'>
        <Heading className='py-5' size='8'>Issues</Heading>
        <Link href='/issues/new'>
          <Button my='5'>
            New Issue
          </Button>
        </Link>
      </Flex>
      <Flex gap='3'>

        
        <StatusSelect />
        <ClearFilters />
        {/* <Select.Root >
          <Select.Trigger placeholder='Select status' />
          <Select.Content>
            {getEnumKeys(Status).map((key, index) => (
                <Select.Item key={Status[key]} value={Status[key]}>
                    {Status[key]}
                </Select.Item>
            ))}
          </Select.Content>
        </Select.Root> */}

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
              {filteredIssues?.map(issue => 
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
      <Pagination totalPages={(totalIssue ? totalIssue.length : 0)} />

    </div>
    </>
  )
}

export default IssuesPage