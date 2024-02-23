import { User } from '@prisma/client';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';


const secretKey = 'secret';
const key = new TextEncoder().encode(secretKey);

export async function login(account: User) {
    const user = { account };
    const expires = new Date(Date.now() + 10 * 1000);
    const session = await encrypt({ account, expires });
    cookies().set('session', session, { expires, httpOnly: true });
}

export async function getSession() {
    // const session = request.cookies.get('session')?.value;
    const session = cookies().get('session')?.value;
    if (!session) return null;
    return await decrypt(session);
    // return session;
}

export async function encrypt(payload: any) {
    return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256'})
    .setIssuedAt()
    .setExpirationTime('10 sec from now')
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
    const { payload } = await jwtVerify(input, key, {
        algorithms: ['HS256'],
    });
    return payload;
}