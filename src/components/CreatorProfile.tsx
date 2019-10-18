import { useLazyQuery, useMutation, useQuery } from '@apollo/react-hooks'
import { Flex, Box } from '@rebass/grid'
import { gql } from 'apollo-boost'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { palette } from '../utils/colors'
import { applyCloudinaryTransformations } from '../utils/images'
import { yearToAge } from '../utils/stats'
import { setFont, shadow } from '../utils/styles'
import { GetCreator, GetCreatorVariables } from '../__generated__/GetCreator'
import { GetCollab, GetCollabVariables } from '../__generated__/GetCollab'
import { CollabStatus, ReviewCollabDecision } from '../__generated__/globalTypes'
import {
  ReviewCollabApplication,
  ReviewCollabApplicationVariables,
} from '../__generated__/ReviewCollabApplication'
import AudienceInsights from './AudienceInsights'
import { REVIEW_COLLAB_APPLICATION } from './BrandCollabCard'
import ErrorCard from './ErrorCard'
import YoutubePreview, { YOUTUBER_PROFILE_FRAGMENT } from './YoutubePreview'
import { showLanguage, showReviewCollabDecision } from '../utils/enums'
import { FormSelect } from '../styles/Form'
import { MessageBubble } from '../styles/MessageBubble'
import { MainLink } from '../styles/Button'
import { Price } from '../styles/Price'
import InfoCard from './InfoCard'
import { getCollabRecommendedQuote } from '../utils/collabs'

const PLATFORM_COMMISSION_PERCENTAGE = 20

const checkSource = require('../images/icons/check_white.svg')
const closeSource = require('../images/icons/close_white.svg')

const possibleReviewCollabDecisions = Object.values(ReviewCollabDecision)
const placeholderPicture = 'https://dummyimage.com/40x40/d8dee3/D8DEE3.jpg'

const Styles = styled.div`
  background: ${palette.grey._50};

  .profilePicture {
    width: 10rem;
    height: 10rem;
    object-fit: cover;
    margin-right: 2rem;
    border-radius: 50%;
    box-shadow: ${shadow.inset};
    border: 4px solid ${props => props.theme.primary._300};
  }

  .name {
    ${setFont(600, 'big')}
    margin-bottom: 1rem;
  }

  .label {
    ${setFont(600, 'normal')}
    color: ${palette.grey._600};
  }

  .action {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    border-radius: 8px;
    color: ${palette.grey._50};
    transition: 0.3s all ease-in-out;
    box-shadow: ${shadow._200};
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    &:hover:not(:disabled) {
    box-shadow: ${shadow._400};
    }
    p {
      margin: 0 0.5rem;
    }
    &:not(:first-child) {
      margin-left: 1.5rem;
    }
    img {
      width: 3rem;
      height: auto;
    }
    &.accept {
      background: ${palette.green._500};
      &:hover:not(:disabled) {
        background: ${palette.green._600};
      }
    }
    &.refuse {
      background: ${palette.red._500};
      &:hover:not(:disabled) {
        background: ${palette.red._600};
      }
    }
    &.contact {
      background: ${palette.blue._500};
      &:hover:not(:disabled) {
        background: ${palette.blue._600};
      }
    }
  }
  h2.section {
    margin-top: 2rem;
    margin-bottom: 1rem;
    ${setFont(600, 'big')}
  }
  .mentionedBrand {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    img {
      border-radius: 50%;
      width: 3rem;
      height: 3rem;
      object-fit: contain;
    }
    a {
      margin-right: 2rem;
      margin-left: 0.5rem;
      &:hover {
        text-decoration: underline;
        color: ${palette.blue._700};
      }
    }
    p.category {
      color: ${palette.grey._500};
    }
  }
`

export const CREATOR_PROFILE_FRAGMENT = gql`
  fragment CreatorProfileFragment on Creator {
    _id
    name
    picture
    birthYear
    language
    youtube {
      ...YoutuberProfileFragment
    }
  }
  ${YOUTUBER_PROFILE_FRAGMENT}
`

export const GET_CREATOR = gql`
  query GetCreator($creatorId: String!) {
    creator(id: $creatorId) {
      ...CreatorProfileFragment
      status
    }
  }
  ${CREATOR_PROFILE_FRAGMENT}
`

export const GET_COLLAB = gql`
  query GetCollab($collabId: String!) {
    collab(collabId: $collabId) {
      _id
      status
      message
      updatedAt
      quote
      creator {
        _id
        youtube {
          _id
          estimatedCpm
          medianViews
        }
      }
      conversation {
        _id
      }
    }
  }
`

interface Props {
  creatorId: string
  collabId?: string
  handleAccept?: () => any
  handleRefuse?: () => any
  isDummy?: boolean
}

