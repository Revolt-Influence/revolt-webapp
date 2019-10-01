import React from 'react'
import { ContainerBox } from '../styles/grid'
import { MainLink } from '../styles/Button'
import NotificationCard from './NotificationCard'
import ExperiencePresentation from './ExperiencePresentation'
import { GetCampaign_campaign } from '../__generated__/GetCampaign'
import { getCampaignStatus, CampaignStatus } from '../pages/CampaignDashboard'

interface ICampaignBriefPreviewProps {
  campaign: GetCampaign_campaign
}

const CampaignBriefPreview: React.FC<ICampaignBriefPreviewProps> = ({ campaign }) => {
  const status = getCampaignStatus(campaign)
  return (
    <ContainerBox>
      <NotificationCard
        nature="info"
        message="Voici le brief que les influenceurs verront. Ils rempliront un formulaire s'ils sont
        intéressés, et vous le recevrez dans l'onglet Propositions."
      />
      <MainLink to={`/brand/campaigns/${campaign._id}/brief`} inverted>
        Modifier mon brief
      </MainLink>
      {status.name !== CampaignStatus.INCOMPLETE && (
        <ExperiencePresentation experienceId={campaign._id} />
      )}
    </ContainerBox>
  )
}

export default CampaignBriefPreview
