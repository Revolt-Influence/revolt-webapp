import { Box } from '@rebass/grid'
import queryString from 'query-string'
import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import CampaignBriefPreview from '../components/CampaignBriefPreview'
import CampaignCollabs from '../components/CampaignCollabs'
import CampaignCollabRequests from '../components/CampaignCollabRequests'
import CampaignReviews from '../components/CampaignReviews'
import CampaignSettings from '../components/CampaignSettings'
import NotificationCard from '../components/NotificationCard'
import PageHeader from '../components/PageHeader'
import Tabs, { ITabItem } from '../components/Tabs'
import { ContainerBox } from '../styles/grid'
import { palette } from '../utils/colors'
import { usePageTitle } from '../utils/hooks'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import {
  GetCampaign,
  GetCampaignVariables,
  GetCampaign_campaign,
} from '../__generated__/GetCampaign'
import Loader from '../components/Loader'
import ErrorCard from '../components/ErrorCard'
import { BRAND_FRAGMENT } from '../components/CampaignFormBrand'

export enum CampaignStatus {
  ARCHIVED = 'Not published',
  ONLINE = 'Online',
  AWAITING_REVIEW = 'Awaiting review',
  INCOMPLETE = 'Incomplete',
}

interface CampaignStatusInfo {
  name: CampaignStatus
  description: string
  color: string
}

const getCampaignStatus = (campaign: GetCampaign_campaign): CampaignStatusInfo => {
  if (
    !campaign ||
    !campaign.name ||
    !campaign.description ||
    !campaign.estimatedBudget ||
    !campaign.product ||
    !campaign.product.name ||
    !campaign.product.description ||
    !campaign.product.pictures ||
    !campaign.product.website ||
    !campaign.product.youtubeLink ||
    !campaign.targetAudience == null ||
    !campaign.targetAudience.ageGroups == null ||
    !campaign.targetAudience.countries == null ||
    !campaign.targetAudience.gender == null
  ) {
    return {
      name: CampaignStatus.INCOMPLETE,
      description: 'Complétez votre brief pour publier la campagne',
      color: palette.red._500,
    }
  }
  if (campaign.isArchived) {
    return {
      name: CampaignStatus.ARCHIVED,
      description:
        "Les influenceurs ne peuvent pas voir votre campagne. C'est soit parce qu'elle est terminée, soit parce que vous n'avez pas terminé votre brief. Vous pouvez la publier à tout moment",
      color: palette.grey._400,
    }
  }
  if (campaign.isReviewed) {
    return {
      name: CampaignStatus.ONLINE,
      description:
        "Votre campagne est visible par tous les influenceurs. Allez dans l'onglet Propositions pour voir qui est intéressé",
      color: palette.green._500,
    }
  }
  return {
    name: CampaignStatus.AWAITING_REVIEW,
    description:
      "Une fois que nos experts en marketing d'influence auront analysé votre campagne, vous pourrez recevoir des propositions d'influenceurs.",
    color: palette.orange._500,
  }
}

export const GET_CAMPAIGN = gql`
  query GetCampaign($campaignId: String!) {
    campaign(id: $campaignId) {
      _id
      name
      description
      estimatedBudget
      product {
        name
        description
        website
        pictures
        youtubeLink
        launchedAt
      }
      brand {
        ...BrandFragment
      }
      targetAudience {
        gender
        countries
        ageGroups
      }
      rules
      isArchived
      isReviewed
      owner {
        _id
        email
      }
    }
  }
  ${BRAND_FRAGMENT}
`

interface MatchParams {
  campaignId: string
}

interface Props extends RouteComponentProps<MatchParams> {}

const CampaignDashboard: React.FC<Props> = ({ match, location }) => {
  const { campaignId } = match.params

  const { data: { campaign } = { campaign: null }, loading, error } = useQuery<
    GetCampaign,
    GetCampaignVariables
  >(GET_CAMPAIGN, { variables: { campaignId } })

  usePageTitle(campaign && campaign.name)
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
        return <CampaignCollabRequests campaignId={campaignId} />
      case 'collabs':
        return <CampaignCollabs campaignId={campaignId} />
      case 'brief':
        return <CampaignBriefPreview campaign={campaign} />
      case 'reviews':
        return <CampaignReviews campaignId={campaignId} />
      case 'settings':
        return <CampaignSettings campaignId={campaignId} />
      default:
        return <CampaignCollabRequests campaignId={campaignId} />
    }
  }

  if (loading) {
    return <Loader />
  }
  if (error) {
    return <ErrorCard message="Could not show campaign" />
  }

  return (
    <main>
      <ContainerBox>
        <PageHeader title={campaign.name} destination="/brand" />
      </ContainerBox>
      {status.name !== CampaignStatus.ONLINE && (
        <ContainerBox mb="2rem" mt="-1rem">
          {status.name === CampaignStatus.AWAITING_REVIEW && (
            <NotificationCard
              message="Votre campagne est en attente de modération. Elle n'est pas encore visible."
              nature="info"
            />
          )}
          {status.name === CampaignStatus.ARCHIVED && (
            <NotificationCard
              message="Votre campagne n'est pas en ligne. Vous pouvez la publier dans l'onglet Réglages"
              nature="info"
            />
          )}
          {status.name === CampaignStatus.INCOMPLETE && (
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
