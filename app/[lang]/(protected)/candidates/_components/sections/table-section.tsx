'use client'

import { getCandidatesList } from '@/actions/pages/candidates/candidates'
import PageHeader from '@/components/core/headers/page-header'
import EmptyTableMessage from '@/components/core/messages/empty-table-message'
import DataTable from '@/components/core/tables/data-table'
import { Button, buttonVariants } from '@/components/ui/button'
import { Locale } from '@/i18n.config'
import { useDictionaryStore } from '@/stores/core/dictionary-store'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import React, { useState } from 'react'
import { getCandidatesTableColumnsDefinition } from '../table/columns'
import { cn } from '@/lib/utils'
import TableLoader from '@/components/core/loaders/table-loader'
import NoDataMessage from '@/components/core/messages/no-data-message'
import ManageCandidateDrawer from '../drawers/manage-candidate'

const CandidatesTableSection = () => {
    const { dictionary, language } = useDictionaryStore()
    const [isOpen, setIsOpen] = useState(false)
    const { isPending, isError, data, isFetching } = useQuery({
        queryKey: ['candidates'],
        queryFn: () => getCandidatesList(),
        refetchOnWindowFocus: false,
    })

    return (
        <>
            <ManageCandidateDrawer setIsOpen={setIsOpen} isOpen={isOpen} />
            <section id="candidates-section">
                <PageHeader
                    title={
                        dictionary?.pages?.candidates?.headers?.main['title']
                    }
                    subtitle={
                        dictionary?.pages?.candidates?.headers?.main['subtitle']
                    }
                    className="flex-row items-center justify-between"
                >
                    <Button onClick={() => setIsOpen(true)}>
                        {
                            dictionary?.pages?.candidates?.buttons[
                                'add_candidate'
                            ]
                        }
                    </Button>
                </PageHeader>
                {isError ? (
                    <NoDataMessage />
                ) : isFetching || isPending ? (
                    <TableLoader />
                ) : (
                    <div className="relative p-4">
                        {data && data.length > 0 ? (
                            data && dictionary ? (
                                <DataTable
                                    data={data}
                                    columnDefinitions={getCandidatesTableColumnsDefinition(
                                        dictionary,
                                        language as Locale
                                    )}
                                    headers_dictionary={
                                        dictionary?.pages?.candidates?.tables
                                            ?.filter_dropdown
                                    }
                                />
                            ) : null
                        ) : (
                            <EmptyTableMessage
                                title={
                                    dictionary?.pages?.candidates?.tables
                                        ?.empty['title']
                                }
                                subtitle={
                                    dictionary?.pages?.candidates?.tables
                                        ?.empty['subtitle']
                                }
                            />
                        )}
                    </div>
                )}
            </section>
        </>
    )
}

export default CandidatesTableSection