const CreatorProfile: React.FC<Props> = ({
  creatorId,
  collabId,
  handleAccept,
  handleRefuse,
  isDummy,
}) => {
  const {
    data: { creator } = { creator: null },
    loading: creatorLoading,
    error: creatorError,
  } = useQuery<GetCreator, GetCreatorVariables>(GET_CREATOR, {
    variables: { creatorId },
    fetchPolicy: creatorId.includes('DUMMY') ? 'cache-only' : 'cache-first',
  })

  const [
    fetchCollab,
    { data: { collab } = { collab: null }, loading: collabLoading, error: collabError },
  ] = useLazyQuery<GetCollab, GetCollabVariables>(GET_COLLAB, {
    fetchPolicy: collabId && collabId.includes('DUMMY') ? 'cache-only' : 'cache-first',
  })

  useEffect(() => {
    if (collabId) {
      // Only get collab data if an ID is specified
      fetchCollab({ variables: { collabId } })
    }
  }, [collabId, fetchCollab])

  const [reviewCollabApplication] = useMutation<
    ReviewCollabApplication,
    ReviewCollabApplicationVariables
  >(REVIEW_COLLAB_APPLICATION)

  if (creatorLoading || collabLoading) {
    return <p>Loading profile...</p>
  }
  if (creatorError || collabError) {
    return <ErrorCard message="Could not load profile" noMargin />
  }

  // Destructure creator data
  const { birthYear, name, picture, language } = creator
  const { youtube } = creator
  const hasYoutube = youtube != null

  const getCurrentDecision = (): ReviewCollabDecision => {
    switch (collab.status) {
      case CollabStatus.ACCEPTED:
        return ReviewCollabDecision.ACCEPT
      case CollabStatus.DENIED:
        return ReviewCollabDecision.DENY
      case CollabStatus.SENT:
        return ReviewCollabDecision.MARK_AS_SENT
      default:
        return null
    }
  }

  const showContactButton = () =>
    collab ? (
      <MainLink
        disabled={!!isDummy}
        to={isDummy ? '#' : `/brand/messages/${collab.conversation && collab.conversation._id}`}
        type="button"
        noMargin
      >
        Send a message
      </MainLink>
    ) : null

  const getRecommendedQuote = (): number => {
    const collabHasYoutube = !!collab.creator.youtube
    if (collabHasYoutube) {
      const { estimatedCpm, medianViews } = collab.creator.youtube
      return getCollabRecommendedQuote(estimatedCpm, medianViews)
    }
    return 0
  }

  return (
    <Styles>
      <Flex flexDirection="row" alignItems="center">
        <img
          src={applyCloudinaryTransformations(picture, { width: 160 }) || placeholderPicture}
          alt={name}
          className="profilePicture"
        />
        <div>
          <h1 className="name">{name}</h1>
          <p>
            {yearToAge(birthYear)} years old, speaks {showLanguage(language)}
          </p>
        </div>
      </Flex>
      {collab && (
        <Box style={{ display: 'inline-block' }}>
          <Box mt="2rem">Quote (in US Dollars)</Box>
          <Flex flexDirection="row" alignItems="center">
            <Price>${collab.quote}</Price>
            <Box ml="1rem">
              + ${(collab.quote * PLATFORM_COMMISSION_PERCENTAGE) / 100} platform fees
            </Box>
          </Flex>
          <InfoCard
            message={`Based on the influencer's stats, we recommend that you pay him $${getRecommendedQuote()}. You can negotiate by sending him a message.`}
          />
          <Box mt="1rem" mb="0.5rem">
            Message
          </Box>
          <MessageBubble isFromMe={false}>{collab.message}</MessageBubble>
        </Box>
      )}
      <Flex flexDirection="row" justifyContent="space-between" mt="2rem" alignItems="baseline">
        {handleAccept != null && handleRefuse != null ? (
          <>
            <Flex flexDirection="row" justifyContent="space-between">
              {collab && showContactButton()}
              <button
                disabled={!!isDummy}
                className="action accept"
                type="button"
                onClick={handleAccept}
              >
                {collab == null ? (
                  <p>Accept</p>
                ) : (
                  <p>
                    Accept and pay $
                    {collab.quote + (collab.quote * PLATFORM_COMMISSION_PERCENTAGE) / 100}
                  </p>
                )}
                <img src={checkSource} alt="accept" />
              </button>
              <button
                disabled={!!isDummy}
                className="action refuse"
                type="button"
                onClick={handleRefuse}
              >
                <p>Deny</p>
                <img src={closeSource} alt="deny" />
              </button>
            </Flex>
          </>
        ) : (
          collabId &&
          collab && (
            <>
              {showContactButton()}
              {collab.status !== CollabStatus.DONE && (
                <FormSelect
                  value={getCurrentDecision()}
                  disabled={!!isDummy}
                  onChange={e => {
                    reviewCollabApplication({
                      variables: {
                        collabId: collabId,
                        decision: e.target.value as ReviewCollabDecision,
                      },
                    })
                  }}
                >
                  {possibleReviewCollabDecisions.map(_possibleDecision => (
                    <option value={_possibleDecision} key={_possibleDecision}>
                      {showReviewCollabDecision(_possibleDecision)}
                    </option>
                  ))}
                </FormSelect>
              )}
            </>
          )
        )}
      </Flex>
      {/* Networks preview */}
      {youtube && <h2 className="section">Platforms</h2>}
      <section>{hasYoutube && <YoutubePreview youtuberId={youtube._id} />}</section>
      {/* Youtube analytics */}
      {youtube && (
        <section>
          {youtube.audience && (
            <>
              {/* Gender chart */}
              <h2 className="section">YouTube audience</h2>
              <AudienceInsights youtuberAudience={youtube.audience} />
            </>
          )}
        </section>
      )}
    </Styles>
  )
}

export default CreatorProfile
