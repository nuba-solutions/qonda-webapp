'use client'

export const deleteLocalStorageItem = async (storageName: string) => {
    if (typeof window !== undefined && storageName) {
        window.localStorage.removeItem(storageName)
    }
}

export const cleanSessionStorage = async () => {
    if (typeof window !== undefined) {
        window.localStorage.removeItem('user')
        window.localStorage.removeItem('dictionary')
    }
}
