import prisma from "@/prisma/client";
import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";

const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter,
    providers: [
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
                if (!credentials?.email || !credentials.password){
                    return null;
                }

                const users = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                if (!users) {
                    return null;
                }
                const isPasswordValid = await compare(credentials.password, users.password);
                if (!isPasswordValid){
                    return null;
                }
                return {
                    id: users.id + '',
                    email: users.email,
                    fullname: users.fullname,
                };
            }
        }),
    ],
    session: {
        strategy: 'jwt',
    },
};

export default authOptions;