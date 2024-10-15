'use client'

import { getCandidateByID } from '@/actions/pages/candidates/candidates'
import PageHeader from '@/components/core/headers/page-header'
import { buttonVariants } from '@/components/ui/button'
import { useDictionaryStore } from '@/stores/dictionary-store'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import NoDataMessage from '@/components/core/messages/no-data-message'
import TableLoader from '@/components/core/loaders/table-loader'
import ProfileSidePanel from '../panel/profile-side-panel'
import TabsSection from './tabs-section'

const CandidateDetailsSection = ({ candidateId }: { candidateId: number }) => {
    const { dictionary, language } = useDictionaryStore()
    const { isPending, isError, data, isFetching } = useQuery({
        queryKey: ['candidate', candidateId],
        queryFn: () => getCandidateByID(candidateId),
        refetchOnWindowFocus: false,
    })

    return (
        <section id="candidate-details-section">
            <PageHeader
                title={dictionary?.pages?.candidates?.headers?.main['title']}
                subtitle={
                    dictionary?.pages?.candidates?.headers?.main['subtitle']
                }
                className="flex-row items-center justify-between"
            >
                <Link
                    href={`/${language}/candidates`}
                    className={cn(
                        buttonVariants({
                            variant: 'outline',
                        })
                    )}
                    scroll={false}
                >
                    {dictionary?.core?.buttons['cancel']}
                </Link>
            </PageHeader>
            {isError ? (
                <NoDataMessage />
            ) : isFetching || isPending ? (
                <TableLoader />
            ) : data && dictionary ? (
                <div className="relative grid grid-cols-1 lg:grid-cols-[400px_1fr]">
                    <ProfileSidePanel
                        candidate={data}
                        dictionary={dictionary}
                    />
                    <div className="relative h-full w-full p-4">
                        <TabsSection candidate={data} dictionary={dictionary} />
                    </div>
                </div>
            ) : null}
        </section>
    )
}

export default CandidateDetailsSection
