import { Separator } from '@/components/ui/separator'
import { TabsContent } from '@/components/ui/tabs'
import React from 'react'

const TabContentFiles = () => {
    return (
        <TabsContent value="documents" className="mt-0 p-4">
            <div className="lg:pl-1">
                <h2 className="text-md font-semibold">Documents</h2>
                <p className="text-xs text-muted-foreground">
                    Candidate documents and files
                </p>
            </div>
            <Separator className="my-4" />
        </TabsContent>
    )
}

export default TabContentFiles
