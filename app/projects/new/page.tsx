'use client';
import { createProjectSchema } from '@/app/validationSchema';
import { Button, Flex, Heading, TextField } from '@radix-ui/themes'
import 'easymde/dist/easymde.min.css';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Spinner from '@/app/components/Spinner';

const SimpleMdeEditor = dynamic(
    () => import('react-simplemde-editor'),
    { ssr: false }
);

type ProjectForm = z.infer<typeof createProjectSchema>;

const NewProjectPage = () => {
    const router = useRouter();
    const { register, control, handleSubmit, formState: { errors } } = useForm<ProjectForm>({
        resolver: zodResolver(createProjectSchema)
    });
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
                        router.push('/projects')
                    } catch (error) {
                        setSubmitted(false);
                        setError('An unexpected error occured.');
                    }
                })}>
                <TextField.Root>
                    <TextField.Input placeholder='Title' {...register('title')}/>
                </TextField.Root>

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