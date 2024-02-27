'use client';
import { User } from '@prisma/client';
import { Box, DropdownMenu, Text, Avatar, Button } from '@radix-ui/themes';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import React from 'react'
import { AiFillCaretDown } from 'react-icons/ai';
import authOptions from '../auth/authOptions';
import { signOut } from 'next-auth/react';

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
                        <Button onClick={() => signOut()}>Logout</Button>
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </Box>
    </div>
    
  );
}

export default UserDropDownBox