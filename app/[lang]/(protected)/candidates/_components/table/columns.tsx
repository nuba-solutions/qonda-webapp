import { ColumnDef } from '@tanstack/react-table'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { TDictionary } from '@/types/core/dictionary'
import { Locale } from '@/i18n.config'
import { TCandidate } from '@/types/pages/candidates/candidate'
import CandidatesTableActions from './actions'
import {
    getTranslatedCandidateStatus,
    renderCandidateStatus,
} from '@/helpers/table'

export const getCandidatesTableColumnsDefinition = (
    dictionary: TDictionary,
    lang: Locale
) => {
    const tableColumns: ColumnDef<TCandidate>[] = [
        {
            accessorKey: 'id',
            header: ({ column }) => {
                return (
                    <span
                        className="flex h-10 cursor-pointer items-center gap-2 font-semibold"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === 'asc')
                        }
                    >
                        {dictionary?.pages?.candidates?.tables?.headers['id']}
                        <CaretSortIcon className="h-4 w-4" />
                    </span>
                )
            },
            cell: ({ row }) => <div>{row.getValue('id')}</div>,
        },
        {
            accessorKey: 'first_name',
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
                                'first_name'
                            ]
                        }
                        <CaretSortIcon className="h-4 w-4" />
                    </span>
                )
            },
            cell: ({ row }) => <div>{row.getValue('first_name')}</div>,
        },
        {
            accessorKey: 'last_name',
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
                                'last_name'
                            ]
                        }
                        <CaretSortIcon className="h-4 w-4" />
                    </span>
                )
            },
            cell: ({ row }) => <div>{row.getValue('last_name')}</div>,
        },
        {
            accessorKey: 'age',
            header: ({ column }) => {
                return (
                    <span
                        className="flex h-10 cursor-pointer items-center gap-2 font-semibold"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === 'asc')
                        }
                    >
                        {dictionary?.pages?.candidates?.tables?.headers['age']}
                        <CaretSortIcon className="h-4 w-4" />
                    </span>
                )
            },
            cell: ({ row }) => <div>{row.getValue('age')}</div>,
        },
        {
            accessorKey: 'phone',
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
                                'phone'
                            ]
                        }
                        <CaretSortIcon className="h-4 w-4" />
                    </span>
                )
            },
            cell: ({ row }) => <div>{row.getValue('phone')}</div>,
        },
        {
            accessorKey: 'email',
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
                                'email'
                            ]
                        }
                        <CaretSortIcon className="h-4 w-4" />
                    </span>
                )
            },
            cell: ({ row }) => <div>{row.getValue('email')}</div>,
        },
        {
            accessorKey: 'location_id',
            accessorFn: (candidate) => candidate.location.name || '',
            header: ({ column }) => {
                return (
                    <span
                        className="flex h-10 cursor-pointer items-center gap-2 font-semibold"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === 'asc')
                        }
                    >
                        {/* {dictionary?.pages?.candidates?.tables?.headers['unit']} */}
                        Location
                        <CaretSortIcon className="h-4 w-4" />
                    </span>
                )
            },
            cell: ({ row }) => <div>{row.getValue('location_id')}</div>,
        },
        {
            accessorKey: 'status',
            accessorFn: (candidate) =>
                getTranslatedCandidateStatus(candidate.status_id, dictionary),
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
                renderCandidateStatus(
                    row.original?.status_id,
                    row.getValue('status')
                ),
        },
        // {
        //     accessorKey: 'interview_date',
        //     accessorFn: (candidate) =>
        //         renderLocaleDate(candidate.interview_date, lang),
        //     header: ({ column }) => {
        //         return (
        //             <span
        //                 className="flex h-10 cursor-pointer items-center gap-2 font-semibold"
        //                 onClick={() =>
        //                     column.toggleSorting(column.getIsSorted() === 'asc')
        //                 }
        //             >
        //                 {
        //                     dictionary?.pages?.candidates?.tables?.headers[
        //                         'interview_date'
        //                     ]
        //                 }
        //                 <CaretSortIcon className="h-4 w-4" />
        //             </span>
        //         )
        //     },
        //     cell: ({ row }) => <div>{row.getValue('interview_date')}</div>,
        // },
        // {
        //     accessorKey: 'enrollment_date',
        //     accessorFn: (candidate) =>
        //         renderLocaleDate(
        //             (candidate.enrollment_start as Date) || '',
        //             lang
        //         ),
        //     header: ({ column }) => {
        //         return (
        //             <span
        //                 className="flex h-10 cursor-pointer items-center gap-2 font-semibold"
        //                 onClick={() =>
        //                     column.toggleSorting(column.getIsSorted() === 'asc')
        //                 }
        //             >
        //                 {
        //                     dictionary?.pages?.candidates?.tables?.headers[
        //                         'enrollment_date'
        //                     ]
        //                 }
        //                 <CaretSortIcon className="h-4 w-4" />
        //             </span>
        //         )
        //     },
        //     cell: ({ row }) => (
        //         <div className="ml-auto">{row.getValue('enrollment_date')}</div>
        //     ),
        // },
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
                <CandidatesTableActions row={row.row.original} />
            ),
            enableHiding: false,
        },
    ]

    return tableColumns
}
