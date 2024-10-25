import { buttonVariants } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import Link from 'next/link'
import { HiEllipsisHorizontal } from 'react-icons/hi2'
import { useDictionaryStore } from '@/stores/core/dictionary-store'
import { TCandidate } from '@/types/pages/candidates/candidate'
import DeleteCandidateDialog from '../dialogs/delete-dialog'

const CandidatesTableActions = ({ row }: { row: TCandidate }) => {
    const { dictionary, language } = useDictionaryStore()

    return (
        <TooltipProvider>
            <Tooltip>
                <div className="flex items-center justify-center">
                    <Dialog>
                        <DropdownMenu modal={false}>
                            <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center p-0">
                                <TooltipTrigger asChild>
                                    <div
                                        className={buttonVariants({
                                            variant: 'outline',
                                            size: 'icon',
                                        })}
                                    >
                                        <span className="sr-only">
                                            Open menu
                                        </span>
                                        <HiEllipsisHorizontal className="h-4 w-4" />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>
                                        {
                                            dictionary?.pages?.candidates
                                                ?.tables?.headers['actions']
                                        }
                                    </p>
                                </TooltipContent>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="end"
                                className="min-w-[220px] shadow-2xl"
                            >
                                <span className="flex flex-col">
                                    <DropdownMenuLabel className="pb-0">
                                        {
                                            dictionary?.pages?.candidates
                                                ?.tables?.actions['title']
                                        }
                                    </DropdownMenuLabel>
                                    <span className="px-2 pb-1.5 text-xs text-muted-foreground">
                                        {row.first_name} {row.last_name}
                                    </span>
                                </span>
                                <Separator className="my-1" />
                                <DropdownMenuItem>
                                    <Link
                                        className="h-full w-full"
                                        href={{
                                            pathname: `/${language}/candidates/details`,
                                            query: {
                                                candidateId: JSON.stringify(
                                                    row.id
                                                ),
                                            },
                                        }}
                                        scroll={false}
                                    >
                                        {
                                            dictionary?.pages?.candidates
                                                ?.tables?.actions['details']
                                        }
                                    </Link>
                                </DropdownMenuItem>
                                <DialogTrigger asChild>
                                    <DropdownMenuItem className="cursor-pointer">
                                        {dictionary?.core?.buttons['delete']}
                                    </DropdownMenuItem>
                                </DialogTrigger>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <DeleteCandidateDialog candidate={row} />
                    </Dialog>
                </div>
            </Tooltip>
        </TooltipProvider>
    )
}

export default CandidatesTableActions
