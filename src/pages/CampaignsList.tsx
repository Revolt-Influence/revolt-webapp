import { useMutation, useQuery } from '@apollo/react-hooks'
import { Box, Flex } from '@rebass/grid'
import gql from 'graphql-tag'
import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import BrandOnboarding from '../components/BrandOnboarding'
import CampaignPreviewCard from '../components/CampaignPreviewCard'
import ErrorCard from '../components/ErrorCard'
import { EXPERIENCE_PRESENTATION_FRAGMENT } from '../components/ExperiencePresentation'
import Loader from '../components/Loader'
import NotificationCard from '../components/NotificationCard'
import { MainButton } from '../styles/Button'
import { ContainerBox } from '../styles/grid'
import { Title } from '../styles/Text'
import { usePageTitle } from '../utils/hooks'
import { CreateCampaign } from '../__generated__/CreateCampaign'
import { GetCampaigns } from '../__generated__/GetCampaigns'

const CAMPAIGN_CARD_FRAGMENT = gql`
  fragment CampaignCardFragment on Campaign {
    ...ExperiencePresentationFragment
    collabs {
      _id
      status
    }
    estimatedBudget
    trackingProvider
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
  ${EXPERIENCE_PRESENTATION_FRAGMENT}
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

export const CREATE_CAMPAIGN = gql`
  mutation CreateCampaign {
    createCampaign {
      ...ExperiencePresentationFragment
      collabs {
        _id
        status
      }
    }
  }
  ${EXPERIENCE_PRESENTATION_FRAGMENT}
`

const CampaignsList: React.FC<RouteComponentProps> = ({ history }) => {
  usePageTitle('My campaigns')
  // Fetch data
  const { data: { campaigns } = { campaigns: null }, loading, error } = useQuery<GetCampaigns, {}>(
    GET_CAMPAIGNS
  )
  const [createCampaign, createCampaignStatus] = useMutation<CreateCampaign, {}>(CREATE_CAMPAIGN, {
    // Go to campaign page if campaign was created
    onCompleted: createdCampaign => {
      history.push(`/brand/campaigns/${createdCampaign.createCampaign._id}/brief`)
    },
    // Add created campaign to cache
    refetchQueries: [{ query: GET_CAMPAIGNS }],
  })

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
            <MainButton
              onClick={() => createCampaign()}
              disabled={createCampaignStatus.loading}
              noMargin
            >
              {createCampaignStatus.loading ? 'Creating campaign...' : 'Create a campaign'}
            </MainButton>
          </Box>
        </Flex>
      </ContainerBox>
      <ContainerBox>
        {createCampaignStatus.error && (
          <Box mb="1rem">
            <ErrorCard message="Could not create campaign" noMargin />
          </Box>
        )}
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
