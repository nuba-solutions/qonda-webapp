import PageHeader from '@/components/core/headers/page-header'

const MyAccountPage = () => {
    return (
        <section id="my-account-section">
            <PageHeader
                title="My Account"
                subtitle="User Preferences"
                className="flex-row items-center justify-between"
            ></PageHeader>
        </section>
    )
}

export default MyAccountPage
