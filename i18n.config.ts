export const i18n = {
    defaultLocale: 'en',
    locales: ['en', 'en-US', 'es', 'es-MX'],
} as const

export type Locale = (typeof i18n)['locales'][number]
