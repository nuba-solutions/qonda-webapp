'use client'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { RiMenu2Fill } from 'react-icons/ri'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import MobileNavLink from './mobile-nav-link'
import { useDictionaryStore } from '@/stores/core/dictionary-store'
import { company } from '@/qonda.config'
import { Separator } from '@/components/ui/separator'

const MobileNav = () => {
    const { dictionary, language } = useDictionaryStore()
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
                    src={company.company_logo_url}
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
                        href={`/${language}/dashboard`}
                        // className="flex h-12 w-12 items-center justify-center rounded-lg border bg-accent"
                    >
                        <Image
                            src={company.company_logo_url}
                            width={100}
                            height={100}
                            alt="Qonda logo"
                        />
                    </Link>
                    <Separator />
                    <MobileNavLink
                        name={
                            dictionary?.core?.navigation?.links?.dashboard[
                                'name'
                            ]
                        }
                        text={
                            dictionary?.core?.navigation?.links?.dashboard[
                                'text'
                            ]
                        }
                        path={`/${language}/dashboard`}
                        setIsMenuOpen={setIsMenuOpen}
                    />
                    <MobileNavLink
                        name={
                            dictionary?.core?.navigation?.links?.candidates[
                                'name'
                            ]
                        }
                        // text={
                        //     dictionary?.core?.navigation?.links?.candidates[
                        //         'text'
                        //     ]
                        // }
                        text="New applicants"
                        path={`/${language}/candidates/applicants`}
                        setIsMenuOpen={setIsMenuOpen}
                    />
                    <MobileNavLink
                        // name={
                        //     dictionary?.core?.navigation?.links?.staff['name']
                        // }
                        // text={
                        //     dictionary?.core?.navigation?.links?.staff['text']
                        // }
                        name="Employees"
                        text="Hired personnel"
                        path={`/${language}/candidates/employees`}
                        setIsMenuOpen={setIsMenuOpen}
                    />
                    <MobileNavLink
                        name={
                            dictionary?.core?.navigation?.links
                                ?.former_employees['name']
                        }
                        // text={
                        //     dictionary?.core?.navigation?.links
                        //         ?.former_employees['text']
                        // }
                        text="No longer working"
                        path={`/${language}/candidates/former-employees`}
                        setIsMenuOpen={setIsMenuOpen}
                    />
                    <MobileNavLink
                        // name={
                        //     dictionary?.core?.navigation?.links?.units['name']
                        // }
                        // text={
                        //     dictionary?.core?.navigation?.links?.units['text']
                        // }
                        name="Locations"
                        text="Manage units"
                        path={`/${language}/locations`}
                        setIsMenuOpen={setIsMenuOpen}
                    />
                    {/* <MobileNavLink
                        name={
                            dictionary?.core?.navigation?.links?.analytics[
                                'name'
                            ]
                        }
                        text={
                            dictionary?.core?.navigation?.links?.analytics[
                                'text'
                            ]
                        }
                        path="/analytics"
                        setIsMenuOpen={setIsMenuOpen}
                    /> */}
                    <MobileNavLink
                        name={
                            dictionary?.core?.navigation?.links?.users['name']
                        }
                        text={
                            dictionary?.core?.navigation?.links?.users['text']
                        }
                        path={`/${language}/users`}
                        setIsMenuOpen={setIsMenuOpen}
                    />
                </nav>
            </SheetContent>
        </Sheet>
    )
}

export default MobileNav
