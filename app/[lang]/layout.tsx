import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { ThemeProvider } from '@/components/providers/theme-providers'
import { Locale } from '@/i18n.config'

const inter = Inter({ subsets: ['latin'] })

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
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    )
}
