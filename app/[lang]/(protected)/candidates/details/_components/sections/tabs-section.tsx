import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TCandidate } from '@/types/pages/candidates/candidate'
import React from 'react'
import TabContentConversation from '../tab-contents/conversation'
import TabContentProfile from '../tab-contents/profile'
import TabContentEdit from '../tab-contents/edit'
import TabContentFiles from '../tab-contents/files'
import { TDictionary } from '@/types/core/dictionary'

const TabsSection = ({
    candidate,
    dictionary,
}: {
    candidate: TCandidate
    dictionary: TDictionary
}) => {
    return (
        <Tabs defaultValue="conversation" className="h-full w-full">
            <TabsList className="w-full justify-start overflow-x-auto overflow-y-hidden border-b pb-[3px]">
                <TabsTrigger value="conversation" className="antialiased">
                    Conversation
                </TabsTrigger>
                <TabsTrigger value="profile" className="antialiased lg:hidden">
                    Profile
                </TabsTrigger>
                <TabsTrigger value="edit" className="antialiased">
                    Edit
                </TabsTrigger>
                <TabsTrigger value="files" className="antialiased">
                    Files
                </TabsTrigger>
            </TabsList>
            <TabContentConversation
                conversationId={candidate.conversation_id}
            />
            <TabContentProfile candidate={candidate} dictionary={dictionary} />
            <TabContentEdit candidate={candidate} />
            <TabContentFiles />
        </Tabs>
    )
}

export default TabsSection
