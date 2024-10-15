import { getConversationByID } from '@/actions/core/conversation'
import Conversation from '@/components/core/conversations/conversation'
import TabLoader from '@/components/core/loaders/tab-loader'
import { TabsContent } from '@/components/ui/tabs'
import { TConversation } from '@/types/core/conversation'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const TabContentConversation = ({
    conversationId,
}: {
    conversationId: string
}) => {
    const { isPending, isError, data, isFetching } = useQuery({
        queryKey: ['conversation', conversationId],
        queryFn: () => getConversationByID(conversationId),
        refetchOnWindowFocus: false,
    })
    if (isPending || isFetching) {
        return <TabLoader />
    }

    if (isError) {
        return <div>Error fetching conversation</div>
    }

    return (
        <TabsContent value="conversation">
            <Conversation conversationData={data as TConversation} />
        </TabsContent>
    )
}

export default TabContentConversation
