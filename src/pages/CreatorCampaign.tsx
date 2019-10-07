import React, { useState } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { Flex, Box } from '@rebass/grid'
import ErrorCard from '../components/ErrorCard'
import CreatorCollabRequestForm from '../components/CreatorCollabRequestForm'
import { ContainerBox } from '../styles/grid'
import CreatorCampaignPresentation, {
  CREATOR_CAMPAIGN_PRESENTATION_FRAGMENT,
} from '../components/CreatorCampaignPresentation'
import PageHeader from '../components/PageHeader'
import ErrorBoundary from '../components/ErrorBoundary'
import SubmitCreatorReviews from '../components/SubmitCreatorReviews'
import { usePageTitle, useWindowSize } from '../utils/hooks'
import Loader from '../components/Loader'
import { MainButton, TextButton } from '../styles/Button'
import { palette } from '../utils/colors'
import NotificationCard from '../components/NotificationCard'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import {
  GetCreatorCampaignPage,
  GetCreatorCampaignPageVariables,
} from '../__generated__/GetCreatorCampaignPage'
import { CreatorStatus, CollabStatus } from '../__generated__/globalTypes'

enum GameTab {
  PRESENTATION = 'presentation',
  APPLY = 'apply',
  SUBMIT = 'submit',
}

const GET_CREATOR_CAMPAIGN_PAGE = gql`
  query GetCreatorCampaignPage($campaignId: String!) {
    session {
      creator {
        _id
        status
      }
    }
    campaign(id: $campaignId) {
      ...CreatorCampaignPresentationFragment
    }
    collabs {
      _id
      status
      campaign {
        _id
      }
    }
  }
  ${CREATOR_CAMPAIGN_PRESENTATION_FRAGMENT}
`

interface Props extends RouteComponentProps<{ campaignId: string }> {}

const CreatorCampaign: React.FC<Props> = ({ match }) => {
  const { campaignId } = match.params
  const { width } = useWindowSize()
  const {
    data: { session, campaign, collabs } = {
      session: null,
      campaign: null,
      collabs: null,
    },
    loading,
    error,
  } = useQuery<GetCreatorCampaignPage, GetCreatorCampaignPageVariables>(GET_CREATOR_CAMPAIGN_PAGE, {
    variables: { campaignId },
  })
  const [tab, setTab] = useState<GameTab>(GameTab.PRESENTATION)

  usePageTitle(campaign && campaign.product.name)

  if (loading) {
    return <Loader fullScreen />
  }
  if (error) {
    return (
      <ContainerBox>
        <ErrorCard message="Could not show game" />
      </ContainerBox>
    )
  }

  // Check if it's already in a collab
  const linkedCollab = collabs.find(_collab => _collab.campaign._id === campaignId)
  const alreadyInCollab = linkedCollab != null

  // Handle case where no campaign is defined
  if (campaign == null) {
    return (
      <ContainerBox>
        <ErrorCard message="Could not show game" />
      </ContainerBox>
    )
  }

  const showPresentation = () => <CreatorCampaignPresentation campaignId={campaign._id} />

  const changeTab = (newTab: GameTab) => {
    window.scrollTo(0, 0)
    setTab(newTab)
  }

  const showActionButton = () => {
    // Fresh new campaign, suggest applying
    if (tab === GameTab.PRESENTATION && !alreadyInCollab) {
      return (
        <MainButton
          onClick={() => changeTab(GameTab.APPLY)}
          noMargin
          disabled={session.creator.status !== CreatorStatus.VERIFIED}
        >
          Apply
        </MainButton>
      )
    }
    if (
      tab === GameTab.PRESENTATION &&
      alreadyInCollab &&
      (linkedCollab.status === CollabStatus.SENT || linkedCollab.status === CollabStatus.ACCEPTED)
    ) {
      return (
        <MainButton onClick={() => changeTab(GameTab.SUBMIT)} noMargin>
          Submit my review
        </MainButton>
      )
    }
    // Otherwise nothing
  }

  const showCurrentTab = () => {
    if (tab === GameTab.PRESENTATION) {
      return showPresentation()
    }

    // Apply to campaign
    if (tab === GameTab.APPLY) {
      return <CreatorCollabRequestForm brand={campaign.brand.name} campaignId={campaign._id} />
    }

    // Submit review
    if (tab === GameTab.SUBMIT) {
      if (
        alreadyInCollab &&
        linkedCollab.status !== CollabStatus.REQUEST &&
        linkedCollab.status !== CollabStatus.DENIED
      ) {
        return <SubmitCreatorReviews collabId={linkedCollab._id} />
      }
    }

    // Default (should not happen)
    return showPresentation()
  }

  return (
    <ErrorBoundary message="Could not show game">
      <ContainerBox>
        {/* Page header */}
        <Flex
          flexDirection={['column', 'row', 'row']}
          justifyContent="space-between"
          alignItems={['flex-start', 'center', 'center']}
          style={width > 1150 ? { borderBottom: `3px solid ${palette.grey._200}` } : null}
        >
          <PageHeader
            title={campaign.product.name}
            destination={alreadyInCollab ? '/creator/collabs' : '/creator/games'}
          />
          {showActionButton()}
        </Flex>
        {/* Eventual info message */}
        {session.creator.status !== CreatorStatus.VERIFIED && (
          <Box mt="2rem">
            <NotificationCard
              nature="info"
              message="Your profile hasn't been verified by our team. You can't apply to games yet"
            />
          </Box>
        )}

        {/* Actual tab content */}
        {showCurrentTab()}
        {/* Main action button (depends on tab) */}
        <Flex justifyContent="center">{showActionButton()}</Flex>

        {/* Go back to main tab (presentation) if not on main tab */}
        {tab !== GameTab.PRESENTATION && (
          <Flex justifyContent="center" mt="2rem">
            <TextButton onClick={() => changeTab(GameTab.PRESENTATION)}>
              Back to the game presentation
            </TextButton>
          </Flex>
        )}
      </ContainerBox>
    </ErrorBoundary>
  )
}

export default withRouter(CreatorCampaign)