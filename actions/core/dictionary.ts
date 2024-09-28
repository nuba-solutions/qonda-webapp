'use server'

import { Locale } from '@/i18n.config'

const dictionaries = {
    en: () => import('@/dictionaries/en.json').then((module) => module.default),
    es: () => import('@/dictionaries/es.json').then((module) => module.default),
}

export const getDictionary = async (locale: Locale) => {
    return locale === 'es' || locale === 'es-MX'
        ? dictionaries.es()
        : dictionaries.en()
}
