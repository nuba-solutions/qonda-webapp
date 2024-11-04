'use client'

import { getUserInitials } from '@/helpers/user'
import { TCandidate } from '@/types/pages/candidates/candidate'
import {
    getTranslatedCandidateStatus,
    renderCandidateStatus,
    renderLocaleDate,
} from '@/helpers/table'
import { cn } from '@/lib/utils'
import {
    HiChatBubbleLeftRight,
    HiMiniBriefcase,
    HiOutlineClipboard,
} from 'react-icons/hi2'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import { toast } from '@/hooks/use-toast'
import ToastNotification from '@/components/core/toasts/toast-notification'
import SideProfileSkeleton from '@/components/core/skeletons/side-profile-skeleton'
import { useDictionaryStore } from '@/stores/core/dictionary-store'
import { Locale } from '@/i18n.config'

const ProfileSidePanel = ({
    candidate,
    mobile,
}: {
    candidate: TCandidate
    mobile?: boolean
}) => {
    const { dictionary, language } = useDictionaryStore()
    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text)
            toast({
                action: (
                    <ToastNotification
                        title={'Success!'}
                        message={'Copied to clipboard!'}
                        type="success"
                    />
                ),
            })
        } catch (error) {
            toast({
                action: (
                    <ToastNotification
                        title={'Error!'}
                        message={"Couldn't copy to clipboard!"}
                        type="error"
                    />
                ),
            })
        }
    }

    if (!candidate || !dictionary || !dictionary.pages?.candidates) {
        return <SideProfileSkeleton mobile={mobile} />
    }

    return (
        <div
            className={cn(
                mobile
                    ? 'grid grid-cols-1 grid-rows-[220px_1fr]'
                    : 'sticky left-0 top-[8.5rem] hidden h-[calc(100vh-8.5rem)] w-full grid-cols-1 grid-rows-[200px_1fr] overflow-y-auto border-r bg-panel lg:grid'
            )}
        >
            <div className="flex w-full flex-col items-center justify-center border-b p-4">
                <div className="mb-4 flex h-[60px] w-[60px] items-center justify-center rounded-full border-2 border-primary-500 text-2xl font-bold text-primary-500 ring-4 ring-primary-500/20 lg:bg-background">
                    {getUserInitials(
                        candidate?.first_name,
                        candidate?.last_name
                    )}
                </div>
                <h2 className="text-base font-semibold">{`${candidate.first_name} ${candidate.last_name}`}</h2>
                <div className="mt-1 flex items-center gap-2">
                    <p className="text-xs font-semibold text-muted-foreground">
                        Status:
                    </p>
                    <span>
                        {renderCandidateStatus(
                            candidate.status_id,
                            getTranslatedCandidateStatus(
                                candidate.status_id,
                                language as Locale
                            )
                        )}
                    </span>
                </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-start lg:flex-col">
                <div className="w-full md:w-6/12 lg:w-full">
                    <div className="flex items-center gap-2 border-y px-4 py-3 lg:px-8">
                        <HiChatBubbleLeftRight className="text-base text-primary-500" />
                        <h2 className="text-md font-semibold">
                            Contact information
                        </h2>
                    </div>
                    <ul className="flex flex-col space-y-4 p-4 lg:space-y-2 lg:px-8">
                        <li className="grid w-full grid-cols-[1fr_20px] grid-rows-1 items-end justify-between">
                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Phone
                                </p>
                                <p className="max-w-[240px] truncate">
                                    {candidate?.phone}
                                </p>
                            </div>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <HiOutlineClipboard
                                            className="mb-1 ml-auto h-4 w-4 cursor-pointer text-primary-500"
                                            onClick={() =>
                                                copyToClipboard(candidate.phone)
                                            }
                                        />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Copy Phone</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </li>
                        <li className="grid w-full grid-cols-[1fr_20px] grid-rows-1 items-end justify-between">
                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Email
                                </p>
                                <p className="max-w-[240px] truncate">
                                    {candidate?.email}
                                </p>
                            </div>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <HiOutlineClipboard
                                            className="mb-1 ml-auto h-4 w-4 cursor-pointer text-primary-500"
                                            onClick={() =>
                                                copyToClipboard(candidate.email)
                                            }
                                        />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Copy Email</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </li>
                        <li className="flex flex-col">
                            <p className="text-xs text-muted-foreground">
                                City
                            </p>
                            <p>{candidate?.city}</p>
                        </li>
                        <li className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-muted-foreground">
                                    State
                                </p>
                                <p>{candidate?.state}</p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Zip
                                </p>
                                <p>{candidate?.zip}</p>
                            </div>
                        </li>
                        <li className="flex flex-col"></li>
                    </ul>
                </div>
                <div className="w-full md:w-6/12 lg:w-full">
                    <div className="flex items-center gap-2 border-y px-4 py-3 lg:px-8">
                        <HiMiniBriefcase className="text-base text-primary-500" />
                        <h2 className="text-md font-semibold">
                            Application information
                        </h2>
                    </div>
                    <ul className="flex flex-col space-y-4 p-4 lg:space-y-2 lg:px-8">
                        <li className="flex flex-col">
                            <p className="text-xs text-muted-foreground">
                                Location
                            </p>
                            <p>{candidate?.location?.name || 'NA'}</p>
                        </li>
                        <li className="flex flex-col">
                            <p className="text-xs text-muted-foreground">
                                Position
                            </p>
                            <p>{candidate?.job_position?.name || 'NA'}</p>
                        </li>
                        <li className="flex flex-col">
                            <p className="text-xs text-muted-foreground">
                                Job type
                            </p>
                            <p>{candidate?.job_position?.job_type || 'NA'}</p>
                        </li>
                        {candidate.interview_date ? (
                            <li className="flex flex-col">
                                <p className="text-xs text-muted-foreground">
                                    Interview date
                                </p>
                                <p>
                                    {renderLocaleDate(
                                        candidate.interview_date,
                                        dictionary,
                                        false,
                                        true
                                    )}
                                </p>
                            </li>
                        ) : null}
                        {candidate.enrollment_start ? (
                            <li className="flex flex-col">
                                <p className="text-xs text-muted-foreground">
                                    Enrollment start
                                </p>
                                <p>
                                    {renderLocaleDate(
                                        candidate.enrollment_start,
                                        dictionary,
                                        false,
                                        true
                                    ) || 'NA'}
                                </p>
                            </li>
                        ) : null}
                        {candidate.enrollment_end ? (
                            <li className="flex flex-col">
                                <p className="text-xs text-muted-foreground">
                                    Enrollment end
                                </p>
                                <p>
                                    {renderLocaleDate(
                                        candidate.enrollment_end,
                                        dictionary,
                                        false,
                                        true
                                    ) || 'NA'}
                                </p>
                            </li>
                        ) : null}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ProfileSidePanel
