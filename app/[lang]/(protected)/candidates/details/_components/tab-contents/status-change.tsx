import { TabsContent } from '@/components/ui/tabs'
import React from 'react'
import { TCandidate } from '@/types/pages/candidates/candidate'
import { Separator } from '@/components/ui/separator'
import ChangeCandidateStatusForm from '../../../_components/forms/change-status-form'
import { HiArrowRight, HiBookmark } from 'react-icons/hi2'
import { company } from '@/qonda.config'
import { useDictionaryStore } from '@/stores/core/dictionary-store'

const TabContentStatusChange = ({ candidate }: { candidate: TCandidate }) => {
    const { language } = useDictionaryStore()
    return (
        <TabsContent value="status_change" className="mt-0 p-4">
            <div className="flex items-center justify-between">
                <div className="lg:pl-1">
                    <h2 className="text-md font-semibold">Status</h2>
                    <p className="text-xs text-muted-foreground">
                        Promote / Demote candidate
                    </p>
                </div>
            </div>
            <Separator className="my-4" />
            <div className="flex flex-col gap-4 rounded-md border p-4 xl:flex-row xl:items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-sm border bg-muted">
                    <HiBookmark className="text-lg text-primary-500" />
                </div>
                <div>
                    <p className="font-medium">
                        Changing the candidate status will have serious
                        consequences. Including different placement in the HR
                        funnel.
                    </p>
                    <p className="text-muted-foreground">
                        Please make sure you are certain of the change as well
                        as read the company's set of rules.
                    </p>
                </div>
            </div>
            <div className="mt-4 grid grid-cols-1 items-start gap-4 xl:grid-cols-2">
                <div className="rounded-md border p-4">
                    <p className="font-semibold">New status</p>
                    <p className="text-xs text-muted-foreground">
                        Change to preferred status
                    </p>
                    <Separator className="my-4" />
                    <ChangeCandidateStatusForm candidate={candidate} />
                </div>
                <div className="rounded-md border p-4">
                    <p className="font-semibold">Company Rules</p>
                    <p className="text-xs text-muted-foreground">
                        These are the placement rules and statuses' description
                    </p>
                    <Separator className="my-4" />
                    <p className="mb-1 font-semibold">Description</p>
                    <p className="text-muted-foreground">
                        {company.company_settings.candidates_rules.description}
                    </p>
                    <Separator className="my-4" />
                    <div className="grid grid-cols-1 gap-y-4 md:grid-cols-2">
                        <div>
                            <p className="font-semibold">New Candidates</p>
                            <ul>
                                {company.company_settings.candidates_rules.statuses.applicants.map(
                                    (status) => (
                                        <li
                                            key={status.name}
                                            className="mt-1 flex items-center gap-2 text-muted-foreground"
                                        >
                                            <HiArrowRight className="text-sm text-primary-500" />
                                            {language === 'es' ||
                                            language === 'es-MX'
                                                ? status.es
                                                : status.en}
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                        <div>
                            <p className="font-semibold">Employees</p>
                            <ul>
                                {company.company_settings.candidates_rules.statuses.employees.map(
                                    (status) => (
                                        <li
                                            key={status.name}
                                            className="mt-1 flex items-center gap-2 text-muted-foreground"
                                        >
                                            <HiArrowRight className="text-sm text-primary-500" />
                                            {language === 'es' ||
                                            language === 'es-MX'
                                                ? status.es
                                                : status.en}
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                        <div>
                            <p className="font-semibold">Former Employees</p>
                            <ul>
                                {company.company_settings.candidates_rules.statuses.former_employees.map(
                                    (status) => (
                                        <li
                                            key={status.name}
                                            className="mt-1 flex items-center gap-2 text-muted-foreground"
                                        >
                                            <HiArrowRight className="text-sm text-primary-500" />
                                            {language === 'es' ||
                                            language === 'es-MX'
                                                ? status.es
                                                : status.en}
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </TabsContent>
    )
}

export default TabContentStatusChange
