import React from 'react'
import { ContainerBox } from '../styles/grid'
import { MainLink } from '../styles/Button'
import CreatorCampaignPresentation from './CreatorCampaignPresentation'
import { GetCampaign_campaign } from '../__generated__/GetCampaign'
import { getCampaignStatus, CampaignStatus } from '../pages/CampaignDashboard'
import InfoCard from './InfoCard'
import { Box } from '@rebass/grid'

interface ICampaignBriefPreviewProps {
  campaign: GetCampaign_campaign
}

const CampaignBriefPreview: React.FC<ICampaignBriefPreviewProps> = ({ campaign }) => {
  const status = getCampaignStatus(campaign)
  return (
    <ContainerBox>
      <InfoCard
        message="This is the page that the influencers will see. They will send you a request if they are interested.
"
      />
      <Box mb="1rem">
        <MainLink to={`/brand/campaigns/${campaign._id}/brief`} inverted>
          Edit my brief
        </MainLink>
      </Box>
      {status.name !== CampaignStatus.INCOMPLETE && (
        <CreatorCampaignPresentation campaignId={campaign._id} />
      )}
    </ContainerBox>
  )
}

export default CampaignBriefPreview
