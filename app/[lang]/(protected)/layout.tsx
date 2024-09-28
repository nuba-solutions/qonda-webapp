// import { getSession } from '@/actions/auth/session'
// import { redirect } from 'next/navigation'
import React from 'react'
import QondaQueryCLientProvider from '@/components/providers/query-provider'
import Navbar from '@/components/core/navigation/navbar'
import MobileNav from '@/components/core/navigation/mobile-nav'
import UserProfileMenu from '@/components/core/profiles/profile-menu'
import ThemeToggleButton from '@/components/core/buttons/theme-toggle'

const PrivateLayout = async ({ children }: { children: React.ReactNode }) => {
    // const session = await getSession()
    // if (!session || (session && session.user.is_active !== 0))
    //     redirect('/login')

    return (
        <QondaQueryCLientProvider>
            <div className="flex min-h-screen w-full flex-col">
                <header className="sticky top-0 z-50 flex h-[4.5rem] w-full items-center justify-between gap-4 border-b bg-background">
                    <Navbar />
                    <MobileNav />
                    <div className="mr-4 flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                        <UserProfileMenu />
                        <ThemeToggleButton />
                    </div>
                </header>
                <main>{children}</main>
            </div>
        </QondaQueryCLientProvider>
    )
}

export default PrivateLayout
