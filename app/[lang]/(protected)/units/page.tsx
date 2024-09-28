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
        <section id="units-section">
            <PageHeader
                title={dictionary?.pages?.units?.headers?.main['title']}
                subtitle={dictionary?.pages?.units?.headers?.main['subtitle']}
                className="flex-row items-center justify-between"
            ></PageHeader>
        </section>
    )
}

export default UnitsPage
