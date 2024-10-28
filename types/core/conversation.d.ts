export type TConversation = TMessage[]

export type TMessage = {
    message_id: number
    timestamp: string
    message: string
    role: 'external_user' | 'assistant' | 'internal_user'
    internal_user_name?: string
}
