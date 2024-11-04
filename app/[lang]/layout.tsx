import '../globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { ThemeProvider } from '@/components/providers/theme-providers'
import { Locale } from '@/i18n.config'
import { Toaster } from '@/components/ui/toaster'
import { company } from '@/qonda.config'

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
    title: company.company_meta_title,
    description: 'The most advanced recruitment software powered by AI',
    icons: {
        icon: [
            {
                media: '(prefers-color-scheme: light)',
                url: company.company_favicon_url,
                href: company.company_favicon_url,
            },
            {
                media: '(prefers-color-scheme: dark)',
                url: company.company_favicon_url,
                href: company.company_favicon_url,
            },
        ],
    },
}

export default async function RootLayout({
    children,
    params: { lang },
}: Readonly<{
    children: React.ReactNode
    params: { lang: Locale }
}>) {
    return (
        <html
            lang={lang}
            suppressHydrationWarning
            className={company.company_color_schema_class}
        >
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
