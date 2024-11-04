import { Locale } from '@/i18n.config'
import Image from 'next/image'
import { getDictionary } from '@/actions/core/dictionary'
import { LoginForm } from './_components/forms/login-form'
import { Separator } from '@/components/ui/separator'
import { company } from '@/qonda.config'

const LoginPage = async ({
    params: { lang },
}: {
    params: { lang: Locale }
}) => {
    // const session = await getSession()
    // if (session && session.user.is_active === 0) redirect('/dashboard')

    const dictionary = await getDictionary(lang)

    return (
        <div className="h-[calc(100vh-50px)] w-full lg:grid lg:min-h-[600px] lg:grid-cols-[1fr_450px] xl:min-h-screen xl:grid-cols-[1fr_550px] 2xl:grid-cols-[1fr_680px] 3xl:grid-cols-[1fr_900px]">
            <div className="relative hidden lg:block">
                <div className="absolute left-10 top-10">
                    <Image
                        src={company.company_logo_white_url}
                        alt="logo"
                        width={220}
                        height={110}
                    />
                </div>
                <Image
                    src={company.company_login_bg}
                    alt="Image"
                    width={1200}
                    height={800}
                    priority
                    className="h-full max-h-screen w-full max-w-full object-cover object-right"
                />
            </div>
            <div className="flex h-[calc(100vh-30px)] items-center justify-center py-12">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <Image
                            src={company.company_logo_url}
                            alt="logo"
                            width={180}
                            height={90}
                            className="mx-auto lg:hidden"
                        />
                        <h1 className="hidden text-3xl font-semibold lg:block">
                            {dictionary.pages.login['title']}
                        </h1>
                        <p className="text-muted-foreground">
                            {dictionary.pages.login['subtitle']}
                        </p>
                        <Separator className="my-4 lg:hidden" />
                    </div>
                    <LoginForm dictionary={dictionary} lang={lang} />
                </div>
            </div>
        </div>
    )
}

export default LoginPage
