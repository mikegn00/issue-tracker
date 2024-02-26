import prisma from "@/prisma/client";
import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: 'Email',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email',
                    placeholder: 'example@email.com'
                },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                const user = { id: '1', name: 'Michael', email: 'michael@microtill.com', pass: 'true' }
                return user
            }
        }),
    ],
    session: {
        strategy: 'jwt',
    },
};

export default authOptions;