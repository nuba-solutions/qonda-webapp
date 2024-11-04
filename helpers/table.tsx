import { Locale } from '@/i18n.config'
import { cn } from '@/lib/utils'
import { company } from '@/qonda.config'
import { TDictionary } from '@/types/core/dictionary'
import { TLocation } from '@/types/core/location'
import { TJobPosition } from '@/types/core/position'
import { format } from 'date-fns'
import { enUS, es } from 'date-fns/locale'

export const getTranslatedCandidateStatus = (
    status: number,
    language: Locale
) => {
    const applicantsStatuses =
        company.company_settings.candidates_rules.statuses.applicants
    const employeesStatuses =
        company.company_settings.candidates_rules.statuses.employees
    const formerEmployeesStatuses =
        company.company_settings.candidates_rules.statuses.former_employees

    const isApplicant = applicantsStatuses.find((sts) => sts.id === status)
    if (isApplicant) {
        return language === 'es' || language === 'es-MX'
            ? isApplicant.es
            : isApplicant.en
    }

    const isEmployee = employeesStatuses.find((sts) => sts.id === status)
    if (isEmployee) {
        return language === 'es' || language === 'es-MX'
            ? isEmployee.es
            : isEmployee.en
    }

    const isFormerEmployee = formerEmployeesStatuses.find(
        (sts) => sts.id === status
    )
    if (isFormerEmployee) {
        return language === 'es' || language === 'es-MX'
            ? isFormerEmployee.es
            : isFormerEmployee.en
    }
}

export const renderCandidateStatus = (status: number, statusName?: string) => {
    const applicantsStatuses =
        company.company_settings.candidates_rules.statuses.applicants
    const employeesStatuses =
        company.company_settings.candidates_rules.statuses.employees
    const formerEmployeesStatuses =
        company.company_settings.candidates_rules.statuses.former_employees

    const isApplicant = applicantsStatuses.find((sts) => sts.id === status)
    const isEmployee = employeesStatuses.find((sts) => sts.id === status)
    const isFormerEmployee = formerEmployeesStatuses.find(
        (sts) => sts.id === status
    )

    return (
        <div
            className={cn(
                'w-fit rounded-sm px-2 py-0.5 text-xs font-semibold',
                isApplicant
                    ? 'bg-blue-500/15 text-blue-500 dark:bg-blue-500/20'
                    : isEmployee
                      ? 'bg-green-500/15 text-green-600 dark:bg-green-500/20'
                      : isFormerEmployee
                        ? 'bg-red-500/15 text-red-500 dark:bg-red-500/20'
                        : 'bg-orange-500/15 text-orange-500 dark:bg-orange-500/20'
            )}
        >
            {statusName || 'NA'}
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

export const getLocationName = (
    location_id: number,
    locationsList: TLocation[]
) => {
    const location = locationsList.find((loc) => loc.id === location_id)
    return location?.name || ''
}

export const getJobPositionName = (
    job_position_id: number,
    jobPositionsList: TJobPosition[]
) => {
    const position = jobPositionsList.find((loc) => loc.id === job_position_id)
    return position?.name || ''
}
