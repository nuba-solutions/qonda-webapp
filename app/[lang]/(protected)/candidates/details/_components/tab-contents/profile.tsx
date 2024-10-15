import { Button } from '@/components/ui/button'
import { TabsContent } from '@/components/ui/tabs'
import {
    getTranslatedCandidateStatus,
    renderCandidateStatus,
    renderLocaleDate,
} from '@/helpers/table'
import { getUserInitials } from '@/helpers/user'
import { TDictionary } from '@/types/core/dictionary'
import { TCandidate } from '@/types/pages/candidates/candidate'
import React from 'react'

const TabContentProfile = ({
    candidate,
    dictionary,
}: {
    candidate: TCandidate
    dictionary: TDictionary
}) => {
    return (
        <TabsContent value="profile" className="lg:hidden">
            <div className="flex w-full flex-col items-center justify-center border-b p-4">
                <div className="mb-4 flex h-[110px] w-[110px] items-center justify-center rounded-2xl border bg-background text-4xl font-bold text-primary-500 2xl:text-5xl 3xl:h-[140px] 3xl:w-[140px]">
                    {getUserInitials(
                        candidate?.first_name,
                        candidate?.last_name
                    )}
                </div>
                <h2 className="text-xl font-semibold">{`${candidate.first_name} ${candidate.last_name}`}</h2>
                <p className="text-muted-foreground">{candidate.email}</p>
            </div>
            <ul className="grid max-h-[500px] min-h-[350px] grid-cols-1 p-4 px-8">
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
            <div className="flex items-center justify-center border-t px-8 pt-8">
                <Button variant={'destructive'} className="w-full">
                    Delete candidate
                </Button>
            </div>
        </TabsContent>
    )
}

export default TabContentProfile
