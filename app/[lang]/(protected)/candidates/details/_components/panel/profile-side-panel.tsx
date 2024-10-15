'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { getUserInitials } from '@/helpers/user'
import { TCandidate } from '@/types/pages/candidates/candidate'
import React from 'react'
import DeleteCandidateDialog from '../../../_components/dialogs/delete-dialog'
import {
    getTranslatedCandidateStatus,
    renderCandidateStatus,
    renderLocaleDate,
} from '@/helpers/table'
import { TDictionary } from '@/types/core/dictionary'
import { cn } from '@/lib/utils'

const ProfileSidePanel = ({
    candidate,
    dictionary,
    mobile,
}: {
    candidate: TCandidate
    dictionary: TDictionary
    mobile?: boolean
}) => {
    return (
        <div
            className={cn(
                mobile
                    ? 'grid grid-cols-1'
                    : 'sticky left-0 top-[9rem] hidden h-[calc(100vh-9rem)] w-[400px] grid-cols-1 grid-rows-[260px_1fr_90px] overflow-y-auto border-r bg-panel lg:grid 2xl:grid-rows-[280px_1fr_90px]'
            )}
        >
            <div className="flex w-full flex-col items-center justify-center border-b p-4">
                <div className="mb-4 flex h-[110px] w-[110px] items-center justify-center rounded-2xl border bg-background text-4xl font-bold text-primary-500 2xl:text-5xl 3xl:h-[120px] 3xl:w-[120px]">
                    {getUserInitials(
                        candidate?.first_name,
                        candidate?.last_name
                    )}
                </div>
                <h2 className="text-xl font-semibold">{`${candidate.first_name} ${candidate.last_name}`}</h2>
                <p className="text-muted-foreground">{candidate.email}</p>
            </div>
            <ul className="grid max-h-[500px] min-h-[350px] grid-cols-1 p-4 px-2 lg:px-8">
                <li className="flex items-center justify-between">
                    <p className="font-semibold text-muted-foreground">
                        First name
                    </p>
                    <p>{candidate.first_name}</p>
                </li>
                <li className="flex items-center justify-between">
                    <p className="font-semibold text-muted-foreground">
                        Last name
                    </p>
                    <p>{candidate.last_name}</p>
                </li>
                <li className="flex items-center justify-between">
                    <p className="font-semibold text-muted-foreground">Age</p>
                    <p>{candidate.age}</p>
                </li>
                <li className="flex items-center justify-between">
                    <p className="font-semibold text-muted-foreground">Phone</p>
                    <p>{candidate.phone}</p>
                </li>
                <li className="flex items-center justify-between">
                    <p className="font-semibold text-muted-foreground">Email</p>
                    <p>{candidate.email}</p>
                </li>
                <li className="flex items-center justify-between">
                    <p className="font-semibold text-muted-foreground">
                        Unit / Sucursal
                    </p>
                    <p>{candidate.unit}</p>
                </li>
                <li className="flex items-center justify-between">
                    <p className="font-semibold text-muted-foreground">
                        Status
                    </p>
                    {renderCandidateStatus(
                        candidate.status,
                        getTranslatedCandidateStatus(
                            candidate.status,
                            dictionary
                        )
                    )}
                </li>
                <li className="flex items-center justify-between">
                    <p className="font-semibold text-muted-foreground">
                        Interview date
                    </p>
                    {renderLocaleDate(candidate.interview_date, dictionary)}
                </li>
                <li className="flex items-center justify-between">
                    <p className="font-semibold text-muted-foreground">
                        Interview date
                    </p>
                    {renderLocaleDate(candidate.enrollment_date, dictionary)}
                </li>
            </ul>
            <div className="flex items-center justify-center border-t p-4 lg:px-8">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="w-full" variant={'destructive'}>
                            {dictionary?.core?.buttons['delete']}
                        </Button>
                    </DialogTrigger>
                    <DeleteCandidateDialog candidate={candidate} />
                </Dialog>
            </div>
        </div>
    )
}

export default ProfileSidePanel
