import { getDictionary } from '@/actions/core/dictionary'
import PageHeader from '@/components/core/headers/page-header'
import { Locale } from '@/i18n.config'

const UnitsPage = async ({
    params: { lang },
}: {
    params: { lang: Locale }
}) => {
    const dictionary = await getDictionary(lang as Locale)
    return (
        <section id="locations-section">
            <PageHeader
                // title={dictionary?.pages?.units?.headers?.main['title']}
                // subtitle={dictionary?.pages?.units?.headers?.main['subtitle']}
                title="Locations"
                subtitle="Manage units"
                className="flex-row items-center justify-between"
            ></PageHeader>
        </section>
    )
}

export default UnitsPage
