import { company } from '@/qonda.config'
import Image from 'next/image'

const NoDataMessage = () => {
    return (
        <div className="flex min-h-[calc(100vh-15rem)] w-full flex-col items-center justify-center gap-4 px-10 lg:min-h-[calc(100vh-12rem)]">
            <div className="flex flex-col gap-2 md:flex-row md:items-center">
                <div className="flex h-12 w-12 items-center justify-center overflow-clip rounded-lg border dark:bg-secondary">
                    <span className="text-xl text-primary">
                        <Image
                            src={company.company_favicon_url}
                            width={48}
                            height={48}
                            alt="Company logo"
                        />
                    </span>
                </div>
                <div>
                    <p className="font-semibold">Could not get data!</p>
                    <p className="text-xs text-muted-foreground">
                        There may be a problem getting the requested data at the
                        moment. Please refresh the page or logout and back in.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default NoDataMessage
