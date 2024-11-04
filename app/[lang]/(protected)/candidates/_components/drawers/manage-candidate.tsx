import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
} from '@/components/ui/drawer'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import ManageCandidateForm from '../forms/manage-form'
import { useQuery } from '@tanstack/react-query'
import { TLocation } from '@/types/core/location'
import { TJobPosition } from '@/types/core/position'
import { getJobPositionsList } from '@/actions/core/job_positions'
import { getLocationsList } from '@/actions/core/locations'

const ManageCandidateDrawer = ({
    isOpen,
    setIsOpen,
}: {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    const { data: locationsList } = useQuery<TLocation[]>({
        queryKey: ['locations'],
        queryFn: () => getLocationsList(),
        refetchOnWindowFocus: false,
    })
    const { data: jobPositionsList } = useQuery<TJobPosition[]>({
        queryKey: ['job_positions'],
        queryFn: () => getJobPositionsList(),
        refetchOnWindowFocus: false,
    })

    if (!locationsList || !jobPositionsList) return null

    return (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerContent className="max-h-full">
                <DrawerHeader className="text-left">
                    <DrawerTitle>Add candidate</DrawerTitle>
                    <DrawerDescription>
                        Create new candidate manually
                    </DrawerDescription>
                </DrawerHeader>
                <Separator />
                <div className="overflow-auto p-4 lg:p-8">
                    <ManageCandidateForm
                        isEdit={false}
                        jobPositionsList={jobPositionsList}
                        locationsList={locationsList}
                    />
                </div>
            </DrawerContent>
        </Drawer>
    )
}

export default ManageCandidateDrawer
