'use client';

import { createIssueSchema } from '@/app/validationSchema';
import { Issue, Status } from '@prisma/client';
import { Box, Flex, Heading, Section, Select, Text, Button, TextArea, TextField } from '@radix-ui/themes';
import axios from 'axios';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Spinner from '@/app/components/Spinner';
import dynamic from 'next/dynamic';
import 'easymde/dist/easymde.min.css';

const SimpleMdeEditor = dynamic(
	() => import("react-simplemde-editor"),
	{ ssr: false }
);

function getEnumKeys<T extends string, TEnumValue extends string | number>(enumVariable: { [key in T]: TEnumValue }) {
    return Object.keys(enumVariable) as Array<T>;
}

type IssueForm = z.infer<typeof createIssueSchema>;

const IssueIdPage = ({ params }: { params: { id: number }}) => {
    const router = useRouter();
    const { register, control, handleSubmit, setValue, formState: { errors } } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    });
    
    const [issued, setIssued] = useState<Issue>();
    const [isSubmitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({title:'', description: '', status: Status.OPEN});
    console.log(params.id);
    useEffect(() => {
        async function fetchIssue() {
            try {
                const response = await axios.get(`/api/issues/${params.id}`);
                const { title, description, status } = response.data;
                setIssued(response.data);
                setValue('description', description);
                setValue('title', title);
                setValue('status', status);
            } catch (error) {
                console.log(error);
            }
        }
        fetchIssue();
    }, [params.id, setValue]);

    if (!issued) {
        return <div className='container mx-auto'>Loading...</div>
    }
    return (
        <div className='container mx-auto'>
            <form
                onSubmit={handleSubmit( async (data) => {
                    try {
                        console.log(data);
                        await axios.put(`/api/issues/${issued.id}`, data);
                        // router.push('/issues');
                        router.back();
                        router.refresh();
                    } catch (error) {
                        console.log(error);
                    }
            })}>
            
                <Flex gap="3">
                    <Heading>Update Issue {issued?.title}</Heading>
                    <div className=''>
                        <Controller 
                            control={control}
                            name='status'
                            render={({ field }) => {
                                return (
                                    <Select.Root onValueChange={field.onChange} {...field}>
                                        <Select.Trigger/>
                                        <Select.Content>
                                            <Select.Group>
                                                {getEnumKeys(Status).map((key, index) => (
                                                    <Select.Item key={Status[key]} value={Status[key]}>
                                                        {Status[key]}
                                                    </Select.Item>
                                                ))}
                                            </Select.Group>
                                        </Select.Content>
                                    </Select.Root>
                                )
                            }} />
                    </div>
                </Flex>

                <Section className='space-y-3'>
                    <Box>
                        <Text as='p'>Description:</Text>
                    </Box>
                    {/* <TextArea id='description' name='description' value={issued.description} onChange={handleChange} /> */}
                    <Controller 
                        name='description' 
                        control={control} 
                        render={({ field }) => <SimpleMdeEditor placeholder='Description' {...field} value={issued.description} />}/>
                    <Button disabled={isSubmitted}>Submit {isSubmitted && <Spinner />}</Button>
                </Section>
                
            </form>
        </div>
    )
}

export default IssueIdPage