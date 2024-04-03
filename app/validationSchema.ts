import { Status } from '@prisma/client';
import { z } from 'zod';

export const createIssueSchema = z.object({
    title: z.string().min(1, 'Title is required.').max(255),
    description: z.string().min(1, 'Description is required.'),
    status: z.nativeEnum(Status).default('OPEN'),
});

export const createProjectSchema = z.object({
    title: z.string().min(1, 'Title is required.').max(255),
    description: z.string().min(1, 'Description is required'),
    status: z.nativeEnum(Status).default('OPEN'),
    createdUser: z.coerce.number().int(),
    updatedUser: z.coerce.number().int(),
});

export const createUserSchema = z.object({
    fullname: z.string().min(1, 'Please enter full name').max(255),
    password: z.string().min(8, 'Password have to be more than 8 letters'),
    email: z.string().min(1, "Email is required").email("This is not a valid email"),
});

export const userLoginSchema = z.object({
    email: z.string().min(1, "Email required").email("Not a valid email address"),
    password: z.string().min(8, 'Password required')
})