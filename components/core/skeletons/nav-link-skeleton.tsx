import React from 'react'

const NavLinkSkeleton = () => {
    return (
        <div className="mx-2 flex flex-col gap-1">
            <span className="h-[1.5rem] w-[120px] animate-pulse rounded-lg bg-accent"></span>
            <span className="h-[.75rem] w-[200px] animate-pulse rounded-lg bg-accent"></span>
        </div>
    )
}

export default NavLinkSkeleton
