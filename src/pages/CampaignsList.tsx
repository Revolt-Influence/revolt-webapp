import { useQuery } from '@apollo/react-hooks'
import { Box, Flex } from '@rebass/grid'
import gql from 'graphql-tag'
import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import BrandOnboarding from '../components/BrandOnboarding'
import CampaignPreviewCard from '../components/CampaignPreviewCard'
import ErrorCard from '../components/ErrorCard'
import Loader from '../components/Loader'
import NotificationCard from '../components/NotificationCard'
import { MainLink } from '../styles/Button'
import { ContainerBox } from '../styles/grid'
import { Title } from '../styles/Text'
import { usePageTitle } from '../utils/hooks'
import { GetCampaigns } from '../__generated__/GetCampaigns'
import { CREATOR_CAMPAIGN_PRESENTATION_FRAGMENT } from '../components/CreatorCampaignPresentation'

const CAMPAIGN_CARD_FRAGMENT = gql`
  fragment CampaignCardFragment on Campaign {
    ...CreatorCampaignPresentationFragment
    collabs {
      _id
      status
    }
    estimatedBudget
    trackingProvider
    publishingPlatforms
    targetAudience {
      ageGroups
      countries
      gender
    }
    isArchived
    isReviewed
    owner {
      _id
      email
    }
  }
  ${CREATOR_CAMPAIGN_PRESENTATION_FRAGMENT}
`

export const GET_CAMPAIGNS = gql`
  query GetCampaigns {
    campaigns {
      currentPage
      totalPages
      items {
        ...CampaignCardFragment
      }
    }
  }
  ${CAMPAIGN_CARD_FRAGMENT}
`

const CampaignsList: React.FC<RouteComponentProps> = ({ history }) => {
  usePageTitle('My campaigns')
  // Fetch data
  const { data: { campaigns } = { campaigns: null }, loading, error } = useQuery<GetCampaigns, {}>(
    GET_CAMPAIGNS
  )

  if (loading) {
    return <Loader />
  }
  if (error) {
    return <ErrorCard message="Could not show campaigns" />
  }

  if (campaigns.items.length === 0) {
    return (
      <ContainerBox>
        <BrandOnboarding />
      </ContainerBox>
    )
  }

  return (
    <>
      <ContainerBox>
        <Flex
          flexDirection={['column', 'row', 'row']}
          justifyContent="space-between"
          alignItems="center"
        >
          <Title>My campaigns</Title>
          <Box mb={['3rem', 0, 0]}>
            <MainLink noMargin to="/brand/createCampaign">
              Create a campaign
            </MainLink>
          </Box>
        </Flex>
      </ContainerBox>
      <ContainerBox>
        <Flex flexDirection="row" flexWrap="wrap" mx={[0, 0, '-2rem']} mt="-3rem" pb="2rem">
          {campaigns.items.length > 0 ? (
            campaigns.items.map(_campaign => (
              <Box
                width={[1, 6 / 12, 4 / 12]}
                mt="3rem"
                mx={['auto', 'unset', 'unset']}
                px="2rem"
                key={_campaign._id}
              >
                <CampaignPreviewCard campaign={_campaign} />
              </Box>
            ))
          ) : (
            <Box mt="2rem" px={[0, 0, '-2rem']}>
              <NotificationCard message="No campaigns yet" nature="info" />
            </Box>
          )}
        </Flex>
      </ContainerBox>
    </>
  )
}

export default withRouter(CampaignsList)
