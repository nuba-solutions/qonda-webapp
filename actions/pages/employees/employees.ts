'use server'

import { convertFilesToBase64 } from '@/lib/files'
import { company } from '@/qonda.config'
import { TDocument } from '@/types/core/document'
import { TCandidate } from '@/types/pages/candidates/candidate'
import axios from 'axios'

export const getEmployeesList = async () => {
    const response = await axios
        .get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/mock/candidates.json`)
        .then(async (res) => {
            if (res.status === 200) {
                return res.data.data.filter((cdt: TCandidate) =>
                    company.company_settings.candidates_rules.statuses.employees.includes(
                        cdt.status_id
                    )
                )
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
                const foundCandidate = res.data.data.filter(
                    (cdt: TCandidate) => cdt.id === candidateId
                )[0]
                return {
                    ...foundCandidate,
                    documents: await getDocumentsListByCandidateID(candidateId),
                }
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

export const getDocumentsListByCandidateID = async (candidateId: number) => {
    const response = await axios
        .get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/mock/documents.json`)
        .then(async (res) => {
            if (res.status === 200) {
                return res.data.data.filter(
                    (document: TDocument) =>
                        document.candidate_id === candidateId
                )
            }
            return null
        })
        .catch((error) => {
            console.log(error)
            return null
        })

    return response
}

export const deleteCandidateDocument = async (documentToDelete: {
    documentId: number
    candidateId: number
}) => {
    // const response = await axios
    //     .delete(`${process.env.NEXT_PUBLIC_BASE_API_URL}/mock/candidates.json`)
    //     .then(async (res) => {
    //         if (res.status === 200) {
    //             return res.data.data.filter(
    //                 (cdt: TCandidate) => cdt.id !== documentId
    //             )[0]
    //         }
    //         return null
    //     })
    //     .catch((error) => {
    //         console.log(error)
    //         return null
    //     })

    return { status: 200 }
}

export const createCandidateDocument = async (formData: FormData) => {
    const values = JSON.parse(formData.get('values') as string)
    const documentFile = formData.getAll('file[]') as unknown as File[]

    if (!documentFile || !values) {
        return { status: 400, error: 'Missing information' }
    }

    const convertedFile = await convertFilesToBase64(documentFile)
    if (!convertedFile) {
        return { status: 400, error: 'Could not convert files' }
    }

    const completeDocument = {
        ...values,
        file: convertedFile,
    }

    console.log(completeDocument)

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

    return { status: 200 }
}

export const updateCandidateDocument = async (
    formData: FormData,
    id: number
) => {
    const values = JSON.parse(formData.get('values') as string)
    const documentFile = formData.getAll('file[]') as unknown as File[]

    if (!documentFile || !values) {
        return { status: 400, error: 'Missing information' }
    }

    const convertedFile = await convertFilesToBase64(documentFile)
    if (!convertedFile) {
        return { status: 400, error: 'Could not convert files' }
    }

    const completeDocument = {
        ...values,
        file: convertedFile,
    }

    console.log(completeDocument)

    // const response = await axios
    //     .put(`${process.env.NEXT_PUBLIC_BASE_API_URL}/mock/candidates.json`)
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

    return { status: 200 }
}

export const validateCandidateDocument = async (documentToValidate: {
    documentId: number
    candidateId: number
}) => {
    console.log(documentToValidate)

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

    return { status: 200 }
}
