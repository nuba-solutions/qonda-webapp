'use client'

import DataTablePagination from '@/components/core/pagination/data-table-pagination'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { useDictionaryStore } from '@/stores/core/dictionary-store'
import { TDictionary } from '@/types/core/dictionary'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import {
    ColumnDef,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import React, { useState } from 'react'
import { HiXCircle } from 'react-icons/hi2'

type TDataTableProps<T> = {
    data: T[]
    columnDefinitions: ColumnDef<T>[]
    headers_dictionary: Partial<TDictionary>
}

function DataTable<T>({
    data,
    columnDefinitions,
    headers_dictionary,
}: TDataTableProps<T>) {
    const { dictionary } = useDictionaryStore()

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [searchValue, setSearchValue] = useState('')
    const [searchFilterValue, setSearchFilterValue] = useState('')

    const table = useReactTable({
        state: {
            globalFilter: searchValue || searchFilterValue,
            sorting,
            columnVisibility,
        },

        data: data,
        columns: columnDefinitions,
        getCoreRowModel: getCoreRowModel(),
        onGlobalFilterChange: setSearchValue || setSearchFilterValue,
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: 20,
            },
        },
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        enableSortingRemoval: false,
        enableMultiSort: false,
        onSortingChange: setSorting,
        autoResetPageIndex: false,
        enableFilters: true,
    })

    if (!headers_dictionary) return null

    return (
        <>
            <div className="flex flex-col gap-2 border-b pb-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full sm:w-[250px]">
                    <Input
                        inputSize="sm"
                        placeholder={
                            dictionary?.core?.inputs?.placeholders['search']
                        }
                        value={searchValue || ''}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <HiXCircle
                        className={cn(
                            'absolute bottom-1/2 right-2 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer',
                            !searchValue && 'hidden'
                        )}
                        onClick={() => setSearchValue('')}
                    />
                </div>
                <div className="flex items-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            asChild
                            className="w-full md:w-fit"
                        >
                            <Button variant="outline" className="ml-auto">
                                {dictionary?.core?.buttons['show_hide_columns']}
                                <ChevronDownIcon className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) =>
                                                column.toggleVisibility(!!value)
                                            }
                                        >
                                            {headers_dictionary[`${column.id}`]}
                                        </DropdownMenuCheckboxItem>
                                    )
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className="relative overflow-auto">
                <Table className="no-scrollbar relative overflow-auto whitespace-nowrap">
                    <TableHeader className="bg-nav uppercase">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table?.getRowModel().rows ? (
                            table?.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && 'selected'
                                    }
                                    className="h-12"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={data?.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <Separator className="my-3" />
            <DataTablePagination table={table} tableData={data} />
        </>
    )
}

export default DataTable
