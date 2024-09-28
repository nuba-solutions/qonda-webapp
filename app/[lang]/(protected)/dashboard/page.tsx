import { getDictionary } from '@/actions/core/dictionary'
import StatsCard from '@/components/core/cards/stats-card'
import DonutChart from '@/components/core/charts/donut-chart'
import LargeLineChart from '@/components/core/charts/large-line-chart'
import PageHeader from '@/components/core/headers/page-header'
import {
    DonutChartData,
    LargeLineChartData,
} from '@/constants/charts/fake-data'
import { Locale } from '@/i18n.config'
import React from 'react'
import { TbActivity, TbCalendarUp, TbFileX, TbUsersPlus } from 'react-icons/tb'

const DashboardPage = async ({
    params: { lang },
}: {
    params: { lang: Locale }
}) => {
    const dictionary = await getDictionary(lang as Locale)

    return (
        <section id="dashboard-section">
            <PageHeader
                title={dictionary?.pages?.dashboard?.headers?.main['title']}
                subtitle={
                    dictionary?.pages?.dashboard?.headers?.main['subtitle']
                }
                className="flex-row items-center justify-between"
            ></PageHeader>
            <div className="grid gap-4 p-4 md:grid-cols-2 2xl:grid-cols-4">
                <StatsCard
                    title="Total applicants"
                    text="Including all sources"
                    value="1200"
                    icon={<TbUsersPlus className="h-7 w-7 text-primary" />}
                />
                <StatsCard
                    title="Incomplete applicants"
                    text="-10% compared to last month"
                    value="89"
                    icon={<TbFileX className="h-7 w-7 text-primary" />}
                />
                <StatsCard
                    title="Total interviews scheduled"
                    text="+7% compared to last month"
                    value="756"
                    icon={<TbCalendarUp className="h-7 w-7 text-primary" />}
                />
                <StatsCard
                    title="Total applicants turnover"
                    text="-2.4% compared to last month"
                    value="97%"
                    icon={<TbActivity className="h-7 w-7 text-primary" />}
                />
                <LargeLineChart
                    title="New candidates"
                    text="Showing total applicants for the last 3 months"
                    className="md:col-span-2 2xl:col-span-3"
                    chartData={LargeLineChartData}
                />
                <DonutChart
                    title="Important data"
                    text="January - June 2024"
                    className=""
                    chartData={DonutChartData}
                />
            </div>
        </section>
    )
}

export default DashboardPage
