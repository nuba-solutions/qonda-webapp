import Chat from '@/components/core/conversations/chat'
import { Separator } from '@/components/ui/separator'
import { TabsContent } from '@/components/ui/tabs'
import { TConversation } from '@/types/core/conversation'
import { TCandidate } from '@/types/pages/candidates/candidate'
import React from 'react'

const TabContentConversation = ({ candidate }: { candidate: TCandidate }) => {
    return (
        <TabsContent value="conversation" className="mt-0 p-4">
            <div className="lg:pl-1">
                <h2 className="text-md font-semibold">Chat</h2>
                <p className="text-xs text-muted-foreground">AI Conversation</p>
            </div>
            <Separator className="my-4" />
            <Chat
                conversation={
                    candidate.conversation as unknown as TConversation[]
                }
            />
        </TabsContent>
    )
}

export default TabContentConversation
