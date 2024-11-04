'use client'

import { getCandidateByID } from '@/actions/pages/candidates/candidates'
import PageHeader from '@/components/core/headers/page-header'
import { Button, buttonVariants } from '@/components/ui/button'
import { useDictionaryStore } from '@/stores/core/dictionary-store'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import NoDataMessage from '@/components/core/messages/no-data-message'
import TableLoader from '@/components/core/loaders/table-loader'
import ProfileSidePanel from '../panel/profile-side-panel'
import TabsSection from './tabs-section'
import { HiArrowLeft, HiTrash } from 'react-icons/hi2'
import DeleteCandidateDialog from '../../../_components/dialogs/delete-dialog'
import { TCandidate } from '@/types/pages/candidates/candidate'
import { useState } from 'react'
import { useWindowSize } from '@/hooks/useWindowSize'
import { useCandidateStore } from '@/stores/pages/candidates/candidate-store'

const CandidateDetailsSection = ({ candidateId }: { candidateId: number }) => {
    const { dictionary, language } = useDictionaryStore()
    const [isOpen, setIsOpen] = useState(false)
    const { width } = useWindowSize()
    const { origin_status } = useCandidateStore()

    const { isPending, isError, data, isFetching } = useQuery<TCandidate>({
        queryKey: ['candidate', candidateId],
        queryFn: () => getCandidateByID(candidateId),
        refetchOnWindowFocus: false,
    })

    if (isPending || isFetching) {
        return <TableLoader />
    }

    if (isError || !data) {
        return <NoDataMessage />
    }

    return (
        <section id="candidate-details-section">
            <PageHeader
                title={dictionary?.pages?.candidates?.headers?.main['title']}
                subtitle={
                    dictionary?.pages?.candidates?.headers?.main['subtitle']
                }
                className="flex-row items-center justify-between"
            >
                <div className="flex items-center gap-2">
                    <Link
                        href={`/${language}/${origin_status === 'new-applicants' ? 'candidates/applicants' : origin_status === 'employees' ? 'candidates/employees' : 'candidates/former-employees'}`}
                        className={cn(
                            buttonVariants({
                                variant: 'outline',
                                size: 'icon',
                            })
                        )}
                        scroll={false}
                    >
                        <HiArrowLeft />
                    </Link>
                    <>
                        <DeleteCandidateDialog
                            candidate={data}
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                        />
                        {width && width < 640 ? (
                            <Button
                                onClick={() => setIsOpen(true)}
                                variant="destructive"
                                size="icon"
                            >
                                <HiTrash />
                            </Button>
                        ) : (
                            <Button
                                onClick={() => setIsOpen(true)}
                                variant="destructive"
                            >
                                Delete candidate
                            </Button>
                        )}
                    </>
                </div>
            </PageHeader>
            {data ? (
                <div className="relative grid grid-cols-1 lg:grid-cols-[360px_1fr]">
                    <ProfileSidePanel candidate={data} />
                    <div className="relative h-full w-full">
                        <TabsSection candidate={data} dictionary={dictionary} />
                    </div>
                </div>
            ) : null}
        </section>
    )
}

export default CandidateDetailsSection
