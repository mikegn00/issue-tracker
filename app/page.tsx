import { Heading } from '@radix-ui/themes'
import Image from 'next/image'

export default function Home() {
  return (
    <div className='container mx-auto px-4'>
      <Heading className='py-4' size='8'>
        Issue Tracker
      </Heading>
    </div>
  )
}
