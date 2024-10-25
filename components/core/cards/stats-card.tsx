import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import React from 'react'

const StatsCard = ({
    title,
    text,
    value,
    icon,
}: {
    title: string
    text?: string
    value: string | number
    icon: React.ReactNode
}) => {
    return (
        <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
                <CardTitle className="text-md font-semibold uppercase">
                    {title}
                </CardTitle>
                {icon}
            </CardHeader>
            <CardContent className="py-2">
                <div className="text-3xl font-semibold lg:text-4xl">
                    {value}
                </div>
            </CardContent>
            <CardFooter>
                <p className="text-sm text-muted-foreground">{text}</p>
            </CardFooter>
        </Card>
    )
}

export default StatsCard
