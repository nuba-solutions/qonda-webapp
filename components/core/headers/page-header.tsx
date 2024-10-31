'use client'

import { cn } from '@/lib/utils'
import PageHeaderSkeleton from '../skeletons/page-header-skeleton'

type TPageHeaderProps = {
    title: string
    subtitle: string
    children?: React.ReactNode
    className?: string
}

const PageHeader = ({
    title,
    subtitle,
    children,
    className,
}: TPageHeaderProps) => {
    if (!title || !subtitle) {
        return <PageHeaderSkeleton />
    }

    return (
        <div
            className={cn(
                'sticky z-40 flex h-[4rem] w-full flex-col gap-2 border-b bg-background px-4 sm:flex-row sm:items-center sm:justify-between lg:top-[4.5rem] 3xl:px-6',
                className
            )}
        >
            <div className="min-w-fit">
                <h1 className="text-lg font-semibold leading-5">{title}</h1>
                <p className="text-xs text-muted-foreground">{subtitle}</p>
            </div>
            <>{children}</>
        </div>
    )
}

export default PageHeader
