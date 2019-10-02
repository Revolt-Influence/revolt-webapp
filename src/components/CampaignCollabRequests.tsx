import React, { useEffect, useState } from 'react'
import { Box } from '@rebass/grid'
import moment from 'moment'
import 'moment/locale/fr'
import { ContainerBox } from '../styles/grid'
import { useToggle } from '../utils/hooks'
import CreatorProfile, { CREATOR_PROFILE_FRAGMENT } from './CreatorProfile'
import ErrorBoundary from './ErrorBoundary'
import CheckBox from './CheckBox'
import NotificationCard from './NotificationCard'
import FullHeightColumns from './FullHeightColumns'
import SelectableCard from './SelectableCard'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import {
  GetCampaignRequestedCollabs,
  GetCampaignRequestedCollabsVariables,
  GetCampaignRequestedCollabs_campaign_collabs,
} from '../__generated__/GetCampaignRequestedCollabs'
import { CollabStatus, ReviewCollabDecision } from '../__generated__/globalTypes'
import Loader from './Loader'
import ErrorCard from './ErrorCard'
import {
  ReviewCollabApplication,
  ReviewCollabApplicationVariables,
} from '../__generated__/ReviewCollabApplication'

moment.locale('fr')

const placeholderImage = 'https://dummyimage.com/40x40/d8dee3/D8DEE3.jpg'

const GET_CAMPAIGN_REQUESTED_COLLABS = gql`
  query GetCampaignRequestedCollabs($campaignId: String!) {
    campaign(id: $campaignId) {
      collabs {
        _id
        status
        createdAt
        message
        conversation {
          _id
        }
        creator {
          ...CreatorProfileFragment
        }
      }
    }
  }
  ${CREATOR_PROFILE_FRAGMENT}
`

export const REVIEW_COLLAB_APPLICATION = gql`
  mutation ReviewCollabApplication($collabId: String!, $decision: ReviewCollabDecision!) {
    reviewCollabApplication(decision: $decision, collabId: $collabId) {
      _id
      status
      updatedAt
    }
  }
`

interface Props {
  campaignId: string
}

const CampaignPropositions: React.FC<Props> = ({ campaignId }) => {
  // Server requests
  const { data: { campaign } = { campaign: null }, loading, error } = useQuery<
    GetCampaignRequestedCollabs,
    GetCampaignRequestedCollabsVariables
  >(GET_CAMPAIGN_REQUESTED_COLLABS, { variables: { campaignId } })
  const collabsApplied = campaign
    ? campaign.collabs.filter(_collab => _collab.status === CollabStatus.APPLIED)
    : []
  const collabsDenied = campaign
    ? campaign.collabs.filter(_collab => _collab.status === CollabStatus.DENIED)
    : []
  const [showRefused, toggleShowRefused] = useToggle(false)

  // Prepare decision request
  const [reviewCollabApplication, reviewStatus] = useMutation<
    ReviewCollabApplication,
    ReviewCollabApplicationVariables
  >(REVIEW_COLLAB_APPLICATION)

  const [selectedId, setSelectedId] = useState(collabsApplied.length && collabsApplied[0]._id)
  useEffect(() => {
    setSelectedId(collabsApplied.length && collabsApplied[0]._id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collabsApplied.length])

  const selectedProposition =
    [...collabsApplied, ...collabsDenied].find(_proposition => _proposition._id === selectedId) ||
    collabsApplied[0]
  const selectedCreator = selectedProposition && selectedProposition.creator

  const showPropositionPreview = (_proposition: GetCampaignRequestedCollabs_campaign_collabs) => (
    <SelectableCard
      key={_proposition._id}
      selected={_proposition._id === selectedId}
      handleClick={() => setSelectedId(_proposition._id)}
      picture={_proposition.creator.picture || placeholderImage}
      title={_proposition.creator.name}
      description={moment(_proposition.createdAt).fromNow()}
    />
  )

  if (loading) {
    return <Loader />
  }
  if (error) {
    return <ErrorCard message="Could not show collab requests" />
  }

  const handleApplicationDecision = (decision: ReviewCollabDecision): void => {
    if (!reviewStatus.loading) {
      reviewCollabApplication({
        variables: { collabId: selectedId, decision },
      })
    }
  }

  return (
    <ContainerBox mt="-2rem">
      <ErrorBoundary message="Les propositions n'ont pas pu être affichées">
        <FullHeightColumns
          leftComponent={() => (
            <>
              {collabsApplied.length === 0 && (
                <Box mt="1rem">
                  <NotificationCard
                    nature="info"
                    message="Vous n'avez pas de nouvelle proposition"
                  />
                </Box>
              )}
              {collabsApplied
                .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
                .map(showPropositionPreview)}
              <Box mb="1rem" px="2rem">
                <CheckBox
                  text="Afficher les propositions refusées"
                  isChecked={showRefused}
                  handleClick={toggleShowRefused}
                />
              </Box>
              {showRefused &&
                collabsDenied
                  .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
                  .map(showPropositionPreview)}
            </>
          )}
          rightComponent={() => (
            <Box p="1rem" flex={1}>
              {selectedCreator && (
                <CreatorProfile
                  creatorId={selectedCreator._id}
                  collabId={selectedId}
                  handleAccept={() => handleApplicationDecision(ReviewCollabDecision.ACCEPT)}
                  handleRefuse={() => handleApplicationDecision(ReviewCollabDecision.DENY)}
                />
              )}
            </Box>
          )}
        />
      </ErrorBoundary>
    </ContainerBox>
  )
}

export default CampaignPropositions
