import React from 'react'

const TabsSectionSkeleton = () => {
    return (
        <div className="h-full w-full">
            <div className="flex h-[4rem] w-full items-center justify-start overflow-x-auto overflow-y-hidden rounded-none border-b bg-background p-0">
                <div className="flex h-full items-center justify-center rounded-none px-4 lg:hidden">
                    <span className="h-[1.1rem] w-[100px] animate-pulse rounded-md bg-accent" />
                </div>
                <div className="flex h-full items-center justify-center rounded-none px-4">
                    <span className="h-[1.1rem] w-[80px] animate-pulse rounded-md bg-accent" />
                </div>
                <div className="flex h-full items-center justify-center rounded-none px-4">
                    <span className="h-[1.1rem] w-[100px] animate-pulse rounded-md bg-accent" />
                </div>
                <div className="flex h-full items-center justify-center rounded-none px-4">
                    <span className="h-[1.1rem] w-[110px] animate-pulse rounded-md bg-accent" />
                </div>
            </div>
        </div>
    )
}

export default TabsSectionSkeleton
