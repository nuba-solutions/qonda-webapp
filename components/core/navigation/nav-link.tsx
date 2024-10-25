'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useDictionaryStore } from '@/stores/core/dictionary-store'
import { cn } from '@/lib/utils'
import usePersistStore from '@/hooks/usePersistStore'
import NavLinkSkeleton from '@/components/core/skeletons/nav-link-skeleton'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { HiChevronDown } from 'react-icons/hi2'

const NavLink = ({
    path,
    name,
    text,
    childrenLinks,
}: {
    path: string
    name: string
    text: string
    childrenLinks?: {
        path: string
        icon?: React.ReactNode
        name: string
        text: string
    }[]
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

    return childrenLinks ? (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div
                    className={cn(
                        'text-md group flex h-full cursor-pointer items-center border-b-2 border-transparent pl-3 pr-5 font-semibold uppercase hover:bg-accent/50 3xl:pl-6 3xl:pr-10'
                    )}
                >
                    <HiChevronDown className="mr-3" />
                    <div className="flex flex-col">
                        {name}
                        <span className="hidden text-xs font-normal normal-case text-muted-foreground xl:block">
                            {text}
                        </span>
                    </div>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {childrenLinks.map((link) => (
                    <DropdownMenuItem
                        asChild
                        key={link.path}
                        className="cursor-pointer"
                    >
                        <Link href={link.path} className="py-3 pl-4 pr-14">
                            <div className="flex flex-col font-semibold">
                                {link.name}
                                <span className="text-xs font-normal normal-case text-muted-foreground">
                                    {link.text}
                                </span>
                            </div>
                        </Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    ) : (
        <Link
            href={path}
            className={cn(
                'text-md flex h-full items-center border-b-2 border-transparent px-5 font-semibold uppercase hover:bg-accent/50 3xl:px-10',
                path && handleGetIsLinkActive(path) && 'border-primary'
            )}
        >
            <div
                className={cn(
                    'flex flex-col',
                    path && handleGetIsLinkActive(path) && 'text-primary'
                )}
            >
                {name}
                <span className="hidden text-xs font-normal normal-case text-muted-foreground xl:block">
                    {text}
                </span>
            </div>
        </Link>
    )
}

export default NavLink
