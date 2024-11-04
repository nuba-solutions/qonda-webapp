import { TabsContent } from '@/components/ui/tabs'
import { TCandidate } from '@/types/pages/candidates/candidate'
import React from 'react'
import ProfileSidePanel from '../panel/profile-side-panel'

const TabContentProfile = ({ candidate }: { candidate: TCandidate }) => {
    return (
        <TabsContent value="profile" className="lg:hidden">
            <ProfileSidePanel candidate={candidate} mobile />
        </TabsContent>
    )
}

export default TabContentProfile
