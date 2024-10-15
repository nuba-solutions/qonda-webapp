'use client'

import { getCandidateByID } from '@/actions/pages/candidates/candidates'
import PageHeader from '@/components/core/headers/page-header'
import { Button, buttonVariants } from '@/components/ui/button'
import { useDictionaryStore } from '@/stores/dictionary-store'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import ProfileSidePanel from '@/components/core/panels/profile-side-panel'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import TabContentFiles from '../tab-contents/files'
import TabContentEdit from '../tab-contents/edit'
import TabContentConversation from '../tab-contents/conversation'
import TabContentProfile from '../tab-contents/profile'
import NoDataMessage from '@/components/core/messages/no-data-message'
import {
    getTranslatedCandidateStatus,
    renderCandidateStatus,
    renderLocaleDate,
} from '@/helpers/table'
import TableLoader from '@/components/core/loaders/table-loader'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import DeleteCandidateDialog from '../../../_components/dialogs/delete-dialog'

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
                        entityData={data}
                        entityEmail={data.email}
                    >
                        <ul className="grid max-h-[500px] min-h-[350px] grid-cols-1 p-4 px-8">
                            <li className="flex items-center justify-between">
                                <p className="font-semibold text-muted-foreground">
                                    First name
                                </p>
                                <p>{data.first_name}</p>
                            </li>
                            <li className="flex items-center justify-between">
                                <p className="font-semibold text-muted-foreground">
                                    Last name
                                </p>
                                <p>{data.last_name}</p>
                            </li>
                            <li className="flex items-center justify-between">
                                <p className="font-semibold text-muted-foreground">
                                    Age
                                </p>
                                <p>{data.age}</p>
                            </li>
                            <li className="flex items-center justify-between">
                                <p className="font-semibold text-muted-foreground">
                                    Phone
                                </p>
                                <p>{data.phone}</p>
                            </li>
                            <li className="flex items-center justify-between">
                                <p className="font-semibold text-muted-foreground">
                                    Email
                                </p>
                                <p>{data.email}</p>
                            </li>
                            <li className="flex items-center justify-between">
                                <p className="font-semibold text-muted-foreground">
                                    Unit / Sucursal
                                </p>
                                <p>{data.unit}</p>
                            </li>
                            <li className="flex items-center justify-between">
                                <p className="font-semibold text-muted-foreground">
                                    Status
                                </p>
                                {renderCandidateStatus(
                                    data.status,
                                    getTranslatedCandidateStatus(
                                        data.status,
                                        dictionary
                                    )
                                )}
                            </li>
                            <li className="flex items-center justify-between">
                                <p className="font-semibold text-muted-foreground">
                                    Interview date
                                </p>
                                {renderLocaleDate(
                                    data.interview_date,
                                    dictionary
                                )}
                            </li>
                            <li className="flex items-center justify-between">
                                <p className="font-semibold text-muted-foreground">
                                    Interview date
                                </p>
                                {renderLocaleDate(
                                    data.enrollment_date,
                                    dictionary
                                )}
                            </li>
                        </ul>
                        <div className="flex items-center justify-center border-t px-8">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button
                                        className="w-full"
                                        variant={'destructive'}
                                    >
                                        {dictionary?.core?.buttons['delete']}
                                    </Button>
                                </DialogTrigger>
                                <DeleteCandidateDialog candidate={data} />
                            </Dialog>
                        </div>
                    </ProfileSidePanel>
                    <div className="relative h-full w-full p-4">
                        <Tabs
                            defaultValue="conversation"
                            className="h-full w-full"
                        >
                            <TabsList className="w-full justify-start border-b pb-[3px]">
                                <TabsTrigger value="conversation">
                                    Conversation
                                </TabsTrigger>
                                <TabsTrigger
                                    value="profile"
                                    className="lg:hidden"
                                >
                                    Profile
                                </TabsTrigger>
                                <TabsTrigger value="edit">Edit</TabsTrigger>
                                <TabsTrigger value="files">Files</TabsTrigger>
                            </TabsList>
                            <TabContentConversation
                                conversationId={data.conversation_id}
                            />
                            <TabContentProfile
                                candidate={data}
                                dictionary={dictionary}
                            />
                            <TabContentEdit candidate={data} />
                            <TabContentFiles />
                        </Tabs>
                    </div>
                </div>
            ) : null}
        </section>
    )
}

export default CandidateDetailsSection
