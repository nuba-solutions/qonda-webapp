// import { getSession } from '@/actions/auth/session'
import { redirect } from 'next/navigation'

export default async function page() {
    // const session = await getSession()
    const session = false
    session ? redirect('/dashboard') : redirect('/login')
}
