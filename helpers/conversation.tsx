import { TConversation } from '@/types/core/conversation'
import { format } from 'date-fns'

export const groupMessagesByDate = (messages: TConversation[]) => {
    return messages.reduce((acc: any, message: TConversation) => {
        const date = format(new Date(message.timestamp), 'yyyy-MM-dd')
        if (!acc[date]) acc[date] = []
        acc[date].push(message)
        return acc
    }, {})
}

export const checkIfMessageIsFromToday = (messageDate: string) => {
    const today = new Date()
    const messageDateObj = new Date(messageDate)

    return (
        messageDateObj.getDate() === today.getDate() &&
        messageDateObj.getMonth() === today.getMonth() &&
        messageDateObj.getFullYear() === today.getFullYear()
    )
}
