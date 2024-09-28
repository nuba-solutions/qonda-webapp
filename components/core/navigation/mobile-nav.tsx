'use client'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { RiMenu2Fill } from 'react-icons/ri'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import MobileNavLink from './mobile-nav-link'

const MobileNav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    return (
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <div className="flex items-center gap-4">
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="ml-4 shrink-0 lg:hidden"
                    >
                        <RiMenu2Fill className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <Image
                    src={'/assets/qonda-logo.svg'}
                    width={100}
                    height={60}
                    alt="Qonda logo"
                    className="mt-1 lg:hidden"
                />
            </div>
            <SheetContent side="left">
                <nav className="grid gap-y-6">
                    <Link
                        onClick={() => setIsMenuOpen(false)}
                        href="/dashboard"
                        className="flex h-12 w-12 items-center justify-center rounded-lg border bg-accent"
                    >
                        <Image
                            src={'/assets/qonda-symbol.svg'}
                            width={35}
                            height={35}
                            alt="Qonda logo"
                        />
                    </Link>
                    <MobileNavLink
                        name="Dashboard"
                        text="Business Intelligence"
                        path="/dashboard"
                        setIsMenuOpen={setIsMenuOpen}
                    />
                    <MobileNavLink
                        name="Candidates"
                        text="Manage Candidates"
                        path="/candidates"
                        setIsMenuOpen={setIsMenuOpen}
                    />
                    <MobileNavLink
                        name="Staff"
                        text="Manage Employees"
                        path="/staff"
                        setIsMenuOpen={setIsMenuOpen}
                    />
                    <MobileNavLink
                        name="Former Employees"
                        text="Manage Ex Employees"
                        path="/former-employees"
                        setIsMenuOpen={setIsMenuOpen}
                    />
                    <MobileNavLink
                        name="Units"
                        text="Manage Locations"
                        path="/units"
                        setIsMenuOpen={setIsMenuOpen}
                    />
                    <MobileNavLink
                        name="Analytics"
                        text="Data Visualization"
                        path="/analytics"
                        setIsMenuOpen={setIsMenuOpen}
                    />
                    <MobileNavLink
                        name="Users"
                        text="Manage Users"
                        path="/users"
                        setIsMenuOpen={setIsMenuOpen}
                    />
                </nav>
            </SheetContent>
        </Sheet>
    )
}

export default MobileNav
