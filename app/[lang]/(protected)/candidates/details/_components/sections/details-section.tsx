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
import { HiArrowLeft } from 'react-icons/hi2'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import DeleteCandidateDialog from '../../../_components/dialogs/delete-dialog'
import { TCandidate } from '@/types/pages/candidates/candidate'
import { TLocation } from '@/types/core/location'

const CandidateDetailsSection = ({
    candidateId,
    locationsList,
}: {
    candidateId: number
    locationsList: TLocation[]
}) => {
    const { dictionary, language } = useDictionaryStore()

    const { isPending, isError, data, isFetching } = useQuery<TCandidate>({
        queryKey: ['candidate', candidateId],
        queryFn: () => getCandidateByID(candidateId),
        refetchOnWindowFocus: false,
    })

    if (isPending || isFetching) {
        return <TableLoader />
    }

    if (isError || !locationsList) {
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
                        href={`/${language}/candidates`}
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
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant={'destructive'}>
                                {dictionary?.core?.buttons['delete']}
                            </Button>
                        </DialogTrigger>
                        <DeleteCandidateDialog candidate={data} />
                    </Dialog>
                </div>
            </PageHeader>
            {data ? (
                <div className="relative grid grid-cols-1 lg:grid-cols-[360px_1fr]">
                    <ProfileSidePanel
                        candidate={data}
                        dictionary={dictionary}
                    />
                    <div className="relative h-full w-full">
                        <TabsSection candidate={data} dictionary={dictionary} />
                    </div>
                </div>
            ) : null}
        </section>
    )
}

export default CandidateDetailsSection
