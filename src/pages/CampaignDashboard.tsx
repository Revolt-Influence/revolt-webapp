import React, { lazy, Suspense } from 'react'
import { Box } from '@rebass/grid'
import queryString from 'query-string'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import CampaignBriefPreview from '../components/CampaignBriefPreview'
import CampaignCollabs from '../components/CampaignCollabs'
import CampaignCollabRequests from '../components/CampaignCollabRequests'
import CampaignSettings from '../components/CampaignSettings'
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
import InfoCard from '../components/InfoCard'

const CampaignReviews = lazy(() => import('../components/CampaignReviews'))

export enum CampaignStatus {
  ARCHIVED = 'Not published',
  ONLINE = 'Online',
  AWAITING_REVIEW = 'Awaiting review',
  INCOMPLETE = 'Incomplete',
}

enum DashboardTab {
  REQUESTS = 'requests',
  COLLABS = 'collabs',
  BRIEF = 'brief',
  REVIEWS = 'reviews',
  SETTINGS = 'settings',
}

interface CampaignStatusInfo {
  name: CampaignStatus
  description: string
  color: string
}

const getCampaignStatus = (campaign: GetCampaign_campaign): CampaignStatusInfo => {
  if (
    !campaign ||
    !campaign.product ||
    !campaign.product.name ||
    !campaign.product.pitch ||
    !campaign.product.pictures ||
    !campaign.product.website ||
    !campaign.targetAudience == null ||
    !campaign.targetAudience.ageGroups == null ||
    !campaign.targetAudience.countries == null ||
    !campaign.targetAudience.gender == null
  ) {
    return {
      name: CampaignStatus.INCOMPLETE,
      description: 'Your campaign is not ready yet',
      color: palette.red._500,
    }
  }
  if (campaign.isArchived) {
    return {
      name: CampaignStatus.ARCHIVED,
      description: 'Influencers cannot see your campaign. You can publish it whenever you like',
      color: palette.grey._400,
    }
  }
  if (campaign.isReviewed) {
    return {
      name: CampaignStatus.ONLINE,
      description: 'Influencers can see your campaign. Check the Requests tab for new collabs',
      color: palette.green._500,
    }
  }
  return {
    name: CampaignStatus.AWAITING_REVIEW,
    description: 'Our team is reviewing your campaign, we will get back to you shortly.',
    color: palette.orange._500,
  }
}

export const GET_CAMPAIGN = gql`
  query GetCampaign($campaignId: String!) {
    campaign(id: $campaignId) {
      _id
      estimatedBudget
      trackingProvider
      publishingPlatforms
      product {
        name
        pitch
        website
        pictures
        youtubeLink
        categories
        launchedAt
      }
      brand {
        _id
        name
        logo
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

  usePageTitle(campaign && campaign.product && campaign.product.name)
  // Get current page from URL
  const parsedQuery = queryString.parse(location.search)
  const hasQueryParams = Object.entries(parsedQuery).length > 0
  const currentTab = hasQueryParams
    ? (parsedQuery as any).tab
    : (DashboardTab.REQUESTS as DashboardTab)

  const status = getCampaignStatus(campaign)

  const tabItems: ITabItem[] = [
    {
      name: 'Requests',
      link: `/brand/campaigns/${campaignId}/dashboard?tab=${DashboardTab.REQUESTS}`,
      isActive: currentTab === DashboardTab.REQUESTS,
    },
    {
      name: 'Collabs',
      link: `/brand/campaigns/${campaignId}/dashboard?tab=${DashboardTab.COLLABS}`,
      isActive: currentTab === DashboardTab.COLLABS,
    },
    {
      name: 'Brief',
      link: `/brand/campaigns/${campaignId}/dashboard?tab=${DashboardTab.BRIEF}`,
      isActive: currentTab === DashboardTab.BRIEF,
    },
    {
      name: 'Reviews',
      link: `/brand/campaigns/${campaignId}/dashboard?tab=${DashboardTab.REVIEWS}`,
      isActive: currentTab === DashboardTab.REVIEWS,
    },
    {
      name: 'Settings',
      link: `/brand/campaigns/${campaignId}/dashboard?tab=${DashboardTab.SETTINGS}`,
      isActive: currentTab === DashboardTab.SETTINGS,
    },
  ]

  const showCurrentTab = (): React.ReactElement => {
    switch (currentTab) {
      case DashboardTab.REQUESTS:
        return <CampaignCollabRequests campaignId={campaignId} />
      case DashboardTab.COLLABS:
        return <CampaignCollabs campaignId={campaignId} />
      case DashboardTab.BRIEF:
        return <CampaignBriefPreview campaign={campaign} />
      case DashboardTab.REVIEWS:
        return <CampaignReviews campaignId={campaignId} />
      case DashboardTab.SETTINGS:
        return <CampaignSettings campaignId={campaignId} />
      default:
        return <CampaignCollabRequests campaignId={campaignId} />
    }
  }

  if (loading) {
    return <Loader fullScreen />
  }
  if (error) {
    return <ErrorCard message="Could not show campaign" />
  }

  return (
    <main>
      {/* Header */}
      <ContainerBox>
        <PageHeader title={campaign.product.name} destination="/brand" />
      </ContainerBox>
      {/* Optional info messsages */}
      {status.name !== CampaignStatus.ONLINE && (
        <ContainerBox mb="2rem" mt="-1rem">
          {status.name === CampaignStatus.AWAITING_REVIEW && (
            <InfoCard message={status.description} />
          )}
          {status.name === CampaignStatus.ARCHIVED && <InfoCard message={status.description} />}
          {status.name === CampaignStatus.INCOMPLETE && <InfoCard message={status.description} />}
        </ContainerBox>
      )}
      {/* Dashboard tab */}
      <Box mt={[0, 0, '-2rem']}>
        <Tabs items={tabItems} />
      </Box>
      {/* Main content */}
      <Suspense fallback={<Loader />}>{showCurrentTab()}</Suspense>
    </main>
  )
}

export { getCampaignStatus }
export default withRouter(CampaignDashboard)
