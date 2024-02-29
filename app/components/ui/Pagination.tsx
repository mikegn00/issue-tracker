'use client';

import clsx from 'clsx';
import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { RiArrowDropLeftLine, RiArrowDropRightLine } from 'react-icons/ri';

const ITEMS_PER_PAGE = 5;

export default function Pagination({ totalPages }: { totalPages: number}) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;
    const total = totalPages === 0 ? 1 : totalPages / ITEMS_PER_PAGE;
    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    }
    console.log(total);
    return (
        <div className="space-x-3">
            <Flex gap='3'>
                <PaginationArrow direction='left' href={createPageURL(currentPage - 1)} isDisabled={currentPage <= 1} />
                <PaginationArrow direction='right' href={createPageURL(currentPage + 1)} isDisabled={currentPage >= total} />
                {/* <Link href={createPageURL(totalPages - 1)}>Prev</Link>
                <Link href={createPageURL(totalPages + 1)}>Next</Link> */}
            </Flex>
        </div>
    )
}

function PaginationArrow({ href, direction, isDisabled, }: { href: string; direction: 'left' | 'right'; isDisabled?: boolean }) {
    const className = clsx('', { 'pointer-events-none': isDisabled, 'hover:bg-gray-100': !isDisabled, });

    const icon = direction === 'left' ? (<RiArrowDropLeftLine />) : (<RiArrowDropRightLine />);

    return isDisabled ? ( <div className={className}><Button disabled={true}>{icon}</Button></div> ) : (<Link href={href} className={className}><Button>{icon}</Button></Link>)
}

function PaginationNumber({ page, href, isActive, position }: { page: string; href: string; position: 'first' | 'last' | 'middle' | 'single'; isActive: boolean; }) {
    const className = clsx('');

    return isActive || position === 'middle' ?
    ( <div className={className}>{page}</div> ) :
    ( <Link href={href} className={className}>{page}</Link> )
}