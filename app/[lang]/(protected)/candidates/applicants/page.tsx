import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query'
import { getCandidatesListByStatus } from '@/actions/pages/candidates/candidates'
import { getLocationsList } from '@/actions/core/locations'
import { getJobPositionsList } from '@/actions/core/job_positions'
import CandidatesTableSection from '../_components/sections/table-section'
import { company } from '@/qonda.config'

const NewApplicantsPage = async () => {
    const applicantsStatuses =
        company.company_settings.candidates_rules.statuses.applicants.map(
            (sts) => sts.id
        )

    const queryClient = new QueryClient()

    await Promise.all([
        queryClient.prefetchQuery({
            queryKey: ['candidates', 'new-applicants'],
            queryFn: () => getCandidatesListByStatus(applicantsStatuses),
        }),
        queryClient.prefetchQuery({
            queryKey: ['locations'],
            queryFn: getLocationsList,
        }),
        queryClient.prefetchQuery({
            queryKey: ['job_positions'],
            queryFn: getJobPositionsList,
        }),
    ])

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <CandidatesTableSection
                origin="new-applicants"
                statuses={applicantsStatuses}
            />
        </HydrationBoundary>
    )
}

export default NewApplicantsPage
