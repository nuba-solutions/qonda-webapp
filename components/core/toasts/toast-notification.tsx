import { HiXCircle } from 'react-icons/hi2'
import { TbAlertTriangleFilled, TbSquareCheckFilled } from 'react-icons/tb'

type TToastNotificationProps = {
    title: string
    message: string
    icon?: React.ReactNode
    type?: 'success' | 'error' | 'warning' | undefined
}

const ToastNotification = ({
    title,
    message,
    icon,
    type,
}: TToastNotificationProps) => {
    return (
        <div className="flex w-full items-center gap-3 px-0 py-0">
            {icon ? (
                <span className="min-w-[30px] text-xl">{icon}</span>
            ) : type === 'error' ? (
                <HiXCircle className="min-w-[30px] text-xl text-red-500" />
            ) : type === 'warning' ? (
                <TbAlertTriangleFilled className="min-w-[30px] text-xl text-yellow-500" />
            ) : (
                <TbSquareCheckFilled className="min-w-[30px] text-xl text-green-500" />
            )}
            <div className="ww-full flex flex-col">
                <p className="text-md font-semibold first-letter:capitalize">
                    {title}
                </p>
                <p className="text-wrap text-xs text-muted-foreground">
                    {message}
                </p>
            </div>
        </div>
    )
}

export default ToastNotification
