'use client';
import { Grid, Heading, Section, Text, TextField, Button, Card, Flex, Container } from '@radix-ui/themes'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { z } from 'zod';
import { createUserSchema } from '@/app/validationSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import ErrorMessage from '@/app/components/ErrorMessage';

type UserForm = z.infer<typeof createUserSchema>;

const RegisterPage = () => {
  const router = useRouter();
  const { register, control, handleSubmit, formState: { errors } } = useForm<UserForm>({
    resolver: zodResolver(createUserSchema)
  });

  const [error, setError] = useState('');
  const [isSubmitted, setSubmitted] = useState(false);

  return (
    <div >
      <Container >
        <Flex justify='center' align='center'>
          <Card variant='surface' style={{ width: 500, borderRadius: 'small', marginTop: 10, color: '' }}>
            <Heading size='6' className=''>Sign up</Heading>
            <Grid gap='3'>
              <form className='mt-5 space-y-2' onSubmit={handleSubmit( async (data) => {
                try {
                  setSubmitted(true);
                  await axios.post('/api/users/register', data);
                  router.push('/');
                } catch (error) {
                  setSubmitted(false);
                  setError('Unexpected error');
                }
              })}>

                <div className='space-y-2'>
                  <Text as='label'>Email</Text>
                  <TextField.Root>
                    <TextField.Input type='email' placeholder='example@email.com' {...register('email')}/>
                  </TextField.Root>
                  <ErrorMessage>
                    {errors.email?.message}
                  </ErrorMessage>
                </div>

                <div className='space-y-2'>
                  <Text as='label'>Fullname</Text>
                  <TextField.Root>
                    <TextField.Input type='name' placeholder='Full name' {...register('fullname')}/>
                  </TextField.Root>
                  <ErrorMessage>
                    {errors.fullname?.message}
                  </ErrorMessage>
                </div>

                <div className='space-y-2'>
                  <Text as='label'>Password</Text>
                  <TextField.Root>
                    <TextField.Input type='password' placeholder='Password' {...register('password')}/>
                  </TextField.Root>
                  <ErrorMessage>
                    {errors.password?.message}
                  </ErrorMessage>
                </div>

                <Button disabled={isSubmitted}>Create an account</Button>
              </form>
            </Grid>
          </Card>
        </Flex>
      </Container>
      {/* <Heading size='8' align='left'>Registeration</Heading>
      <form onSubmit={handleSubmit( async (data) => {
        try {
          console.log(data);
          setSubmitted(true);
          await axios.post('/api/users/register', data);
          router.push('/');
        } catch (error) {
          setSubmitted(false);
          setError('An unexpected error occured');
        }
      })}>
        <Grid columns='2' gap='2' width='auto'>
          <Section className=''>
            <Text as='p'>Full name:</Text>
            <TextField.Root>
              <TextField.Input type='name' placeholder='Full name' {...register('fullname')}/>
            </TextField.Root>
            <ErrorMessage>
              {errors.fullname?.message}
            </ErrorMessage>

            <Text as='p'>Email:</Text>
            <TextField.Root>
              <TextField.Input type='email' placeholder='Email' {...register('email')}/>
            </TextField.Root>
            <ErrorMessage>
              {errors.email?.message}
            </ErrorMessage>

            <Text as='p'>Password</Text>
            <TextField.Root>
              <TextField.Input type='password' placeholder='Password' {...register('password')}/>
            </TextField.Root>
            <ErrorMessage>
              {errors.password?.message}
            </ErrorMessage>

          </Section>
          <Section>

          </Section>
        </Grid>
        <Button disabled={isSubmitted}>Register</Button>
      </form> */}
    </div>
  )
}

export default RegisterPage