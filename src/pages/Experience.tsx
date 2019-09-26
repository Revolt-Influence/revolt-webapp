import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Flex, Box } from '@rebass/grid'
import IState from '../models/State'
import { ICampaign } from '../models/Campaign'
import ErrorCard from '../components/ErrorCard'
import ExperienceForm from '../components/ExperienceForm'
import { ContainerBox } from '../styles/grid'
import { ICollab } from '../models/Collab'
import ExperiencePresentation from '../components/ExperiencePresentation'
import PageHeader from '../components/PageHeader'
import ErrorBoundary from '../components/ErrorBoundary'
import SubmitCreatorReviews from '../components/SubmitCreatorReviews'
import { usePageTitle, useWindowSize } from '../utils/hooks'
import { getCampaign } from '../actions/campaigns'
import { IRequestStatus } from '../utils/request'
import Loader from '../components/Loader'
import { MainButton, TextButton } from '../styles/Button'
import { palette } from '../utils/colors'
import { CreatorStatus } from '../models/Creator'
import NotificationCard from '../components/NotificationCard'

interface IExperienceProps extends RouteComponentProps<{ campaignId: string }> {}

const Experience: React.FC<IExperienceProps> = ({ match }) => {
  const { campaignId } = match.params
  const { width } = useWindowSize()
  const creatorStatus = useSelector<IState, CreatorStatus>(state => state.session.creator.status)
  // Find experience from Redux
  const experience = useSelector<IState, ICampaign>(state =>
    state.campaigns.items.find(_experience => _experience._id === campaignId)
  )
  // Load experience from API if it's not already in Redux
  const dispatch = useDispatch()
  const getExperienceStatus = useSelector<IState, IRequestStatus>(
    state => state.campaigns.requests.getCampaign
  )
  if (experience == null && !getExperienceStatus.isLoading && !getExperienceStatus.hasFailed) {
    dispatch(getCampaign(campaignId))
  }

  usePageTitle(experience && experience.name)

  // Get ID of all experiences that are linked to a collab
  const collabs = useSelector<IState, ICollab[]>(state => state.collabs.items)

  // Check if it's already in a collab
  const linkedCollab = collabs.find(_collab => _collab.campaign === campaignId)
  const alreadyInCollab = linkedCollab != null

  const [tab, setTab] = React.useState<'presentation' | 'apply' | 'submit'>('presentation')

  if (getExperienceStatus.isLoading) {
    return <Loader fullScreen />
  }

  // Handle case where no experience is defined
  if (experience == null) {
    return (
      <ContainerBox>
        <ErrorCard message="L'expérience n'a pas pu être affichée" />
      </ContainerBox>
    )
  }

  const showPresentation = () => <ExperiencePresentation experience={experience} />

  const changeTab = (newTab: typeof tab) => {
    window.scrollTo(0, 0)
    setTab(newTab)
  }

  const showActionButton = () => {
    // Fresh new campaign, suggest applying
    if (tab === 'presentation' && !alreadyInCollab) {
      return (
        <MainButton
          onClick={() => changeTab('apply')}
          noMargin
          disabled={creatorStatus !== 'verified'}
        >
          Postuler à l'expérience
        </MainButton>
      )
    }
    if (
      tab === 'presentation' &&
      alreadyInCollab &&
      (linkedCollab.status === 'sent' || linkedCollab.status === 'accepted')
    ) {
      return (
        <MainButton onClick={() => changeTab('submit')} noMargin>
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
      return (
        <ExperienceForm
          brand={experience.settings.brand.name}
          addressIsNeeded={experience.settings.gift.addressIsNeeded || false}
          experienceId={experience._id}
          possibleFormats={experience.settings.task.formats}
        />
      )
    }

    // Submit review
    if (tab === 'submit') {
      if (
        alreadyInCollab &&
        linkedCollab.status !== 'proposed' &&
        linkedCollab.status !== 'refused'
      ) {
        return <SubmitCreatorReviews collab={linkedCollab} />
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
        {creatorStatus !== 'verified' && (
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
            <TextButton onClick={() => changeTab('presentation')}>Retour à l'expérience</TextButton>
          </Flex>
        )}
      </ContainerBox>
    </ErrorBoundary>
  )
}

export default withRouter(Experience)
