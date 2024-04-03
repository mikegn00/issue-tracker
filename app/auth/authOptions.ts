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
    callbacks: {
         session: ({ session, token }) => {
            //console.log('Session callback', { session, token });
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    fullname: token.fullname,
                }
            };
         },
         jwt: ({ token, user }) => {
            //console.log('JWT Callback', { token, user });
            if (user) {
                const u = user  as unknown as any;
                return {
                    ...token,
                    id: u.id,
                    fullname: u.fullname,
                }
            }
            return token;
         }
    },
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/users/login'
    },
};

export default authOptions;