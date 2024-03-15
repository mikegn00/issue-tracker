import { Button, Container, Flex, Heading } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const ProjectPage = () => {
  return (
    <>
      <title>Projects</title>
      <div className='container mx-auto px-4'>
        <Flex gap='3'>
          <Heading size='8' className='py-5'>Projects</Heading>
          <Flex justify='end'>
            <Link href='/projects/new'>
              <Button my='5'>
                New Project
              </Button>
            </Link>
          </Flex>
        </Flex>
      </div>
    </>
  )
}

export default ProjectPage