'use client'

import React from 'react';
import Link from 'next/link';
import {AiFillBug} from 'react-icons/ai';
import { usePathname } from 'next/navigation';
import { log } from 'console';
import classNames from 'classnames';
import { Button } from '@radix-ui/themes';

const NavBar = () => {
    const currentPath = usePathname();
    console.log(currentPath);

    const links = [
        {label: 'Dashboard', href:'/'},
        {label: 'Issues', href:'/issues'},
    ]
  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
        <Link href=""><AiFillBug/></Link>
        <ul className='flex space-x-6'>
            {links.map(link => 
                <Link key={link.href}
                className={classNames({
                    'text-zinc-900' : link.href === currentPath,
                    'text-zinc-500' : link.href !== currentPath,
                    'hover:text-zinc-800 transition-colors' : true
                })} 
                href={link.href}>{link.label}</Link>
            )}
        </ul>
        <div className='lg:flex lg:flex-1 lg:justify-end items-center space-x-6'>
            <Button className=''>
                <Link className='' href="/users/login">
                    Log in
                </Link>
            </Button>
            <Link href="/users/register">Register</Link>
        </div>
    </nav>
  )
}

export default NavBar