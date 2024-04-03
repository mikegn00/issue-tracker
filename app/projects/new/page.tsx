'use client'
import { createProjectSchema } from '@/app/validationSchema';
import { Button, Flex, Heading, TextField, Text } from '@radix-ui/themes'
import 'easymde/dist/easymde.min.css';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Spinner from '@/app/components/Spinner';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { User } from '@prisma/client';

const SimpleMdeEditor = dynamic(
    () => import('react-simplemde-editor'),
    { ssr: false }
);

type ProjectForm = z.infer<typeof createProjectSchema>;

function NewProjectPage() {
    const router = useRouter();
    const { data:session }:any = useSession();
    const user:User = session?.user as User;

    const { register, control, handleSubmit, formState: { errors } } = useForm<ProjectForm>({
        resolver: zodResolver(createProjectSchema),
    });
    console.log(user?.id);

    const [error, setError] = useState('');
    const [isSubmitted, setSubmitted] = useState(false);
  return (
    <div className='container mx-auto'>
        <Heading className='py-5' size='8'>Create New Project</Heading>
        <>
            <form className='space-y-3'
                onSubmit={handleSubmit(async (data) => {
                    try {
                        setSubmitted(true);
                        console.log(user.id);
                        await axios.post('/api/projects', data);
                        router.push('/projects')
                    } catch (error) {
                        setSubmitted(false);
                        setError('An unexpected error occured.');
                    }
                })}>
                <TextField.Root style={{display: 'none'}} >
                    <TextField.Input type='number' value={user?.id} {...register('createdUser')}/>
                </TextField.Root>
                <TextField.Root style={{display: 'none'}}>
                    <TextField.Input type='number' value={user?.id} {...register('updatedUser')}/>
                </TextField.Root>
                <Text>Title</Text>
                <TextField.Root>
                    <TextField.Input placeholder='Title' {...register('title')}/>
                </TextField.Root>

                <Text>Description:</Text>
                <Controller
                    name='description'
                    control={control}
                    render={({ field }) => <SimpleMdeEditor placeholder='Description' {...field} />}
                    />


                <Button disabled={isSubmitted}>Create New Project{isSubmitted && <Spinner/>}</Button>
            </form>
        </>
    </div>
  )
}

export default NewProjectPage