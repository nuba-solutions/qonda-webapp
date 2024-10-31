'use client'

import EmptyTableMessage from '@/components/core/messages/empty-table-message'
import DataTable from '@/components/core/tables/data-table'
import { Locale } from '@/i18n.config'
import { useDictionaryStore } from '@/stores/core/dictionary-store'
import { getCandidatesDocumentsTableColumnsDefinition } from '../table/columns'
import { TDocument } from '@/types/core/document'
import { getUsersList } from '@/actions/pages/users/users'
import { useQuery } from '@tanstack/react-query'
import { TUser } from '@/types/pages/users/users'

const CandidatesDocumentsTableSection = ({
    documents,
}: {
    documents: TDocument[]
}) => {
    const { dictionary, language } = useDictionaryStore()
    const {
        isPending,
        isError,
        data: usersList,
        isFetching,
    } = useQuery<TUser[]>({
        queryKey: ['users'],
        queryFn: () => getUsersList(),
        refetchOnWindowFocus: false,
    })

    if (isPending || isFetching || isError) {
        return null
    }

    return (
        <section id="candidates-documents-section">
            <div className="relative">
                {documents && documents.length > 0 ? (
                    documents && dictionary ? (
                        <DataTable
                            data={documents}
                            columnDefinitions={getCandidatesDocumentsTableColumnsDefinition(
                                dictionary,
                                language as Locale,
                                usersList
                            )}
                            headers_dictionary={
                                dictionary?.pages?.candidates?.tables
                                    ?.filter_dropdown
                            }
                        />
                    ) : null
                ) : (
                    <EmptyTableMessage
                        className="min-h-[calc(100vh-25rem)] lg:min-h-[calc(100vh-20rem)]"
                        title={
                            // dictionary?.pages?.candidates?.tables?.empty['title']
                            'No documents found'
                        }
                        subtitle={
                            // dictionary?.pages?.candidates?.tables?.empty['subtitle']
                            "This candidate doesn't have any documents yet!"
                        }
                    />
                )}
            </div>
        </section>
    )
}

export default CandidatesDocumentsTableSection
