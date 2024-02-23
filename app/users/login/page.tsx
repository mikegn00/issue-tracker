'use client';
import { Heading, Section, Grid, Text, TextField, Button, Separator, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { z } from 'zod';
import { userLoginSchema } from '@/app/validationSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import axios from 'axios';

type LoginForm = z.infer<typeof userLoginSchema>;

function LoginPage() {

  const { register, handleSubmit: onSubmit, formState: { errors } }  = useForm<LoginForm>({
    resolver: zodResolver(userLoginSchema)
  });

  const router = useRouter();
  const [error, setError] = useState('');
  const [isSubmitted, setSubmitted] = useState(false);

  const handleSubmit = async (data: LoginForm) => {
    try {
      console.log(error);
      setSubmitted(true);
      const result = await axios.post('/api/users/login', data);
      console.log(result.data);
      if (result){
        router.push('/');
        router.refresh();
      }
    } catch (error) {
      setSubmitted(false);
      setError('An unexpected error occured.');
    }

  }

  return (
    <div className='container mx-auto'>
      <Grid columns='2'>
        <Section className='mr-2 space-y-2'>
          <form className='space-y-2' onSubmit={onSubmit(handleSubmit)}>
            <Heading size='8'>Login</Heading>

            <Text>Email</Text>
            <TextField.Root>
              <TextField.Input type='email' placeholder='Email' {...register('email')} />
            </TextField.Root>
            <ErrorMessage>
              {errors.email?.message}
            </ErrorMessage>

            <Text>Password</Text>
            <TextField.Root>
              <TextField.Input type='password' placeholder='Password' {...register('password')} />
            </TextField.Root>
            <ErrorMessage>
              {errors.password?.message}
            </ErrorMessage>

            <Button disabled={isSubmitted}>Login</Button>
          </form>
        </Section>
        <Flex>
          <Separator size='4' orientation='vertical'/>
          <Section className='ml-2 space-y-2 items-center'>
            <Heading size='8'>Not registered?</Heading>
            <Link href='/users/register'><Button>Register</Button></Link>
          </Section>
        </Flex>
      </Grid>
    </div>
  )
}

export default LoginPage