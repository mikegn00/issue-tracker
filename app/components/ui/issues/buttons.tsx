'use client';
import { Button } from "@radix-ui/themes";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";


export function ClearFilters() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const handleClearButton = useDebouncedCallback(() => {
        const params = new URLSearchParams(searchParams);
        params.delete('status');
        params.delete('page');
        replace(`${pathname}`);
    });
    return (
        <div>
            <Button onClick={() => {
                handleClearButton()
                }}>Clear Filters</Button>
        </div>
    )
}