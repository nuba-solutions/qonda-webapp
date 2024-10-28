import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { TConversation, TMessage } from '@/types/core/conversation'
import { HiPaperAirplane } from 'react-icons/hi2'
import { ScrollArea } from '@/components/ui/scroll-area'
import { format } from 'date-fns'
import {
    checkIfMessageIsFromToday,
    groupMessagesByDate,
} from '@/helpers/conversation'
import { useUserStore } from '@/stores/core/user-store'
import { updateConversation } from '@/actions/core/conversations'

const Chat = ({
    entityId,
    entityType,
    conversation,
}: {
    entityId: number
    entityType: string
    conversation: TConversation
}) => {
    const { user } = useUserStore()
    const [messages, setMessages] = useState<TConversation[]>([])
    const [messageText, setNewMessageText] = useState<string>('')
    const messageEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const groupedMessages = groupMessagesByDate(conversation)
        setMessages(groupedMessages)
    }, [conversation])

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: 'auto' })
    }, [messages])

    const handleCreateNewMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const newMessage = {
            message_id: conversation.length + 1,
            message: messageText,
            role: 'internal_user',
            timestamp: new Date().toISOString(),
            internal_user_name: `${user.first_name} ${user.last_name}`,
        }

        const response = await updateConversation(
            entityId,
            newMessage as TMessage
        )
        setMessages(groupMessagesByDate(response))
        setNewMessageText('')
    }

    return (
        <div className="grid h-[calc(100vh-19rem)] grid-cols-1 grid-rows-[1fr_50px]">
            <ScrollArea className="h-full rounded-md border bg-panel p-4">
                {Object.entries(messages).map(([date, messages]) => (
                    <React.Fragment key={date}>
                        <div className="mx-auto my-2 w-fit rounded-sm border bg-foreground/5 px-2 py-1 text-xs">
                            {checkIfMessageIsFromToday(date)
                                ? 'Today'
                                : format(new Date(date), 'MMM dd, yyyy')}
                        </div>

                        {messages.map((message: TMessage) => (
                            <React.Fragment key={message.message_id}>
                                <div className="mx-auto 3xl:max-w-6xl">
                                    <div
                                        className={cn(
                                            'w-fit lg:max-w-[50%]',
                                            message.role === 'external_user'
                                                ? 'mr-auto'
                                                : 'ml-auto'
                                        )}
                                    >
                                        <div
                                            className={cn(
                                                'mb-4 flex max-w-fit rounded-lg border p-4 shadow-md',
                                                message.role === 'external_user'
                                                    ? 'bg-background dark:bg-secondary'
                                                    : message.role ===
                                                        'internal_user'
                                                      ? 'bg-blue-200 text-right dark:text-background'
                                                      : 'bg-primary-500 text-right text-white'
                                            )}
                                        >
                                            <div>
                                                <p className="mb-1 font-semibold">
                                                    {message.role ===
                                                    'external_user'
                                                        ? entityType || 'User'
                                                        : message.role ===
                                                            'assistant'
                                                          ? 'AI Assistant'
                                                          : message.internal_user_name ||
                                                            'System user'}
                                                </p>
                                                <p className="mb-2">
                                                    {message.message}
                                                </p>
                                                <p
                                                    className={cn(
                                                        'text-xs text-muted-foreground',
                                                        message.role ===
                                                            'external_user'
                                                            ? 'text-muted-foreground'
                                                            : message.role ===
                                                                'internal_user'
                                                              ? 'dark:text-background/50'
                                                              : 'text-primary-100'
                                                    )}
                                                >
                                                    {format(
                                                        new Date(
                                                            message.timestamp
                                                        ),
                                                        'hh:mm a'
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>
                        ))}
                    </React.Fragment>
                ))}
                <div ref={messageEndRef} />
            </ScrollArea>
            <form
                className="grid w-full grid-cols-[1fr_auto] items-center gap-2 pt-4"
                onSubmit={handleCreateNewMessage}
            >
                <Input
                    placeholder={'Start typing ...'}
                    inputSize="sm"
                    className="max-w-full"
                    value={messageText}
                    onChange={(e) => setNewMessageText(e.target.value)}
                />
                <Button type="submit" size="icon" disabled={!messageText}>
                    <HiPaperAirplane className="h-4 w-4" />
                </Button>
            </form>
        </div>
    )
}

export default Chat
