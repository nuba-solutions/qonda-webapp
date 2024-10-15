'use client'

import { getUserInitials } from '@/helpers/user'
import { TCandidate } from '@/types/pages/candidates/candidate'
import React from 'react'

const ProfileSidePanel = ({
    entityData,
    entityEmail,
    children,
}: {
    entityData: TCandidate
    entityEmail: string
    children: React.ReactNode
}) => {
    return (
        <div className="bg-panel sticky left-0 top-[9rem] hidden h-[calc(100vh-9rem)] w-[400px] grid-cols-1 grid-rows-[260px_1fr_90px] overflow-y-auto border-r lg:grid 2xl:grid-rows-[280px_1fr_90px]">
            <div className="flex w-full flex-col items-center justify-center border-b p-4">
                <div className="mb-4 flex h-[110px] w-[110px] items-center justify-center rounded-2xl border bg-background text-4xl font-bold text-primary-500 2xl:text-5xl 3xl:h-[120px] 3xl:w-[120px]">
                    {getUserInitials(
                        entityData?.first_name,
                        entityData?.last_name
                    )}
                </div>
                <h2 className="text-xl font-semibold">{`${entityData.first_name} ${entityData.last_name}`}</h2>
                <p className="text-muted-foreground">{entityEmail}</p>
            </div>
            {children}
        </div>
    )
}

export default ProfileSidePanel
