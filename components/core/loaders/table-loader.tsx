import React from 'react'
import AnimatedLogo from './animated-logo'

const TableLoader = () => {
    return (
        <div className="flex h-[calc(100vh-10rem)] w-full flex-1 items-center justify-center lg:h-[calc(100vh-10rem)]">
            <div className="w-[200px] 2xl:w-[240px]">
                <AnimatedLogo />
            </div>
        </div>
    )
}

export default TableLoader
