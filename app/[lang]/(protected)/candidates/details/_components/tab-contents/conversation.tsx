import Chat from '@/components/core/conversations/chat'
import { Separator } from '@/components/ui/separator'
import { TabsContent } from '@/components/ui/tabs'
import { TConversation } from '@/types/core/conversation'
import { TCandidate } from '@/types/pages/candidates/candidate'
import React from 'react'

const TabContentConversation = ({ candidate }: { candidate: TCandidate }) => {
    return (
        <TabsContent value="conversation" className="mt-0 p-4">
            <div className="flex items-center justify-between">
                <div className="lg:pl-1">
                    <h2 className="text-md font-semibold">Chat</h2>
                    <p className="text-xs text-muted-foreground">
                        AI Conversation
                    </p>
                </div>
                <div className="hidden items-center gap-2 sm:flex">
                    <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full border border-foreground bg-background shadow-sm dark:bg-secondary" />
                        <p className="text-xs">Candidate</p>
                    </div>
                    <Separator
                        className="mx-2 h-[10px] bg-foreground"
                        orientation="vertical"
                    />
                    <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full border border-foreground bg-primary-500 shadow-sm" />
                        <p className="text-xs">AI Assistant</p>
                    </div>
                    <Separator
                        className="mx-2 h-[10px] bg-foreground"
                        orientation="vertical"
                    />
                    <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full border border-foreground bg-blue-200 shadow-sm" />
                        <p className="text-xs">Internal Users</p>
                    </div>
                </div>
            </div>
            <Separator className="my-4" />
            <Chat
                entityId={candidate.id}
                entityType={'Candidate'}
                conversation={
                    candidate.conversation as unknown as TConversation
                }
            />
        </TabsContent>
    )
}

export default TabContentConversation
