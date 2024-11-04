'use client'

import { getCandidatesListByStatus } from '@/actions/pages/candidates/candidates'
import PageHeader from '@/components/core/headers/page-header'
import EmptyTableMessage from '@/components/core/messages/empty-table-message'
import DataTable from '@/components/core/tables/data-table'
import { Button } from '@/components/ui/button'
import { Locale } from '@/i18n.config'
import { useDictionaryStore } from '@/stores/core/dictionary-store'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { getCandidatesTableColumnsDefinition } from '../table/columns'
import TableLoader from '@/components/core/loaders/table-loader'
import NoDataMessage from '@/components/core/messages/no-data-message'
import ManageCandidateDrawer from '../drawers/manage-candidate'
import { getLocationsList } from '@/actions/core/locations'
import { getJobPositionsList } from '@/actions/core/job_positions'
import {
    TCandidateOriginStatus,
    useCandidateStore,
} from '@/stores/pages/candidates/candidate-store'

const CandidatesTableSection = ({
    origin,
    statuses,
}: {
    origin: TCandidateOriginStatus
    statuses: number[]
}) => {
    const { dictionary, language } = useDictionaryStore()
    const { updateOriginStatus } = useCandidateStore()
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        updateOriginStatus(origin)
    }, [origin])

    const { isPending, isError, data, isFetching } = useQuery({
        queryKey: ['candidates', origin],
        queryFn: () => getCandidatesListByStatus(statuses),
        refetchOnWindowFocus: false,
    })

    const { data: locationsList } = useQuery({
        queryKey: ['locations'],
        queryFn: () => getLocationsList(),
        refetchOnWindowFocus: false,
    })

    const { data: jobPositionsList } = useQuery({
        queryKey: ['job_positions'],
        queryFn: () => getJobPositionsList(),
        refetchOnWindowFocus: false,
    })

    if (!locationsList || !jobPositionsList) {
        return <TableLoader />
    }

    return (
        <>
            <ManageCandidateDrawer setIsOpen={setIsOpen} isOpen={isOpen} />
            <section id="candidates-section">
                <PageHeader
                    title={
                        origin === 'new-applicants'
                            ? dictionary?.pages?.candidates?.headers?.main[
                                  'title'
                              ]
                            : origin === 'employees'
                              ? dictionary?.pages?.employees?.headers?.main[
                                    'title'
                                ]
                              : dictionary?.pages?.former_employees?.headers
                                    ?.main['title']
                    }
                    subtitle={
                        origin === 'new-applicants'
                            ? dictionary?.pages?.candidates?.headers?.main[
                                  'subtitle'
                              ]
                            : origin === 'employees'
                              ? dictionary?.pages?.employees?.headers?.main[
                                    'subtitle'
                                ]
                              : dictionary?.pages?.former_employees?.headers
                                    ?.main['subtitle']
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
                                        language as Locale,
                                        origin,
                                        locationsList,
                                        jobPositionsList
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
