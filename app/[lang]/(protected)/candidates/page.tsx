import { getDictionary } from '@/actions/core/dictionary'
import PageHeader from '@/components/core/headers/page-header'
import { buttonVariants } from '@/components/ui/button'
import { Locale } from '@/i18n.config'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const CandidatesPage = async ({
    params: { lang },
}: {
    params: { lang: Locale }
}) => {
    const dictionary = await getDictionary(lang as Locale)
    return (
        <section id="dashboard-section">
            <PageHeader
                title={dictionary?.pages?.candidates?.headers?.main['title']}
                subtitle={
                    dictionary?.pages?.candidates?.headers?.main['subtitle']
                }
                className="flex-row items-center justify-between"
            >
                <Link
                    href="#"
                    className={cn(buttonVariants({ variant: 'primary' }))}
                >
                    Add candidate
                </Link>
            </PageHeader>
        </section>
    )
}

export default CandidatesPage
