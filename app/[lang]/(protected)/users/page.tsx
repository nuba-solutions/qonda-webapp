import PageHeader from '@/components/core/headers/page-header'

const UsersPage = () => {
    return (
        <section id="users-section">
            <PageHeader
                title="Users"
                subtitle="Manage Users"
                className="flex-row items-center justify-between"
            ></PageHeader>
        </section>
    )
}

export default UsersPage
