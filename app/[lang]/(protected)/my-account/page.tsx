'use client'

import { setLanguageCookie } from '@/actions/core/cookies'
import { getDictionary } from '@/actions/core/dictionary'
import PageHeader from '@/components/core/headers/page-header'
import { buttonVariants } from '@/components/ui/button'
import { Locale } from '@/i18n.config'
import { deleteLocalStorageItem } from '@/lib/local-storage'
import { cn } from '@/lib/utils'
import { useDictionaryStore } from '@/stores/core/dictionary-store'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const MyAccountPage = () => {
    const { updateDictionary, updateLanguage } = useDictionaryStore()
    const pathName = usePathname()

    const redirectedPathName = (locale: any) => {
        if (!pathName) return '/'
        const segments = pathName.split('/')
        segments[1] = locale
        return segments.join('/')
    }

    const handleSetLanguageCookie = async (locale: Locale) => {
        await deleteLocalStorageItem('dictionary')
        await deleteLocalStorageItem('language')

        const newDictionary = await getDictionary(locale)
        updateDictionary(newDictionary)
        updateLanguage(locale)

        await setLanguageCookie(locale)
    }

    return (
        <section id="my-account-section">
            <PageHeader
                title="My Account"
                subtitle="User Preferences"
                className="flex-row items-center justify-between"
            ></PageHeader>
            <div className="flex gap-4 p-4">
                <Link
                    href={redirectedPathName('en')}
                    onClick={() => {
                        handleSetLanguageCookie('en')
                    }}
                    className={cn(buttonVariants({ variant: 'outline' }))}
                >
                    English
                </Link>
                <Link
                    href={redirectedPathName('es')}
                    onClick={() => {
                        handleSetLanguageCookie('es')
                    }}
                    className={cn(buttonVariants({ variant: 'outline' }))}
                >
                    Spanish
                </Link>
            </div>
        </section>
    )
}

export default MyAccountPage
