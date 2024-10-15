import React from 'react'
import AnimatedLogo from './animated-logo'

const TabLoader = () => {
    return (
        <div className="flex min-h-[500px] w-full flex-1 items-center justify-center">
            <div className="w-[200px] 2xl:w-[240px]">
                <AnimatedLogo />
            </div>
        </div>
    )
}

export default TabLoader
