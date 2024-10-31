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

const ManageCandidateDrawer = ({
    isOpen,
    setIsOpen,
}: {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
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
                    <ManageCandidateForm isEdit={false} />
                </div>
            </DrawerContent>
        </Drawer>
    )
}

export default ManageCandidateDrawer
