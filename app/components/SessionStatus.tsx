import { getSession } from "@/app/lib/authentication";
import { Avatar, Box, Button, DropdownMenu, Text } from "@radix-ui/themes";
import Link from "next/link";
import UserDropDownBox from "./UserDropDownBox";
import { User } from "@prisma/client";
import { JWTPayload } from "jose";

const SessionStatus = async () => {
    const sessionUser = await getSession();
    if (!sessionUser) {
        return  (
            <div className='flex flex-1 justify-end items-center space-x-6'>
                <Link href="/users/login">
                    <Button>
                        Log in
                    </Button>
                </Link>
                <Link className='' href="/users/register">Register</Link>
            </div>
        );
    }
    return (
        <div className='flex flex-1 justify-end items-center space-x-6'>
            <UserDropDownBox session={sessionUser.account} />
        </div>
    );
}
export default SessionStatus;
