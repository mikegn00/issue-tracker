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
    <div className='p-4 border-b'>
        <nav className='flex space-x-5 container mx-auto items-center'>
            <Link className='' href="/"><AiFillBug/></Link>
            <ul className='space-x-6 items-center'>
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
            <div className='flex flex-1 justify-end items-center space-x-6'>
                <Button className=''>
                    <Link className='' href="/users/login">
                        Log in
                    </Link>
                </Button>
                <Link className='' href="/users/register">Register</Link>
            </div>
        </nav>
    </div>
  )
}

export default NavBar