import React, { useEffect, useState } from 'react'
import { Box } from '@rebass/grid'
import moment from 'moment'
import { ContainerBox } from '../styles/grid'
import { useToggle } from '../utils/hooks'
import CreatorProfile, { GET_CREATOR, GET_COLLAB } from './CreatorProfile'
import ErrorBoundary from './ErrorBoundary'
import CheckBox from './CheckBox'
import FullHeightColumns from './FullHeightColumns'
import SelectableCard from './SelectableCard'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import {
  GetCampaignRequestedCollabs,
  GetCampaignRequestedCollabsVariables,
  GetCampaignRequestedCollabs_campaign_collabs,
} from '../__generated__/GetCampaignRequestedCollabs'
import { CollabStatus, ReviewCollabDecision, CreatorStatus } from '../__generated__/globalTypes'
import Loader from './Loader'
import ErrorCard from './ErrorCard'
import {
  ReviewCollabApplication,
  ReviewCollabApplicationVariables,
} from '../__generated__/ReviewCollabApplication'
import InfoCard from './InfoCard'
import { YOUTUBER_PROFILE_FRAGMENT, GET_YOUTUBER } from './YoutubePreview'
import { dummyCollabRequest, dummyCreator } from '../utils/dummyData'
import { GetCreator, GetCreatorVariables } from '../__generated__/GetCreator'
import { GetYoutuber, GetYoutuberVariables } from '../__generated__/GetYoutuber'
import { GetCollab, GetCollabVariables } from '../__generated__/GetCollab'

const placeholderImage = 'https://dummyimage.com/40x40/d8dee3/D8DEE3.jpg'

const GET_CAMPAIGN_REQUESTED_COLLABS = gql`
  query GetCampaignRequestedCollabs($campaignId: String!) {
    campaign(id: $campaignId) {
      _id
      collabs {
        _id
        status
        createdAt
        message
        quote
        conversation {
          _id
        }
        creator {
          # Using CreatorProfileFragment made webpack crash (probably a circular dep or something)
          _id
          name
          picture
          birthYear
          language
          youtube {
            ...YoutuberProfileFragment
          }
        }
      }
    }
  }
  ${YOUTUBER_PROFILE_FRAGMENT}
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
  const { data: { campaign } = { campaign: null }, loading, error, client } = useQuery<
    GetCampaignRequestedCollabs,
    GetCampaignRequestedCollabsVariables
  >(GET_CAMPAIGN_REQUESTED_COLLABS, { variables: { campaignId } })
  const collabsApplied = campaign
    ? campaign.collabs.filter(_collab => _collab.status === CollabStatus.REQUEST)
    : []
  const collabsDenied = campaign
    ? campaign.collabs.filter(_collab => _collab.status === CollabStatus.DENIED)
    : []
  const [showRefused, toggleShowRefused] = useToggle(false)

  const dummyIsShown: boolean = !loading && !error && campaign.collabs.length === 0

  // Prepare decision request
  const [reviewCollabApplication, reviewStatus] = useMutation<
    ReviewCollabApplication,
    ReviewCollabApplicationVariables
  >(REVIEW_COLLAB_APPLICATION)

  const [selectedId, setSelectedId] = useState(collabsApplied.length && collabsApplied[0]._id)
  useEffect(() => {
    if (!dummyIsShown) {
      // Auto select first real collab
      setSelectedId(collabsApplied.length && collabsApplied[0]._id)
    } else {
      // Auto select dummy creator
      setSelectedId(dummyCollabRequest._id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collabsApplied.length, dummyIsShown])

  const selectedProposition =
    [...collabsApplied, ...collabsDenied, dummyCollabRequest].find(
      _proposition => _proposition._id === selectedId
    ) || collabsApplied[0]
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

  useEffect(() => {
    // Add dummy data to cache if they'll be displayed
    if (dummyIsShown) {
      // Collab query
      client.writeQuery<GetCollab, GetCollabVariables>({
        query: GET_COLLAB,
        variables: { collabId: dummyCollabRequest._id },
        data: {
          collab: {
            ...dummyCollabRequest,
            updatedAt: Date.now(),
          },
        },
      })
      // Creator query
      client.writeQuery<GetCreator, GetCreatorVariables>({
        query: GET_CREATOR,
        variables: { creatorId: dummyCreator._id },
        data: {
          creator: {
            ...dummyCreator,
            status: CreatorStatus.VERIFIED,
          },
        },
      })
      // Youtuber query
      client.writeQuery<GetYoutuber, GetYoutuberVariables>({
        query: GET_YOUTUBER,
        variables: { youtuberId: dummyCreator.youtube._id },
        data: {
          youtuber: dummyCreator.youtube,
        },
      })
    }
  }, [client, dummyIsShown])

  if (loading) {
    return <Loader />
  }
  if (error) {
    return <ErrorCard message="Could not show collab requests" />
  }

  const handleApplicationDecision = (decision: ReviewCollabDecision): void => {
    if (!reviewStatus.loading && !dummyIsShown) {
      reviewCollabApplication({
        variables: { collabId: selectedId, decision },
      })
    }
  }

  return (
    <ContainerBox mt="-2rem">
      <ErrorBoundary message="Could not show collab requests">
        <FullHeightColumns
          leftComponent={() => (
            <>
              {collabsApplied.length === 0 && (
                <InfoCard
                  message={`You don't have any new requests yet. ${
                    dummyIsShown
                      ? 'Here is a dummy collab request, so you can know what to expect'
                      : "Don't worry, they'll come fast!"
                  }`}
                />
              )}
              {collabsApplied
                .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
                .map(showPropositionPreview)}
              {collabsDenied.length > 0 && (
                <Box mb="1rem" px="2rem">
                  <CheckBox
                    text="Show denied requests"
                    isChecked={showRefused}
                    handleClick={toggleShowRefused}
                  />
                </Box>
              )}
              {dummyIsShown && (
                <>
                  <Box mt="2rem" />
                  {showPropositionPreview(dummyCollabRequest)}{' '}
                </>
              )}
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
                  isDummy={dummyIsShown}
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
