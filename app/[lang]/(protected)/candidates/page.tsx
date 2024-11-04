import { Locale } from '@/i18n.config'
import { redirect } from 'next/navigation'

const CandidatesPage = async ({
    params: { lang },
}: {
    params: { lang: Locale }
}) => {
    redirect(`/${lang}/candidates/new-applicants`)
}

export default CandidatesPage
