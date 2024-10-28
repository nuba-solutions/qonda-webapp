'use server'

import { TMessage } from '@/types/core/conversation'
import { TCandidate } from '@/types/pages/candidates/candidate'
import axios from 'axios'

export const updateConversation = async (
    entityId: number,
    newMessage: TMessage
) => {
    const response = await axios
        .get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/mock/candidates.json`)
        .then(async (res) => {
            if (res.status === 200) {
                const conversation = res.data.data.find(
                    (candidate: TCandidate) => candidate.id === entityId
                ).conversation
                conversation.push(newMessage)
                return conversation
            }
            return null
        })
        .catch((error) => {
            console.log(error)
            return null
        })

    return response
}
