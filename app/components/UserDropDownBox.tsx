'use client';
import { User } from '@prisma/client';
import { Box, DropdownMenu, Text, Avatar, Button } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react'
import { AiFillCaretDown } from 'react-icons/ai';

function UserDropDownBox(session:any) {
    const user:User = session.session as User;
  return (
    <div >
        <Box>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <Button variant='soft'>
                        Account
                        <AiFillCaretDown/>
                    </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Label>
                        <Text size='2'>{user.email}</Text>
                    </DropdownMenu.Label>
                    <DropdownMenu.Item>
                        <Link href=''>Logout</Link>
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </Box>
    </div>
    
  );
}

export default UserDropDownBox