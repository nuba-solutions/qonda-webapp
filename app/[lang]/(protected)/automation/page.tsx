import { getDictionary } from '@/actions/core/dictionary'
import PageHeader from '@/components/core/headers/page-header'
import { Locale } from '@/i18n.config'

const AutomationPage = async ({
    params: { lang },
}: {
    params: { lang: Locale }
}) => {
    const dictionary = await getDictionary(lang as Locale)
    return (
        <section id="automation-section">
            <PageHeader
                title="Automation"
                subtitle="Manage Tasks"
                className="flex-row items-center justify-between"
            ></PageHeader>
        </section>
    )
}

export default AutomationPage
