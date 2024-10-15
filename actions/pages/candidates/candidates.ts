'use server'

import { TCandidate } from '@/types/pages/candidates/candidate'
import axios from 'axios'

export const getCandidatesList = async () => {
    const response = await axios
        .get<TCandidate[]>('http://localhost:3000/mock/candidates.json')
        .then(async (res) => {
            if (res.status === 200) {
                return res.data
            }
            return null
        })
        .catch((error) => {
            console.log(error)
            return null
        })

    return response
}

export const getCandidateByID = async (candidateId: number) => {
    const response = await axios
        .get<TCandidate[]>('http://localhost:3000/mock/candidates.json')
        .then(async (res) => {
            if (res.status === 200) {
                return res.data.filter(
                    (cdt: TCandidate) => cdt.id === candidateId
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

export const deleteCandidate = async (candidateId: number) => {
    const response = await axios
        .delete<TCandidate[]>('http://localhost:3000/mock/candidates.json')
        .then(async (res) => {
            if (res.status === 200) {
                return res.data.filter(
                    (cdt: TCandidate) => cdt.id !== candidateId
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

export const createCandidate = async (values: TCandidate) => {
    const response = await axios
        .post('http://localhost:3000/mock/candidates.json')
        .then(async (res) => {
            if (res.status === 200) {
                return res.data
            }
            return null
        })
        .catch((error) => {
            console.log(error)
            return null
        })

    return response
}

export const updateCandidate = async (
    values: TCandidate,
    candidateId: number
) => {
    const response = await axios
        .post('http://localhost:3000/mock/candidates.json')
        .then(async (res) => {
            if (res.status === 200) {
                return res.data
            }
            return null
        })
        .catch((error) => {
            console.log(error)
            return null
        })

    return response
}
