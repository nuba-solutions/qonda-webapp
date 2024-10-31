import { ColumnDef } from '@tanstack/react-table'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { TDictionary } from '@/types/core/dictionary'
import { Locale } from '@/i18n.config'
import {
    getTranslatedDocumentStatus,
    renderDocumentStatus,
    renderLocaleDate,
} from '@/helpers/table'
import { TDocument } from '@/types/core/document'
import { TUser } from '@/types/pages/users/users'
import CandidatesDocumentsTableActions from './actions'

export const getCandidatesDocumentsTableColumnsDefinition = (
    dictionary: TDictionary,
    lang: Locale,
    usersList: TUser[]
) => {
    const tableColumns: ColumnDef<TDocument>[] = [
        {
            accessorKey: 'name',
            header: ({ column }) => {
                return (
                    <span
                        className="flex h-10 cursor-pointer items-center gap-2 font-semibold"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === 'asc')
                        }
                    >
                        {/* {
                            dictionary?.pages?.candidates?.tables?.headers[
                                'name'
                            ]
                        } */}
                        Name
                        <CaretSortIcon className="h-4 w-4" />
                    </span>
                )
            },
            cell: ({ row }) => <div>{row.getValue('name')}</div>,
        },
        {
            accessorKey: 'created_date',
            accessorFn: (document) =>
                renderLocaleDate(document.created_date, lang),
            header: ({ column }) => {
                return (
                    <span
                        className="flex h-10 cursor-pointer items-center gap-2 font-semibold"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === 'asc')
                        }
                    >
                        {/* {
                            dictionary?.pages?.candidates?.tables?.headers[
                                'created_date'
                            ]
                        } */}
                        Created date
                        <CaretSortIcon className="h-4 w-4" />
                    </span>
                )
            },
            cell: ({ row }) => <div>{row.getValue('created_date')}</div>,
        },
        {
            accessorKey: 'status_id',
            accessorFn: (document) =>
                getTranslatedDocumentStatus(document.status_id, dictionary),
            header: ({ column }) => {
                return (
                    <span
                        className="flex h-10 cursor-pointer items-center gap-2 font-semibold"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === 'asc')
                        }
                    >
                        {
                            dictionary?.pages?.candidates?.tables?.headers[
                                'status'
                            ]
                        }
                        <CaretSortIcon className="h-4 w-4" />
                    </span>
                )
            },
            cell: ({ row }) =>
                renderDocumentStatus(
                    row.original?.status_id,
                    row.getValue('status_id')
                ),
        },
        {
            accessorKey: 'validated_date',
            accessorFn: (document) =>
                renderLocaleDate(document.validated_date, lang),
            header: ({ column }) => {
                return (
                    <span
                        className="flex h-10 cursor-pointer items-center gap-2 font-semibold"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === 'asc')
                        }
                    >
                        {/* {dictionary?.pages?.candidates?.tables?.headers['validated_date']} */}
                        Validated date
                        <CaretSortIcon className="h-4 w-4" />
                    </span>
                )
            },
            cell: ({ row }) => <div>{row.getValue('validated_date')}</div>,
        },
        {
            accessorKey: 'validated_by_id',
            accessorFn: (document) => {
                const user = usersList.find(
                    (usr) => usr.id === document.validated_by_id
                )
                return user ? `${user?.first_name} ${user?.last_name}` : ''
            },
            header: ({ column }) => {
                return (
                    <span
                        className="flex h-10 cursor-pointer items-center gap-2 font-semibold"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === 'asc')
                        }
                    >
                        {/* {
                            dictionary?.pages?.candidates?.tables?.headers[
                                'validated_by_id'
                            ]
                        } */}
                        Validated by
                        <CaretSortIcon className="h-4 w-4" />
                    </span>
                )
            },
            cell: ({ row }) => <div>{row.getValue('validated_by_id')}</div>,
        },
        {
            header: () => {
                return (
                    <span className="mx-auto flex h-10 w-full items-center justify-center font-semibold">
                        {
                            dictionary?.pages?.candidates?.tables?.headers[
                                'actions'
                            ]
                        }
                    </span>
                )
            },
            accessorKey: 'actions',
            cell: (row: any) => (
                <CandidatesDocumentsTableActions row={row.row.original} />
            ),
            enableHiding: false,
        },
    ]

    return tableColumns
}
