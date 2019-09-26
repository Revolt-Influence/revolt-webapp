import React from 'react'
import { ICampaign } from '../models/Campaign'
import { ContainerBox } from '../styles/grid'
import { MainLink } from '../styles/Button'
import NotificationCard from './NotificationCard'
import ExperiencePresentation from './ExperiencePresentation'

interface ICampaignBriefPreviewProps {
  campaign: ICampaign
}

const CampaignBriefPreview: React.FC<ICampaignBriefPreviewProps> = ({ campaign }) => {
  const briefIsReady =
    campaign.settings != null &&
    campaign.settings.brief != null &&
    campaign.settings.gift != null &&
    campaign.settings.target != null &&
    campaign.settings.task != null
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
      {briefIsReady && <ExperiencePresentation experience={campaign} />}
    </ContainerBox>
  )
}

export default CampaignBriefPreview
