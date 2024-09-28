import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import NavLink from './nav-link'

const Navbar = () => {
    return (
        <nav className="hidden h-full flex-col font-medium md:flex-row md:items-center lg:flex">
            <Link
                href="#"
                className="3xl:pl-6 3xl:pr-9 flex h-full items-center justify-center bg-primary pl-4 pr-6 font-semibold md:text-base 2xl:pl-5 2xl:pr-8"
            >
                <Image
                    src={'/assets/qonda-logo-white.svg'}
                    alt="Qonda logo"
                    width={120}
                    height={80}
                />
            </Link>
            <NavLink
                name="Dashboard"
                text="Business Intelligence"
                path="/dashboard"
            />
            <NavLink
                name="HR Funnel"
                text="Human resources"
                path=""
                childrenLinks={[
                    {
                        name: 'Candidates',
                        path: '/candidates',
                        text: 'Manage Candidates',
                    },
                    {
                        name: 'Staff',
                        path: '/staff',
                        text: 'Manage Employees',
                    },
                    {
                        name: 'Former employees',
                        path: '/former-employees',
                        text: 'Manage Ex Employees',
                    },
                ]}
            />
            <NavLink name="Units" text="Manage Locations" path="/units" />
            <NavLink
                name="Analytics"
                text="Data Visualization"
                path="/analytics"
            />
            <NavLink name="Users" text="Manage Users" path="/users" />
        </nav>
    )
}

export default Navbar
