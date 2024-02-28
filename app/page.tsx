import { Heading } from '@radix-ui/themes'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import authOptions from './auth/authOptions'

export default async function Home() {
  const user = await getServerSession(authOptions);
  return (
    <div className='container mx-auto px-4'>
      <Heading className='py-4' size='8'>
        Issue Tracker
      </Heading>
      <pre>{JSON.stringify(user?.user)}</pre>
    </div>
  )
}
