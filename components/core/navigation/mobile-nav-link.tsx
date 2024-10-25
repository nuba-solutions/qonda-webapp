'use client'

import usePersistStore from '@/hooks/usePersistStore'
import { cn } from '@/lib/utils'
import { useDictionaryStore } from '@/stores/core/dictionary-store'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { SetStateAction } from 'react'
import NavLinkSkeleton from '../skeletons/nav-link-skeleton'

const MobileNavLink = ({
    path,
    name,
    text,
    setIsMenuOpen,
}: {
    path: string
    name: string
    text: string
    setIsMenuOpen: React.Dispatch<SetStateAction<boolean>>
}) => {
    const dictionaryStore = usePersistStore(
        useDictionaryStore,
        (state) => state
    )
    const pathName = usePathname()

    const handleGetIsLinkActive = (href: string) => {
        const pathArray = pathName.split('/')
        const currentPath = pathArray.slice(2, pathArray.length).join('/')
        const isActive =
            (currentPath && `/${currentPath}` === href) ||
            (!currentPath && href === '/') ||
            currentPath.toString().startsWith(href.slice(1))

        return isActive
    }

    if (!dictionaryStore || !dictionaryStore.dictionary)
        return <NavLinkSkeleton />

    return (
        <Link
            onClick={() => setIsMenuOpen(false)}
            href={path}
            className={cn(
                'text-md flex flex-col font-bold uppercase',
                path && handleGetIsLinkActive(path) && 'text-primary'
            )}
        >
            {name}
            <span className="font-normal normal-case text-muted-foreground">
                {text}
            </span>
        </Link>
    )
}

export default MobileNavLink
