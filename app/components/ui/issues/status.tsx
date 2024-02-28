'use client';
import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import { useDebouncedCallback } from 'use-debounce';


function getEnumKeys<T extends string, TEnumValue extends string | number>(enumVariable: { [key in T]: TEnumValue }) {
    return Object.keys(enumVariable) as Array<T>;
}  

export default function StatusSelect() {

    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const pathname = usePathname();
    const handleSelect = useDebouncedCallback((term) => {
        // console.log(term);

        const params = new URLSearchParams(searchParams);
        params.set('page','1');
        if (term) {
            params.set('status', term);
        }
        else {
            params.delete('status');
        }
        replace(`${pathname}?${params.toString()}`);
    });
    const defaultStatusValue = searchParams.get('status')??'';
    console.log(defaultStatusValue);
    return (
        <div>
            <Select.Root value={defaultStatusValue} defaultValue={defaultStatusValue} onValueChange={(e) => {
                handleSelect(e);
            }}>
                <Select.Trigger placeholder='Select status' />
                <Select.Content>
                    {getEnumKeys(Status).map((key, index) => (
                        <Select.Item key={Status[key]} value={Status[key]}>
                            {Status[key]}
                        </Select.Item>
                    ))}
                </Select.Content>
            </Select.Root>
        </div>
    )
}
// export default StatusSelect;