import React from 'react';
import Link from 'next/link';
import {AiFillBug} from 'react-icons/ai';
import NavBarLinks from './components/NavBarLinks';
import { getSession } from './lib/authentication';
import SessionStatus from './components/SessionStatus';
import { User } from '@prisma/client';

const NavBar = async () => {
    const session:User = await getSession();
  return (
    <div className='p-4 border-b'>
        <nav className='flex space-x-5 container mx-auto items-center'>
            <Link className='' href="/"><AiFillBug/></Link>
            <NavBarLinks />
            <SessionStatus />
        </nav>
    </div>
  )
}

export default NavBar