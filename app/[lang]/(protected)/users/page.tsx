import { getDictionary } from '@/actions/core/dictionary'
import PageHeader from '@/components/core/headers/page-header'
import { Locale } from '@/i18n.config'

const UsersPage = async ({
    params: { lang },
}: {
    params: { lang: Locale }
}) => {
    const dictionary = await getDictionary(lang as Locale)
    return (
        <section id="users-section">
            <PageHeader
                title={dictionary?.pages?.users?.headers?.main['title']}
                subtitle={dictionary?.pages?.users?.headers?.main['subtitle']}
                className="flex-row items-center justify-between"
            ></PageHeader>
        </section>
    )
}

export default UsersPage
