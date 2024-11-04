import { TabsContent } from '@/components/ui/tabs'
import React from 'react'
import { TCandidate } from '@/types/pages/candidates/candidate'
import { Separator } from '@/components/ui/separator'
import ChangeCandidateStatusForm from '../../../_components/forms/change-status-form'
import { HiArrowRight, HiCalendarDays } from 'react-icons/hi2'
import { company } from '@/qonda.config'
import { useDictionaryStore } from '@/stores/core/dictionary-store'
import ScheduleInterviewForm from '../../../_components/forms/interview-form'

const TabContentScheduler = ({ candidate }: { candidate: TCandidate }) => {
    const { language } = useDictionaryStore()
    return (
        <TabsContent value="scheduler" className="mt-0 p-4">
            <div className="flex items-center justify-between">
                <div className="lg:pl-1">
                    <h2 className="text-md font-semibold">Scheduler</h2>
                    <p className="text-xs text-muted-foreground">
                        Interviews & Enrollment
                    </p>
                </div>
            </div>
            <Separator className="my-4" />
            <div className="flex flex-col gap-4 rounded-md border p-4 xl:flex-row xl:items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-sm border bg-muted">
                    <HiCalendarDays className="text-lg text-primary-500" />
                </div>
                <div>
                    <p className="font-medium">
                        Schedule candidate for an interview or set enrollment
                        start
                    </p>
                    <p className="text-muted-foreground">
                        Options for scheduling or setting dates will be
                        available depending on candidate current status.
                    </p>
                </div>
            </div>
            <div className="mt-4 grid grid-cols-1 items-start gap-4 xl:grid-cols-2">
                <div className="rounded-md border p-4">
                    <p className="font-semibold">Interview</p>
                    <p className="text-xs text-muted-foreground">
                        Select the interview date and time
                    </p>
                    <Separator className="my-4" />
                    <ScheduleInterviewForm candidate={candidate} />
                </div>
                <div className="rounded-md border p-4">
                    <p className="font-semibold">Enrollment date</p>
                    <p className="text-xs text-muted-foreground">
                        Set the candidate enrollment date
                    </p>
                    <Separator className="my-4" />
                    {/* <ChangeCandidateStatusForm candidate={candidate} /> */}
                </div>
            </div>
        </TabsContent>
    )
}

export default TabContentScheduler
