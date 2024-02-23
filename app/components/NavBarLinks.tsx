'use client'
import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'

const NavBarLinks = () => {
    const currentPath = usePathname();
    const links = [
        {label: 'Dashboard', href:'/'},
        {label: 'Issues', href:'/issues'},
        // {label: 'Members', href: '/members'},
    ]

  return (
    <div>
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
    </div>
  )
}

export default NavBarLinks