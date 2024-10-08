'use client'

import { cn } from '@/lib/utils'

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
    return (
        <div
            className={cn(
                '3xl:px-6 sticky z-40 flex w-full flex-col gap-2 border-b bg-background p-3 sm:flex-row sm:items-center sm:justify-between lg:top-[4.5rem] 2xl:px-4',
                className
            )}
        >
            <div className="min-w-fit">
                <h1 className="text-lg font-bold xl:text-xl">{title}</h1>
                <p className="text-muted-foreground">{subtitle}</p>
            </div>
            <>{children}</>
        </div>
    )
}

export default PageHeader
