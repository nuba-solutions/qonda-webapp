import { getDictionary } from '@/actions/core/dictionary'
import PageHeader from '@/components/core/headers/page-header'
import { Locale } from '@/i18n.config'

const AnalyticsPage = async ({
    params: { lang },
}: {
    params: { lang: Locale }
}) => {
    const dictionary = await getDictionary(lang as Locale)
    return (
        <section id="analytics-section">
            <PageHeader
                title={dictionary?.pages?.analytics?.headers?.main['title']}
                subtitle={
                    dictionary?.pages?.analytics?.headers?.main['subtitle']
                }
                className="flex-row items-center justify-between"
            ></PageHeader>
        </section>
    )
}

export default AnalyticsPage
