import { TConversation } from '@/types/core/conversation'
import axios from 'axios'

export const getConversationByID = async (conversationId: string) => {
    const response = await axios
        .get<TConversation[]>('http://localhost:3000/mock/conversation.json')
        .then(async (res) => {
            if (res.status === 200) {
                return res.data.filter(
                    (cdt: TConversation) =>
                        cdt.conversationId === conversationId
                )[0]
            }
            return null
        })
        .catch((error) => {
            console.log(error)
            return null
        })

    return response
}