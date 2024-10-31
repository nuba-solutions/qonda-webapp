import { Locale } from '@/i18n.config'
import { cn } from '@/lib/utils'
import { TDictionary } from '@/types/core/dictionary'
import { format } from 'date-fns'
import { enUS, es } from 'date-fns/locale'

export const getTranslatedCandidateStatus = (
    status: number,
    dictionary: TDictionary
) => {
    return status === 0
        ? dictionary?.core?.statuses?.candidates['in_process']
        : status === 1
          ? dictionary?.core?.statuses?.candidates['interview']
          : dictionary?.core?.statuses?.candidates['hired']
}

export const renderCandidateStatus = (status: number, statusName: string) => {
    return (
        <div
            className={cn(
                'w-fit rounded-sm px-2 py-0.5 text-xs font-semibold',
                status === 0
                    ? 'bg-blue-500/15 text-blue-500 dark:bg-blue-500/20'
                    : status === 1
                      ? 'bg-orange-500/15 text-orange-500 dark:bg-orange-500/20'
                      : 'bg-green-500/15 text-green-600 dark:bg-green-500/20'
            )}
        >
            {statusName}
        </div>
    )
}

const getUserLocaleAndFormat = (lang: Locale) => {
    switch (lang) {
        case 'es':
        case 'es-MX':
            return {
                locale: es,
                formatStr: 'dd/MM/yyyy',
                longDateFormatStr: 'dd "de" LLLL "del" yyyy',
                timeFormatStr: 'h:mm a',
            }
        default:
            return {
                locale: enUS,
                formatStr: 'MM/dd/yyyy',
                longDateFormatStr: 'LLLL dd, yyyy',
                timeFormatStr: 'h:mm a',
            }
    }
}

export const renderLocaleDate = (
    date: Date | string | undefined,
    lang: Locale,
    includeHours?: boolean,
    longDateFormat?: boolean
) => {
    if (!date) return

    const { locale, formatStr, timeFormatStr, longDateFormatStr } =
        getUserLocaleAndFormat(lang)

    const baseStr = longDateFormat ? longDateFormatStr : formatStr
    const fullFormatStr = includeHours
        ? `${baseStr} '-' ${timeFormatStr}`
        : baseStr

    return format(new Date(date), fullFormatStr, {
        locale: locale,
    })
}

export const getTranslatedDocumentStatus = (
    status: number,
    dictionary: TDictionary
) => {
    return status === 0 ? 'Pending' : 'Validated'
}

export const renderDocumentStatus = (status: number, statusName: string) => {
    return (
        <div
            className={cn(
                'w-fit rounded-sm px-2 py-0.5 text-xs font-semibold',
                status === 0
                    ? 'bg-red-500/15 text-red-500 dark:bg-red-500/20'
                    : 'bg-green-500/15 text-green-600 dark:bg-green-500/20'
            )}
        >
            {statusName}
        </div>
    )
}
