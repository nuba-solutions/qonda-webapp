'use server'

import { Locale } from '@/i18n.config'
import { cookies } from 'next/headers'

export const setSessionCookie = async (session: any, expires: any) => {
    if (!session || !expires) return

    if (cookies().has('qonda_session')) {
        cookies().delete('qonda_session')
    }

    cookies().set('qonda_session', session, { expires, httpOnly: true })
}

export const getSessionCookie = async () => {
    if (!cookies().has('qonda_session')) return null

    return cookies().get('qonda_session')
}

export const deleteSessionCookie = async () => {
    cookies().delete('qonda_session')
}

export const setLanguageCookie = async (language: Locale | string) => {
    if (!language) return

    if (cookies().has('qonda_locale')) {
        cookies().delete('qonda_locale')
    }

    cookies().set('qonda_locale', language)
}

export const getLanguageCookie = async () => {
    if (cookies().has('qonda_locale')) {
        return cookies().get('qonda_locale')
    }

    return 'en'
}
