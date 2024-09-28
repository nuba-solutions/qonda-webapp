import PageHeader from '@/components/core/headers/page-header'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const CandidatesPage = () => {
    return (
        <section id="dashboard-section">
            <PageHeader
                title="Candidates"
                subtitle="Manage Candidates"
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
