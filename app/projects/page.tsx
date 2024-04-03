import { Badge, Button, Container, Flex, Heading, ScrollArea, Table } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import { fecthFilteredProjects, totalIssues, totalProjects } from '../lib/issues/data'
import { FaRegEdit } from 'react-icons/fa'
import { Status } from '@prisma/client'
import Pagination from '../components/ui/Pagination'

const ProjectPage = async ({ searchParams, }: {
  searchParams?: {
    page?: string;
    status?: string
  }
}) => {
  const page = Number(searchParams?.page) || 1;
  const status = searchParams?.status || '';
  const filteredProjects = await fecthFilteredProjects(page.toString(), status);
  const totalProject = await totalProjects(status);

  return (
    <>
      <title>Projects</title>
      <div className='container mx-auto px-4 space-y-3'>
        <Flex gap='3'>
          <Heading size='8' className='py-5'>Projects</Heading>
          <Link href='/projects/new'>
            <Button my='5'>
              New Project
            </Button>
          </Link>
        </Flex>
        <Flex>

        </Flex>
        <ScrollArea scrollbars='vertical'>
          <div>
            <Table.Root variant='surface'>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {filteredProjects?.map( project => 
                  <Table.Row key={project.id}>
                    <Table.Cell>{project.title}</Table.Cell>
                    <Table.Cell><Badge color={
                      project.status === Status.OPEN ? 'green' :
                      project.status === Status.IN_PROGRESS ? 'yellow' :
                      project.status === Status.TESTING ? 'purple' : 'red'}>{project.status}</Badge></Table.Cell>
                    <Table.Cell><Link href={`/projects/${project.id}`}><Button><FaRegEdit/></Button></Link></Table.Cell>
                  </Table.Row>)}
              </Table.Body>
            </Table.Root>
          </div>
        </ScrollArea>
        <Pagination totalPages={(totalProject ? totalProject.length : 0)} />
      </div>
    </>
  )
}

export default ProjectPage