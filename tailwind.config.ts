import type { Config } from 'tailwindcss'

const config: Config = {
    darkMode: ['class'],
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/**/*.{ts,tsx}',
        './helpers/**/*.{ts,tsx}',
    ],
    theme: {
        extend: {
            screens: {
                '3xl': '1920px',
            },
            colors: {
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                primary: {
                    DEFAULT: 'hsl(var(--primary-500))',
                    foreground: 'hsl(var(--primary-foreground))',
                    '50': 'hsl(var(--primary-50))',
                    '100': 'hsl(var(--primary-100))',
                    '200': 'hsl(var(--primary-200))',
                    '300': 'hsl(var(--primary-300))',
                    '400': 'hsl(var(--primary-400))',
                    '500': 'hsl(var(--primary-500))',
                    '600': 'hsl(var(--primary-600))',
                    '700': 'hsl(var(--primary-700))',
                    '800': 'hsl(var(--primary-800))',
                    '900': 'hsl(var(--primary-900))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                border: 'hsl(var(--border))',
                panel: 'hsl(var(--panel))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                chart: {
                    '1': 'hsl(var(--chart-1))',
                    '2': 'hsl(var(--chart-2))',
                    '3': 'hsl(var(--chart-3))',
                    '4': 'hsl(var(--chart-4))',
                    '5': 'hsl(var(--chart-5))',
                },
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            backgroundImage: {
                'qonda-pattern': "url('/assets/patterns/chat-pattern-1.svg')",
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
}
export default config
