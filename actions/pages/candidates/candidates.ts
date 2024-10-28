'use server'

import { TCandidate } from '@/types/pages/candidates/candidate'
import axios from 'axios'

export const getCandidatesList = async () => {
    const response = await axios
        .get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/mock/candidates.json`)
        .then(async (res) => {
            if (res.status === 200) {
                return res.data.data
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
        .get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/mock/candidates.json`)
        .then(async (res) => {
            if (res.status === 200) {
                return res.data.data.filter(
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
        .delete(`${process.env.NEXT_PUBLIC_BASE_API_URL}/mock/candidates.json`)
        .then(async (res) => {
            if (res.status === 200) {
                return res.data.data.filter(
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
        .post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/mock/candidates.json`)
        .then(async (res) => {
            if (res.status === 200) {
                return res.data.data
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
    // const response = await axios
    //     .post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/mock/candidates.json`)
    //     .then(async (res) => {
    //         if (res.status === 200) {
    //             return res.data.data
    //         }
    //         return null
    //     })
    //     .catch((error) => {
    //         console.log(error)
    //         return null
    //     })

    // return response
    return { status: 200, data: values }
}
