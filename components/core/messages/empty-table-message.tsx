import Image from 'next/image'

type TEmptyTableMessageProps = {
    title: string
    subtitle: string
}

const EmptyTableMessage = ({ title, subtitle }: TEmptyTableMessageProps) => {
    return (
        <div className="flex min-h-[calc(100vh-15rem)] w-full flex-col items-center justify-center gap-4 px-10 lg:min-h-[calc(100vh-12rem)]">
            <div className="flex flex-col gap-2 md:flex-row md:items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border dark:bg-secondary">
                    <span className="text-xl text-primary">
                        <Image
                            src={'/assets/qonda-symbol.svg'}
                            width={30}
                            height={20}
                            alt="Qonda logo"
                        />
                    </span>
                </div>
                <div>
                    <p className="font-semibold">{title}</p>
                    <p className="text-xs text-muted-foreground">{subtitle}</p>
                </div>
            </div>
        </div>
    )
}

export default EmptyTableMessage
