import { TMessage } from '@/types/core/conversation'
import { format } from 'date-fns'

export const groupMessagesByDate = (messages: TMessage[]) => {
    return messages.reduce((acc: any, message: TMessage) => {
        const date = format(new Date(message.timestamp), 'yyyy-MM-dd')
        if (!acc[date]) acc[date] = []
        acc[date].push(message)
        return acc
    }, {})
}

export const checkIfMessageIsFromToday = (messageDate: string) => {
    const today = new Date().toISOString().split('T')[0]
    const msgDate = new Date(messageDate).toISOString().split('T')[0]

    return today === msgDate
}
