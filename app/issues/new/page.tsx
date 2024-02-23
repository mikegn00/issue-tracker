'use client'

import { Button, TextField, Callout, Heading } from '@radix-ui/themes';
import React, { useState } from 'react';
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchema';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import dynamic from 'next/dynamic';
import axios from 'axios';
const SimpleMdeEditor = dynamic(
	() => import("react-simplemde-editor"),
	{ ssr: false }
);
type IssueForm = z.infer<typeof createIssueSchema>;

// interface IssueForm {
//   title: string;
//   description: string;
// }

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  });
  const [error, setError] = useState('');
  const [isSubmitted, setSubmitted] = useState(false);
  
  return (
    <div className='container mx-auto'>
      <Heading className='py-5' size='8'>Create New Issue</Heading>
      {error && <Callout.Root color='red' className='mb-5'>
                  <Callout.Text>{error}</Callout.Text>
                </Callout.Root>}
      <form className='space-y-3' 
        onSubmit={handleSubmit( async (data) => {
          try {
            console.log(data);
            setSubmitted(true);
            await axios.post('/api/issues', data);
            router.push('/issues');          
          } catch (error) {
            setSubmitted(false);
            setError('An unexpected error occured.');
          }
        })}>
          <TextField.Root>
            <TextField.Input placeholder='Title' {...register('title')} />
          </TextField.Root>
          
          <ErrorMessage>
            {errors.title?.message}
          </ErrorMessage>

          <Controller
            name='description'
            control={control}
            render={({ field }) => <SimpleMdeEditor placeholder='Description' {...field}/>}
          />
          
          <ErrorMessage >
            {errors.description?.message}
          </ErrorMessage>
          <Button disabled={isSubmitted}>Submit New Issue{isSubmitted && <Spinner/>}</Button>
      </form>
    </div>
  )
}

export default NewIssuePage