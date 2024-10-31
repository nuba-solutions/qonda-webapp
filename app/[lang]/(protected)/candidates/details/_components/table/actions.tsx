import { buttonVariants } from '@/components/ui/button'
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
import { TDocument } from '@/types/core/document'
import { useState } from 'react'
import { DOCUMENT_STATUS } from '@/constants/statuses/statuses'
import DeleteCandidateDocumentDialog from '../dialogs/delete-dialog'
import ValidateCandidateDocumentDialog from '../dialogs/validate-dialog'
import ManageCandidateDocumentDialog from '../dialogs/manage-dialog'

const CandidatesDocumentsTableActions = ({ row }: { row: TDocument }) => {
    const { dictionary, language } = useDictionaryStore()
    const [isManageDialogOpen, setIsManageDialogOpen] = useState(false)
    const [isValidateDialogOpen, setIsValidateDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

    return (
        <>
            <ManageCandidateDocumentDialog
                isEdit={true}
                candidateDocument={row}
                isOpen={isManageDialogOpen}
                setIsOpen={setIsManageDialogOpen}
            />

            <ValidateCandidateDocumentDialog
                candidateDocument={row}
                isOpen={isValidateDialogOpen}
                setIsOpen={setIsValidateDialogOpen}
            />

            <DeleteCandidateDocumentDialog
                candidateDocument={row}
                isOpen={isDeleteDialogOpen}
                setIsOpen={setIsDeleteDialogOpen}
            />

            <TooltipProvider>
                <Tooltip>
                    <div className="flex items-center justify-center">
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
                                        {/* {
                                            dictionary?.pages?.candidates
                                                ?.tables?.actions['title']
                                        } */}
                                        Document
                                    </DropdownMenuLabel>
                                    <span className="px-2 pb-1.5 text-xs text-muted-foreground">
                                        {row.name}
                                    </span>
                                </span>
                                <Separator className="my-1" />
                                <DropdownMenuItem
                                    className="cursor-pointer"
                                    onSelect={(e) => {
                                        e.preventDefault()
                                        setIsManageDialogOpen(true)
                                    }}
                                >
                                    {dictionary?.core?.buttons['edit']} name
                                </DropdownMenuItem>
                                {row.status_id ===
                                DOCUMENT_STATUS.pending.id ? (
                                    <DropdownMenuItem
                                        className="cursor-pointer"
                                        onSelect={(e) => {
                                            e.preventDefault()
                                            setIsValidateDialogOpen(true)
                                        }}
                                    >
                                        Validate
                                    </DropdownMenuItem>
                                ) : null}
                                <DropdownMenuItem>
                                    <Link
                                        href={row.file.uri}
                                        target="_blank"
                                        className="h-full w-full"
                                    >
                                        Download
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="cursor-pointer"
                                    onSelect={(e) => {
                                        e.preventDefault()
                                        setIsDeleteDialogOpen(true)
                                    }}
                                >
                                    {dictionary?.core?.buttons['delete']}
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </Tooltip>
            </TooltipProvider>
        </>
    )
}

export default CandidatesDocumentsTableActions
