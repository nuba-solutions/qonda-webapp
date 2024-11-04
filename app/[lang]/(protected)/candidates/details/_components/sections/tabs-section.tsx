import React from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TCandidate } from '@/types/pages/candidates/candidate'
import TabContentConversation from '../tab-contents/conversation'
import TabContentProfile from '../tab-contents/profile'
import TabContentEdit from '../tab-contents/edit'
import { TDictionary } from '@/types/core/dictionary'
import { useWindowSize } from '@/hooks/useWindowSize'
import TabsSectionSkeleton from '@/components/core/skeletons/tabs-section-skeleton'
import TabContentDocuments from '../tab-contents/documents'
import { useCandidateStore } from '@/stores/pages/candidates/candidate-store'
import TabContentStatusChange from '../tab-contents/status-change'
import TabContentScheduler from '../tab-contents/scheduler'

const TabsSection = ({
    candidate,
    dictionary,
}: {
    candidate: TCandidate
    dictionary: TDictionary
}) => {
    const { current_tab, updateSelectedTab } = useCandidateStore()
    const { width } = useWindowSize()

    if (!candidate || !dictionary || !dictionary.pages?.candidates) {
        return <TabsSectionSkeleton />
    }

    const defaultTabValue = current_tab
        ? current_tab
        : width && width < 1024
          ? 'profile'
          : 'edit'
    if (!width) return null

    return (
        <Tabs defaultValue={defaultTabValue} className="h-full w-full">
            <TabsList className="h-[4rem] w-full justify-start overflow-x-auto overflow-y-hidden rounded-none border-b bg-background p-0">
                <TabsTrigger
                    onClick={() => updateSelectedTab('profile')}
                    value="profile"
                    className="h-full rounded-none border-y border-transparent px-4 font-semibold uppercase leading-[normal] data-[state=active]:border-b-primary-500 data-[state=active]:text-primary data-[state=active]:shadow-none lg:hidden lg:px-6"
                >
                    Profile
                </TabsTrigger>
                <TabsTrigger
                    onClick={() => updateSelectedTab('edit')}
                    value="edit"
                    className="h-full rounded-none border-y border-transparent px-4 font-semibold uppercase leading-[normal] data-[state=active]:border-b-primary-500 data-[state=active]:text-primary data-[state=active]:shadow-none lg:px-6"
                >
                    Edit
                </TabsTrigger>
                <TabsTrigger
                    onClick={() => updateSelectedTab('documents')}
                    value="documents"
                    className="h-full rounded-none border-y border-transparent px-4 font-semibold uppercase leading-[normal] data-[state=active]:border-b-primary-500 data-[state=active]:text-primary data-[state=active]:shadow-none lg:px-6"
                >
                    Documents
                </TabsTrigger>
                <TabsTrigger
                    onClick={() => updateSelectedTab('conversation')}
                    value="conversation"
                    className="h-full rounded-none border-y border-transparent px-4 font-semibold uppercase leading-[normal] data-[state=active]:border-b-primary-500 data-[state=active]:text-primary data-[state=active]:shadow-none lg:px-6"
                >
                    Conversation
                </TabsTrigger>
                <TabsTrigger
                    onClick={() => updateSelectedTab('status_change')}
                    value="status_change"
                    className="h-full rounded-none border-y border-transparent px-4 font-semibold uppercase leading-[normal] data-[state=active]:border-b-primary-500 data-[state=active]:text-primary data-[state=active]:shadow-none lg:px-6"
                >
                    Status change
                </TabsTrigger>
                <TabsTrigger
                    onClick={() => updateSelectedTab('scheduler')}
                    value="scheduler"
                    className="h-full rounded-none border-y border-transparent px-4 font-semibold uppercase leading-[normal] data-[state=active]:border-b-primary-500 data-[state=active]:text-primary data-[state=active]:shadow-none lg:px-6"
                >
                    Scheduler
                </TabsTrigger>
            </TabsList>
            <TabContentConversation candidate={candidate} />
            <TabContentProfile candidate={candidate} />
            <TabContentEdit candidate={candidate} />
            <TabContentDocuments candidate={candidate} />
            <TabContentStatusChange candidate={candidate} />
            <TabContentScheduler candidate={candidate} />
        </Tabs>
    )
}

export default TabsSection
