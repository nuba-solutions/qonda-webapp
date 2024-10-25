import { Locale } from '@/i18n.config'
import { TDictionary } from '@/types/core/dictionary'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type State = {
    dictionary: TDictionary
    language?: Locale | string
}

type Actions = {
    updateDictionary: (dictionary: any) => void
    updateLanguage: (language: Locale) => void
}

export const useDictionaryStore = create(
    persist<State & Actions>(
        (set) => ({
            dictionary: {},
            language: '',
            updateDictionary: (dictionary) =>
                set(() => ({ dictionary: dictionary })),
            updateLanguage: (language) => set(() => ({ language: language })),
        }),
        {
            name: 'dictionary',
            storage: createJSONStorage(() => localStorage),
        }
    )
)
