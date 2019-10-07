import React from 'react'
import { ContainerBox } from '../styles/grid'
import { MainLink } from '../styles/Button'
import CreatorCampaignPresentation from './CreatorCampaignPresentation'
import { GetCampaign_campaign } from '../__generated__/GetCampaign'
import { getCampaignStatus, CampaignStatus } from '../pages/CampaignDashboard'
import InfoCard from './InfoCard'

interface ICampaignBriefPreviewProps {
  campaign: GetCampaign_campaign
}

const CampaignBriefPreview: React.FC<ICampaignBriefPreviewProps> = ({ campaign }) => {
  const status = getCampaignStatus(campaign)
  return (
    <ContainerBox>
      <InfoCard message="This is the brief influencers will see. They will send you a collab request if they are interested." />
      <MainLink to={`/brand/campaigns/${campaign._id}/brief`} inverted>
        Edit my brief
      </MainLink>
      {status.name !== CampaignStatus.INCOMPLETE && (
        <CreatorCampaignPresentation campaignId={campaign._id} />
      )}
    </ContainerBox>
  )
}

export default CampaignBriefPreview
