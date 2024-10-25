import React from 'react'

const PageHeaderSkeleton = () => {
    return (
        <div
            className={
                'sticky z-40 flex h-[4rem] w-full items-center justify-between gap-2 border-b bg-background px-4 lg:top-[4.5rem] 3xl:px-6'
            }
        >
            <div className="flex flex-col gap-2">
                <div className="h-[1rem] w-[80px] animate-pulse rounded-md bg-accent" />
                <div className="h-[0.5rem] w-[120px] animate-pulse rounded-lg bg-accent" />
            </div>
            <div className="flex items-center gap-2">
                <div className="h-9 w-9 animate-pulse rounded-md bg-accent" />
                <div className="h-9 w-16 animate-pulse rounded-md bg-accent" />
            </div>
        </div>
    )
}

export default PageHeaderSkeleton
