'use client'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { getUserInitials } from '@/helpers/user'
import usePersistStore from '@/hooks/usePersistStore'
import { useUserStore } from '@/stores/core/user-store'
import Link from 'next/link'
import React from 'react'
import { HiChevronDown } from 'react-icons/hi2'

const UserProfileMenu = () => {
    const userStore = usePersistStore(useUserStore, (state) => state)

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex cursor-pointer items-center border-r pr-2">
                    <div className="mr-2 hidden text-right sm:block">
                        <p className="text-xs text-muted-foreground">
                            Welcome back,
                        </p>
                        <p className="font-semibold leading-4">
                            {userStore?.user?.first_name}{' '}
                            {userStore?.user?.last_name}
                        </p>
                    </div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
                        {getUserInitials(
                            userStore?.user?.first_name,
                            userStore?.user?.last_name
                        )}
                    </div>
                    <HiChevronDown className="ml-1 text-sm" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel className="pb-0 text-base">
                    Yohans Mendoza
                </DropdownMenuLabel>
                <p className="p-2 pt-0 text-sm text-muted-foreground">
                    yohans.mendoza@mail.com
                </p>
                <DropdownMenuSeparator />
                <Link href="/my-account">
                    <DropdownMenuItem>My account</DropdownMenuItem>
                </Link>
                <DropdownMenuItem>Get support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <Link href="/login">
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                </Link>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserProfileMenu
