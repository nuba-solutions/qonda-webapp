import { TabsContent } from '@/components/ui/tabs'
import { TDictionary } from '@/types/core/dictionary'
import { TCandidate } from '@/types/pages/candidates/candidate'
import React from 'react'
import ProfileSidePanel from '../panel/profile-side-panel'

const TabContentProfile = ({
    candidate,
    dictionary,
}: {
    candidate: TCandidate
    dictionary: TDictionary
}) => {
    return (
        <TabsContent value="profile" className="lg:hidden">
            <ProfileSidePanel
                candidate={candidate}
                dictionary={dictionary}
                mobile
            />
        </TabsContent>
    )
}

export default TabContentProfile
