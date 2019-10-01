import { Box } from '@rebass/grid'
import queryString from 'query-string'
import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import CampaignBriefPreview from '../components/CampaignBriefPreview'
import CampaignCollabs from '../components/CampaignCollabs'
import CampaignPropositions from '../components/CampaignPropositions'
import CampaignReviews from '../components/CampaignReviews'
import CampaignSettings from '../components/CampaignSettings'
import NotificationCard from '../components/NotificationCard'
import PageHeader from '../components/PageHeader'
import Tabs, { ITabItem } from '../components/Tabs'
import { ContainerBox } from '../styles/grid'
import { palette } from '../utils/colors'
import { usePageTitle } from '../utils/hooks'

const getCampaignStatus = (campaign: ICampaign): ICampaignStatus => {
  const { settings } = campaign
  if (
    settings == null ||
    settings.brief == null ||
    settings.gift == null ||
    settings.target == null ||
    settings.task == null
  ) {
    return {
      name: 'Incomplet',
      description: 'Complétez votre brief pour publier la campagne',
      color: palette.red._500,
    }
  }
  if (campaign.isArchived) {
    return {
      name: 'Non publié',
      description:
        "Les influenceurs ne peuvent pas voir votre campagne. C'est soit parce qu'elle est terminée, soit parce que vous n'avez pas terminé votre brief. Vous pouvez la publier à tout moment",
      color: palette.grey._400,
    }
  }
  if (campaign.isReviewed) {
    return {
      name: 'En ligne',
      description:
        "Votre campagne est visible par tous les influenceurs. Allez dans l'onglet Propositions pour voir qui est intéressé",
      color: palette.green._500,
    }
  }
  return {
    name: 'En attente de modération',
    description:
      "Une fois que nos experts en marketing d'influence auront analysé votre campagne, vous pourrez recevoir des propositions d'influenceurs.",
    color: palette.orange._500,
  }
}

interface IMatchParams {
  campaignId: string
}

interface ICampaignDashboard extends RouteComponentProps<IMatchParams> {}

const CampaignDashboard: React.FC<ICampaignDashboard> = ({ match, location }) => {
  const { campaignId } = match.params
  const campaign = useSelector<IState, ICampaign>(state =>
    state.campaigns.items.find(_campaign => _campaign._id === campaignId)
  )
  usePageTitle(campaign.name)

  React.useEffect(() => window.scrollTo(0, 0), [])

  // Get current page from URL
  const parsedQuery = queryString.parse(location.search)
  const hasQueryParams = Object.entries(parsedQuery).length > 0
  const currentTab = hasQueryParams ? (parsedQuery as any).tab : 'propositions'

  const status = getCampaignStatus(campaign)

  const tabItems: ITabItem[] = [
    {
      name: 'Nouvelles propositions',
      link: `/brand/campaigns/${campaignId}/dashboard?tab=propositions`,
      isActive: currentTab === 'propositions',
    },
    {
      name: 'Partenariats',
      link: `/brand/campaigns/${campaignId}/dashboard?tab=collabs`,
      isActive: currentTab === 'collabs',
    },
    {
      name: 'Brief',
      link: `/brand/campaigns/${campaignId}/dashboard?tab=brief`,
      isActive: currentTab === 'brief',
    },
    {
      name: 'Revues',
      link: `/brand/campaigns/${campaignId}/dashboard?tab=reviews`,
      isActive: currentTab === 'reviews',
    },
    {
      name: 'Réglages',
      link: `/brand/campaigns/${campaignId}/dashboard?tab=settings`,
      isActive: currentTab === 'settings',
    },
  ]

  const showCurrentTab = (): React.ReactElement => {
    switch (currentTab) {
      case 'propositions':
        return <CampaignPropositions campaignId={campaignId} />
      case 'collabs':
        return <CampaignCollabs campaign={campaign} />
      case 'brief':
        return <CampaignBriefPreview campaign={campaign} />
      case 'reviews':
        return <CampaignReviews campaign={campaign} />
      case 'settings':
        return <CampaignSettings campaign={campaign} status={status} />
      default:
        return <CampaignPropositions campaignId={campaignId} />
    }
  }

  return (
    <main>
      <ContainerBox>
        <PageHeader title={campaign.name} destination="/brand" />
      </ContainerBox>
      {status.name !== 'En ligne' && (
        <ContainerBox mb="2rem" mt="-1rem">
          {status.name === 'En attente de modération' && (
            <NotificationCard
              message="Votre campagne est en attente de modération. Elle n'est pas encore visible."
              nature="info"
            />
          )}
          {status.name === 'Non publié' && (
            <NotificationCard
              message="Votre campagne n'est pas en ligne. Vous pouvez la publier dans l'onglet Réglages"
              nature="info"
            />
          )}
          {status.name === 'Incomplet' && (
            <NotificationCard message={status.description} nature="info" />
          )}
        </ContainerBox>
      )}
      <Box mt={[0, 0, '-2rem']}>
        <Tabs items={tabItems} />
      </Box>
      {showCurrentTab()}
    </main>
  )
}

export { getCampaignStatus }
export default withRouter(CampaignDashboard)
