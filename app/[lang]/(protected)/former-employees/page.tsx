import { getDictionary } from '@/actions/core/dictionary'
import PageHeader from '@/components/core/headers/page-header'
import { Locale } from '@/i18n.config'

const FormerEmployeesPage = async ({
    params: { lang },
}: {
    params: { lang: Locale }
}) => {
    const dictionary = await getDictionary(lang as Locale)
    return (
        <section id="former-employees-section">
            <PageHeader
                title={
                    dictionary?.pages?.former_employees?.headers?.main['title']
                }
                subtitle={
                    dictionary?.pages?.former_employees?.headers?.main[
                        'subtitle'
                    ]
                }
                className="flex-row items-center justify-between"
            ></PageHeader>
        </section>
    )
}

export default FormerEmployeesPage
