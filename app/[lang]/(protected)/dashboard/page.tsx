import StatsCard from '@/components/core/cards/stats-card'
import PageHeader from '@/components/core/headers/page-header'
import React from 'react'
import { HiOutlineUserPlus } from 'react-icons/hi2'
import { PiFileX } from 'react-icons/pi'
import { TbActivity, TbCalendarUp } from 'react-icons/tb'

const DashboardPage = () => {
    return (
        <section id="dashboard-section">
            <PageHeader
                title="Dashboard"
                subtitle="Business Intelligence"
                className="flex-row items-center justify-between"
            ></PageHeader>
            <div className="grid gap-4 p-4 md:grid-cols-2 2xl:grid-cols-4">
                <StatsCard
                    title="Total applicants"
                    text="Including all sources"
                    value="1200"
                    icon={
                        <HiOutlineUserPlus className="h-7 w-7 text-primary" />
                    }
                />
                <StatsCard
                    title="Incomplete applicants"
                    text="-10% compared to last month"
                    value="89"
                    icon={<PiFileX className="h-7 w-7 text-primary" />}
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
            </div>
        </section>
    )
}

export default DashboardPage
