import { TConversation } from '@/types/core/conversation'
import axios from 'axios'

export const getConversationByID = async (conversationId: string) => {
    const response = await axios
        .get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/mock/conversation.json`)
        .then(async (res) => {
            if (res.status === 200) {
                return res.data.data.filter(
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
