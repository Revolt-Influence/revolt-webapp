import React, { useState } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { Flex, Box } from '@rebass/grid'
import ErrorCard from '../components/ErrorCard'
import ExperienceForm from '../components/ExperienceForm'
import { ContainerBox } from '../styles/grid'
import ExperiencePresentation, {
  EXPERIENCE_PRESENTATION_FRAGMENT,
} from '../components/ExperiencePresentation'
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
import { GetExperiencePage, GetExperiencePageVariables } from '../__generated__/GetExperiencePage'
import { CreatorStatus, CollabStatus } from '../__generated__/globalTypes'

enum ExperienceTab {
  PRESENTATION = 'presentation',
  APPLY = 'apply',
  SUBMIT = 'submit',
}

const GET_EXPERIENCE_PAGE = gql`
  query GetExperiencePage($campaignId: String!) {
    session {
      creator {
        _id
        status
      }
    }
    campaign(id: $campaignId) {
      ...ExperiencePresentation
    }
    collabs {
      _id
      status
      campaign {
        _id
      }
    }
  }
  ${EXPERIENCE_PRESENTATION_FRAGMENT}
`

interface Props extends RouteComponentProps<{ campaignId: string }> {}

const Experience: React.FC<Props> = ({ match }) => {
  const { campaignId } = match.params
  const { width } = useWindowSize()
  const {
    data: { session, campaign: experience, collabs } = {
      session: null,
      campaign: null,
      collabs: null,
    },
    loading,
    error,
  } = useQuery<GetExperiencePage, GetExperiencePageVariables>(GET_EXPERIENCE_PAGE)
  const [tab, setTab] = useState<ExperienceTab>(ExperienceTab.PRESENTATION)

  usePageTitle(experience && experience.name)

  if (loading) {
    return <Loader fullScreen />
  }
  if (error) {
    return <ErrorCard message="Could not show experience" />
  }

  // Check if it's already in a collab
  const linkedCollab = collabs.find(_collab => _collab.campaign._id === campaignId)
  const alreadyInCollab = linkedCollab != null

  // Handle case where no experience is defined
  if (experience == null) {
    return (
      <ContainerBox>
        <ErrorCard message="L'expérience n'a pas pu être affichée" />
      </ContainerBox>
    )
  }

  const showPresentation = () => <ExperiencePresentation experienceId={experience._id} />

  const changeTab = (newTab: typeof tab) => {
    window.scrollTo(0, 0)
    setTab(newTab)
  }

  const showActionButton = () => {
    // Fresh new campaign, suggest applying
    if (tab === 'presentation' && !alreadyInCollab) {
      return (
        <MainButton
          onClick={() => changeTab(ExperienceTab.APPLY)}
          noMargin
          disabled={session.creator.status !== CreatorStatus.VERIFIED}
        >
          Postuler à l'expérience
        </MainButton>
      )
    }
    if (
      tab === ExperienceTab.PRESENTATION &&
      alreadyInCollab &&
      (linkedCollab.status === CollabStatus.SENT || linkedCollab.status === CollabStatus.ACCEPTED)
    ) {
      return (
        <MainButton onClick={() => changeTab(ExperienceTab.SUBMIT)} noMargin>
          Poster ma revue
        </MainButton>
      )
    }
    // Otherwise nothing
  }

  const showCurrentTab = () => {
    if (tab === 'presentation') {
      return showPresentation()
    }

    // Apply to campaign
    if (tab === 'apply') {
      return <ExperienceForm brand={experience.brand.name} experienceId={experience._id} />
    }

    // Submit review
    if (tab === 'submit') {
      if (
        alreadyInCollab &&
        linkedCollab.status !== CollabStatus.APPLIED &&
        linkedCollab.status !== CollabStatus.DENIED
      ) {
        return <SubmitCreatorReviews collabId={linkedCollab._id} />
      }
    }

    // Default (should not happen)
    return showPresentation()
  }

  return (
    <ErrorBoundary message="L'expérience n'a pas pu être affichée">
      <ContainerBox>
        {/* Page header */}
        <Flex
          flexDirection={['column', 'row', 'row']}
          justifyContent="space-between"
          alignItems={['flex-start', 'center', 'center']}
          style={width > 1150 ? { borderBottom: `3px solid ${palette.grey._200}` } : null}
        >
          <PageHeader
            title={experience.name}
            destination={alreadyInCollab ? '/creator/collabs' : '/creator/experiences'}
          />
          {showActionButton()}
        </Flex>
        {/* Eventual info message */}
        {session.creator.status !== CreatorStatus.VERIFIED && (
          <Box mt="2rem">
            <NotificationCard
              nature="info"
              message="Votre profil n'a pas encore été validé par notre équipe. Vous ne pouvez donc pas encore postuler aux expériences"
            />
          </Box>
        )}

        {/* Actual tab content */}
        {showCurrentTab()}
        {/* Main action button (depends on tab) */}
        <Flex justifyContent="center">{showActionButton()}</Flex>

        {/* Go back to main tab (presentation) if not on main tab */}
        {tab !== 'presentation' && (
          <Flex justifyContent="center" mt="2rem">
            <TextButton onClick={() => changeTab(ExperienceTab.PRESENTATION)}>
              Retour à l'expérience
            </TextButton>
          </Flex>
        )}
      </ContainerBox>
    </ErrorBoundary>
  )
}

export default withRouter(Experience)
