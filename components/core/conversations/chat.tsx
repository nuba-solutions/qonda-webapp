import React, { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { TConversation } from '@/types/core/conversation'
import { HiPaperAirplane } from 'react-icons/hi2'
import { ScrollArea } from '@/components/ui/scroll-area'
import { format } from 'date-fns'
import {
    checkIfMessageIsFromToday,
    groupMessagesByDate,
} from '@/helpers/conversation'

const Chat = ({ conversation }: { conversation: TConversation[] }) => {
    const [isInitialLoad, setIsInitialLoad] = useState(true)

    const [messages, setMessages] = useState<TConversation[][]>([])

    useEffect(() => {
        const groupedMessages = groupMessagesByDate(conversation)
        setMessages(groupedMessages)
    }, [conversation])

    const messageEndRef = useRef<HTMLDivElement>(null)

    // useEffect(() => {
    //     if (isInitialLoad) {
    //         messageEndRef.current?.scrollIntoView({ behavior: 'auto' }) // Immediate scroll
    //         setIsInitialLoad(false)
    //     } else {
    //         messageEndRef.current?.scrollIntoView({ behavior: 'smooth' }) // Smooth scroll
    //     }
    // }, [messages])

    // if (isInitialLoad) {
    //     messageEndRef.current?.scrollIntoView({ behavior: 'auto' })
    //     setIsInitialLoad(false) // Set initial load to false after first render
    // } else {
    //     messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    // }

    return (
        <div className="grid h-[calc(100vh-19rem)] grid-cols-1 grid-rows-[1fr_50px]">
            <ScrollArea className="h-full rounded-md border bg-panel p-4">
                {Object.entries(messages).map(([date, messages]) => (
                    <React.Fragment key={date}>
                        <div className="mx-auto my-2 w-fit rounded-sm border bg-foreground/10 px-2 py-1 text-xs text-muted-foreground">
                            {checkIfMessageIsFromToday(date)
                                ? 'Today'
                                : format(new Date(date), 'MMM dd, yyyy')}
                        </div>

                        {messages.map((message: TConversation) => (
                            <React.Fragment key={message.message_id}>
                                <div className="mx-auto 3xl:max-w-6xl">
                                    <div className="relative z-20 ml-auto w-fit lg:max-w-[50%]">
                                        <div
                                            className={cn(
                                                'mb-4 ml-auto flex max-w-fit rounded-lg border bg-primary-500 p-4 pl-8 text-right text-white shadow-md'
                                            )}
                                        >
                                            <div>
                                                <p className="mb-2">
                                                    {message.assistant_response}
                                                </p>
                                                <p className="text-xs text-primary-100">
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

                                    <div className="relative z-20">
                                        <div
                                            className={cn(
                                                'mb-4 flex max-w-fit rounded-lg border bg-background p-4 pr-8 shadow-md dark:bg-secondary'
                                            )}
                                        >
                                            <div>
                                                <p className="mb-2">
                                                    {message.user_message}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
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
            <div className="grid w-full grid-cols-[1fr_auto] items-center gap-2 pt-4">
                <Input
                    placeholder={'Start typing ...'}
                    inputSize="sm"
                    className="max-w-full"
                />
                <Button type="button" size="icon">
                    <HiPaperAirplane className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}

export default Chat
