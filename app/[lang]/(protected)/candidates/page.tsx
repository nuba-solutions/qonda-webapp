import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query'
import CandidatesTableSection from './_components/sections/table-section'
import { getCandidatesList } from '@/actions/pages/candidates/candidates'

const CandidatesPage = async () => {
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: ['candidates'],
        queryFn: getCandidatesList,
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <CandidatesTableSection />
        </HydrationBoundary>
    )
}

export default CandidatesPage
