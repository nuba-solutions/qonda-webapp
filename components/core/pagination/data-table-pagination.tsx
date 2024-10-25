import { Table } from '@tanstack/react-table'
import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useDictionaryStore } from '@/stores/core/dictionary-store'

type TTablePaginationProps = {
    table: Table<any>
    tableData: any[]
    pageSizes?: number[]
    dictionary?: any
}

const DataTablePagination = ({
    table,
    tableData,
    pageSizes = [5, 10, 15, 20, 30, 40, 50],
}: TTablePaginationProps) => {
    const { dictionary } = useDictionaryStore()

    if (!tableData || tableData.length < 1) return null

    return (
        <nav
            className="flex flex-col gap-4 pt-4 sm:flex-row sm:items-center sm:justify-between lg:pt-2"
            aria-label="Table navigation"
        >
            <div className="flex flex-col sm:flex-row sm:items-center">
                <label
                    htmlFor="invoice-table-page-size-selector"
                    className="sr-only"
                >
                    {dictionary?.core?.pagination['select_size']}
                </label>
                <Select
                    value={String(table.getState().pagination.pageSize)}
                    onValueChange={(value) => table.setPageSize(Number(value))}
                >
                    <SelectTrigger
                        className="w-full sm:w-[180px]"
                        inputSize="sm"
                    >
                        <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                        {pageSizes.map((pageSize) => (
                            <SelectItem key={pageSize} value={String(pageSize)}>
                                {dictionary?.core?.pagination['show']}{' '}
                                {pageSize}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <span className="ml-4 hidden text-sm font-normal xl:block">
                    {dictionary?.core?.pagination['showing']}
                    <span className="mx-2 font-semibold">
                        {tableData.length > table.getState().pagination.pageSize
                            ? table.getState().pagination.pageSize
                            : tableData.length}
                    </span>
                    {dictionary?.core?.pagination['of']}
                    <span className="mx-2 font-semibold">
                        {tableData.length}
                    </span>
                    {dictionary?.core?.pagination['records']}
                </span>
            </div>
            <div className="flex items-center">
                <span className="mr-4 hidden items-center text-sm font-normal md:flex">
                    <div>{dictionary?.core?.pagination['page']}</div>
                    <strong className="mx-2 font-semibold">
                        {table.getState().pagination.pageIndex + 1}
                        <span className="mx-2 font-normal">of</span>
                        {table.getPageCount()}
                    </strong>
                </span>
                <ul className="inline-flex h-8 w-full -space-x-px text-sm sm:w-auto">
                    <li className="w-full sm:w-auto">
                        <Button
                            variant="secondary"
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}
                            className={cn('w-full rounded-r-none sm:w-auto')}
                        >
                            {dictionary?.core?.pagination['first']}
                        </Button>
                    </li>
                    <li className="w-full sm:w-auto">
                        <Button
                            variant="secondary"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            className={cn('w-full rounded-none sm:w-auto')}
                        >
                            {dictionary?.core?.pagination['previous']}
                        </Button>
                    </li>
                    <li className="w-full sm:w-auto">
                        <Button
                            variant="secondary"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                            className={cn('w-full rounded-none sm:w-auto')}
                        >
                            {dictionary?.core?.pagination['next']}
                        </Button>
                    </li>
                    <li className="w-full sm:w-auto">
                        <Button
                            variant="secondary"
                            onClick={() =>
                                table.setPageIndex(table.getPageCount() - 1)
                            }
                            disabled={!table.getCanNextPage()}
                            className={cn('w-full rounded-l-none sm:w-auto')}
                        >
                            {dictionary?.core?.pagination['last']}
                        </Button>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default DataTablePagination
