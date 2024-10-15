export type TMessage = {
    id: string
    senderId: string
    content: string
    timestamp: string
}

export type TParticipant = {
    id: string
    name: string
    role: string
}

export type TConversation = {
    conversationId: string
    title: string
    participants: TParticipant[]
    messages: TMessage[]
    status: string
    createdAt: string
    updatedAt: string
}
