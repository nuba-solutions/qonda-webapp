import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { i18n } from '@/i18n.config'
import { cookies } from 'next/headers'

const getLocale = (request: NextRequest): string | undefined => {
    const cookieStore = cookies()
    if (cookieStore.has('qonda_locale')) {
        const localeCookie = cookieStore.get('qonda_locale')
        return localeCookie?.value
    }
    return i18n.defaultLocale
}

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname
    const pathnameIsMissingLocale = i18n.locales.every(
        (locale) =>
            !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    )

    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
        const locale = getLocale(request)
        return NextResponse.redirect(
            new URL(
                `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
                request.url
            )
        )
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|assets|mock|favicon.ico).*)'],
}
