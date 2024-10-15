import { useEffect, useRef, useState } from 'react'
import { TConversation, TMessage } from '@/types/core/conversation'
import { cn } from '@/lib/utils'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

const Conversation = ({
    conversationData,
}: {
    conversationData: TConversation
}) => {
    const [isInitialLoad, setIsInitialLoad] = useState(true)

    const [messages, setMessages] = useState<TMessage[]>([])

    useEffect(() => {
        setMessages(conversationData.messages)
    }, [conversationData])

    const messageEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (isInitialLoad) {
            messageEndRef.current?.scrollIntoView({ behavior: 'auto' }) // Immediate scroll
            setIsInitialLoad(false)
        } else {
            messageEndRef.current?.scrollIntoView({ behavior: 'smooth' }) // Smooth scroll
        }
    }, [messages])

    const getParticipantName = (senderId: string) => {
        const participant = conversationData.participants.find(
            (p) => p.id === senderId
        )
        return participant ? participant.name : 'Unknown'
    }

    const getParticipantColor = (senderId: string) => {
        const participant = conversationData.participants.find(
            (p) => p.id === senderId
        )
        return participant ? participant.role : 'Unknown'
    }

    if (isInitialLoad) {
        messageEndRef.current?.scrollIntoView({ behavior: 'auto' })
        setIsInitialLoad(false) // Set initial load to false after first render
    } else {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div className="mt-4 grid h-[calc(100vh-16rem)] grid-cols-1 grid-rows-[1fr_auto] rounded-xl border p-4">
            <div className="overflow-y-auto">
                {messages.map((message) => (
                    <div className="relative z-20" key={message.id}>
                        <div
                            className={cn(
                                'mb-4 flex max-w-fit rounded-lg p-4',
                                getParticipantColor(message.senderId) === 'ai'
                                    ? 'ml-auto rounded-br-none bg-primary-500 pl-8 text-right text-white'
                                    : 'rounded-bl-none bg-secondary pr-8 dark:bg-secondary'
                            )}
                        >
                            <div>
                                <p className="text-base font-bold">
                                    {getParticipantName(message.senderId)}
                                </p>
                                <p className="mb-4">{message.content}</p>
                                <p className="text-xs">
                                    {new Date(
                                        message.timestamp
                                    ).toLocaleString()}
                                </p>
                            </div>
                        </div>
                        <div
                            className={cn(
                                'absolute -bottom-3 h-0 w-0 rounded-b-sm border-b-[12px] border-t-[0px] border-b-transparent border-t-transparent',
                                getParticipantColor(message.senderId) === 'ai'
                                    ? 'right-0 border-r-[26px] border-r-primary-500'
                                    : 'left-0 border-l-[26px] border-l-secondary'
                            )}
                        ></div>
                    </div>
                ))}
                <div ref={messageEndRef} />
            </div>
            <div className="relative">
                <Textarea
                    rows={5}
                    className="dark:bg-panel relative mt-10 resize-none bg-muted"
                    placeholder="Start typing..."
                />
                <Button type="button" className="absolute bottom-4 right-4">
                    Send message
                </Button>
            </div>
        </div>
    )
}

export default Conversation
