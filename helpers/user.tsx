export const getUserInitials = (firstName: string, lastName: string) => {
    if (!firstName || !lastName) return

    const firstInitial = firstName.slice(0, 1)
    const lastInitial = lastName.slice(0, 1)

    return firstInitial + lastInitial
}
