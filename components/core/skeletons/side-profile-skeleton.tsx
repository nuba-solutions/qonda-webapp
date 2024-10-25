'use client'

import { cn } from '@/lib/utils'

const SideProfileSkeleton = ({ mobile }: { mobile?: boolean }) => {
    return (
        <div
            className={cn(
                mobile
                    ? 'w-full grid-cols-1 grid-rows-[220px_1fr] overflow-y-auto border-r bg-panel lg:grid'
                    : 'sticky left-0 top-[8.5rem] hidden h-[calc(100vh-8.5rem)] w-full grid-cols-1 grid-rows-[200px_1fr] overflow-y-auto border-r bg-panel lg:grid'
            )}
        >
            <div className="flex w-full flex-col items-center justify-center border-b p-4">
                <div className="mb-4 flex h-[60px] w-[60px] animate-pulse rounded-lg bg-foreground/10 dark:bg-accent" />
                <div className="flex items-center gap-2">
                    <div className="h-[1rem] w-[100px] animate-pulse rounded-lg bg-foreground/10 dark:bg-accent" />
                    <div className="h-[1rem] w-[100px] animate-pulse rounded-lg bg-foreground/10 dark:bg-accent" />
                </div>
                <div className="mt-2 flex items-center gap-2">
                    <div className="h-[0.8rem] w-[40px] animate-pulse rounded-lg bg-foreground/10 dark:bg-accent" />
                    <span className="flex h-5 w-5 animate-pulse rounded-md bg-foreground/10 dark:bg-accent" />
                    <div className="h-[0.8rem] w-[40px] animate-pulse rounded-lg bg-foreground/10 dark:bg-accent" />
                    <span className="h-5 w-[60px] animate-pulse rounded-md bg-foreground/10 dark:bg-accent" />
                </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-start lg:flex-col">
                <div className="w-full md:w-6/12 lg:w-full">
                    <div className="flex items-center gap-2 border-y px-4 py-3 lg:px-8">
                        <span className="flex h-5 w-5 animate-pulse rounded-md bg-foreground/10 dark:bg-accent" />
                        <div className="h-5 w-[200px] animate-pulse rounded-lg bg-foreground/10 dark:bg-accent" />
                    </div>
                    <ul className="flex flex-col space-y-4 p-4 lg:space-y-2 lg:px-8">
                        <li className="grid w-full grid-cols-[1fr_20px] grid-rows-1 items-end justify-between">
                            <div className="flex flex-col gap-y-1">
                                <div className="h-[0.7rem] w-[50px] animate-pulse rounded-lg bg-foreground/10 dark:bg-accent" />
                                <div className="h-[0.9rem] w-[110px] animate-pulse rounded-lg bg-foreground/10 dark:bg-accent" />
                            </div>
                            <span className="flex h-5 w-5 animate-pulse rounded-md bg-foreground/10 dark:bg-accent" />
                        </li>
                        <li className="grid w-full grid-cols-[1fr_20px] grid-rows-1 items-end justify-between">
                            <div className="flex flex-col gap-y-1">
                                <div className="h-[0.7rem] w-[50px] animate-pulse rounded-lg bg-foreground/10 dark:bg-accent" />
                                <div className="h-[0.9rem] w-[110px] animate-pulse rounded-lg bg-foreground/10 dark:bg-accent" />
                            </div>
                            <span className="flex h-5 w-5 animate-pulse rounded-md bg-foreground/10 dark:bg-accent" />
                        </li>
                        <li className="flex flex-col gap-y-1">
                            <div className="h-[0.7rem] w-[50px] animate-pulse rounded-lg bg-foreground/10 dark:bg-accent" />
                            <div className="h-[0.9rem] w-[110px] animate-pulse rounded-lg bg-foreground/10 dark:bg-accent" />
                        </li>
                        <li className="flex flex-col gap-y-1">
                            <div className="h-[0.7rem] w-[50px] animate-pulse rounded-lg bg-foreground/10 dark:bg-accent" />
                            <div className="h-[0.9rem] w-[110px] animate-pulse rounded-lg bg-foreground/10 dark:bg-accent" />
                        </li>
                        <li className="flex flex-col gap-y-1">
                            <div className="h-[0.7rem] w-[50px] animate-pulse rounded-lg bg-foreground/10 dark:bg-accent" />
                            <div className="h-[0.9rem] w-[110px] animate-pulse rounded-lg bg-foreground/10 dark:bg-accent" />
                        </li>
                    </ul>
                </div>
                <div className="w-full md:w-6/12 lg:w-full">
                    <div className="flex items-center gap-2 border-y px-4 py-3 lg:px-8">
                        <span className="flex h-5 w-5 animate-pulse rounded-md bg-foreground/10 dark:bg-accent" />
                        <div className="h-5 w-[200px] animate-pulse rounded-lg bg-foreground/10 dark:bg-accent" />
                    </div>
                    <ul className="flex flex-col space-y-4 p-4 lg:space-y-2 lg:px-8">
                        <li className="grid w-full grid-cols-[1fr_20px] grid-rows-1 items-end justify-between">
                            <div className="flex flex-col gap-y-1">
                                <div className="h-[0.7rem] w-[50px] animate-pulse rounded-lg bg-foreground/10 dark:bg-accent" />
                                <div className="h-[0.9rem] w-[110px] animate-pulse rounded-lg bg-foreground/10 dark:bg-accent" />
                            </div>
                            <span className="flex h-5 w-5 animate-pulse rounded-md bg-foreground/10 dark:bg-accent" />
                        </li>
                        <li className="grid w-full grid-cols-[1fr_20px] grid-rows-1 items-end justify-between">
                            <div className="flex flex-col gap-y-1">
                                <div className="h-[0.7rem] w-[50px] animate-pulse rounded-lg bg-foreground/10 dark:bg-accent" />
                                <div className="h-[0.9rem] w-[110px] animate-pulse rounded-lg bg-foreground/10 dark:bg-accent" />
                            </div>
                            <span className="flex h-5 w-5 animate-pulse rounded-md bg-foreground/10 dark:bg-accent" />
                        </li>
                        <li className="flex flex-col gap-y-1">
                            <div className="h-[0.7rem] w-[50px] animate-pulse rounded-lg bg-foreground/10 dark:bg-accent" />
                            <div className="h-[0.9rem] w-[110px] animate-pulse rounded-lg bg-foreground/10 dark:bg-accent" />
                        </li>
                        <li className="flex flex-col gap-y-1">
                            <div className="h-[0.7rem] w-[50px] animate-pulse rounded-lg bg-foreground/10 dark:bg-accent" />
                            <div className="h-[0.9rem] w-[110px] animate-pulse rounded-lg bg-foreground/10 dark:bg-accent" />
                        </li>
                        <li className="flex flex-col gap-y-1">
                            <div className="h-[0.7rem] w-[50px] animate-pulse rounded-lg bg-foreground/10 dark:bg-accent" />
                            <div className="h-[0.9rem] w-[110px] animate-pulse rounded-lg bg-foreground/10 dark:bg-accent" />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SideProfileSkeleton
