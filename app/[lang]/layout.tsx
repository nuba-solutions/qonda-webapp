import '../globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { ThemeProvider } from '@/components/providers/theme-providers'
import { Locale } from '@/i18n.config'
import { Toaster } from '@/components/ui/toaster'

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
    title: 'Qonda | Recruitment made simple',
    description: 'The most advanced recruitment software powered by AI',
}

export default async function RootLayout({
    children,
    params: { lang },
}: Readonly<{
    children: React.ReactNode
    params: { lang: Locale }
}>) {
    return (
        <html lang={lang} suppressHydrationWarning>
            <head />
            <body className={poppins.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
                <Toaster />
            </body>
        </html>
    )
}
