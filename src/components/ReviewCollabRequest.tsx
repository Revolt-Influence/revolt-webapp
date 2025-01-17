import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Box, Flex } from '@rebass/grid'
import { useHistory } from 'react-router-dom'
import { GetCollab, GetCollabVariables } from '../__generated__/GetCollab'
import ErrorCard from './ErrorCard'
import { Price } from '../styles/Price'
import { MessageBubble } from '../styles/MessageBubble'
import gql from 'graphql-tag'
import { getCollabRecommendedQuote } from '../utils/collabs'
import { MainLink } from '../styles/Button'
import { CollabStatus, ReviewCollabDecision } from '../__generated__/globalTypes'
import { FormSelect } from '../styles/Form'
import {
  ReviewCollabApplication,
  ReviewCollabApplicationVariables,
} from '../__generated__/ReviewCollabApplication'
import styled from 'styled-components'
import { palette } from '../utils/colors'
import { shadow, setFont } from '../utils/styles'
import { showReviewCollabDecision } from '../utils/enums'
import { GetSession } from '../__generated__/GetSession'
import { GET_SESSION } from './Session'
import { LabelText } from '../styles/Text'
import WarningCard from './WarningCard'

const checkSource = require('../images/icons/check_white.svg')
const closeSource = require('../images/icons/close_white.svg')

const possibleReviewCollabDecisions = Object.values(ReviewCollabDecision)

const Styles = styled(Box)`
  .action {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    border-radius: 8px;
    color: ${palette.grey._50};
    transition: 0.3s all ease-in-out;
    ${setFont(600, 'normal')}
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
  collabId: string
}

const ReviewCollabRequest: React.FC<Props> = ({ collabId }) => {
  const isDummy = collabId.includes('DUMMY')

  // Get collab details
  const {
    data: { collab } = { collab: null },
    loading: collabLoading,
    error: collabError,
  } = useQuery<GetCollab, GetCollabVariables>(GET_COLLAB, {
    variables: { collabId },
    fetchPolicy: isDummy ? 'cache-only' : 'cache-first',
  })

  // Prepare decision request
  const [reviewCollabApplication, reviewStatus] = useMutation<
    ReviewCollabApplication,
    ReviewCollabApplicationVariables
  >(REVIEW_COLLAB_APPLICATION)

  // May need for redirection to payment page
  const history = useHistory()

  // Get session to check if user has a payment method
  const {
    data: { session },
    loading: sessionLoading,
    error: sessionError,
  } = useQuery<GetSession>(GET_SESSION)

  if (collabLoading || sessionLoading) {
    return <p>Loading...</p>
  }
  if (collabError || sessionError) {
    return <ErrorCard message="Could not load collab request" />
  }

  const getRecommendedQuote = (): number => {
    const collabHasYoutube = !!collab.creator.youtube
    if (collabHasYoutube) {
      const { estimatedCpm, medianViews } = collab.creator.youtube
      return getCollabRecommendedQuote(estimatedCpm, medianViews)
    }
    return 0
  }
  const recommendedQuote = getRecommendedQuote()

  const showContactButton = () =>
    collab ? (
      <MainLink
        disabled={isDummy}
        to={isDummy ? '#' : `/brand/messages/${collab.conversation && collab.conversation._id}`}
        type="button"
        noMargin
      >
        Send a message
      </MainLink>
    ) : null

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

  const handleApplicationDecision = (decision: ReviewCollabDecision): void => {
    if (
      decision === ReviewCollabDecision.ACCEPT &&
      !session.user.hasPaymentMethod &&
      collab.quote > 0
    ) {
      // Redirect to payment methods page
      history.push(`/brand/requestPaymentMethod?intent="collab"`)
    } else if (!reviewStatus.loading && !isDummy) {
      reviewCollabApplication({
        variables: { collabId, decision },
      })
    }
  }

  return (
    <Styles>
      {/* Show collab request details */}
      <Box style={{ display: 'inline-block' }}>
        <LabelText withMargin>Influencer's quote (in USD)</LabelText>
        <Flex flexDirection="row" alignItems="center">
          <Price>${collab.quote}</Price>
        </Flex>
        <LabelText withMargin>Recommended price</LabelText>
        <Flex flexDirection="row">
          <Price style={{ alignSelf: 'flex-start' }}>${recommendedQuote}</Price>
          <Box ml="1rem">
            The recommended price is obtained using the influencer's expected views, average
            engagement, audience demographics and more.
          </Box>
        </Flex>
        {collab.quote > recommendedQuote &&
          [CollabStatus.REQUEST, CollabStatus.DENIED].includes(collab.status) && (
            <WarningCard
              message={`The influencer's quote is $${collab.quote -
                recommendedQuote} higher than our recommended price. You can negotiate by sending him a message`}
            />
          )}
        <LabelText withMargin>Message</LabelText>
        <MessageBubble isFromMe={false}>{collab.message}</MessageBubble>
      </Box>
      {/* Review collab request (accept, deny or negotiate) */}
      <Flex flexDirection="row" justifyContent="space-between" mt="2rem" alignItems="baseline">
        {[CollabStatus.REQUEST, CollabStatus.DENIED].includes(collab.status) ? (
          <Flex flexDirection="row" justifyContent="space-between">
            {collab && showContactButton()}
            <button
              disabled={!!isDummy}
              className="action accept"
              type="button"
              onClick={() => handleApplicationDecision(ReviewCollabDecision.ACCEPT)}
            >
              {collab.quote > 0 ? (
                // Prevent floating point bug
                <p>Accept and pay ${Math.round(collab.quote * 100) / 100}</p>
              ) : (
                <p>Accept for free</p>
              )}
              <img src={checkSource} alt="accept" />
            </button>
            <button
              disabled={!!isDummy}
              className="action refuse"
              type="button"
              onClick={() => handleApplicationDecision(ReviewCollabDecision.DENY)}
            >
              <p>Deny</p>
              <img src={closeSource} alt="deny" />
            </button>
          </Flex>
        ) : (
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
        )}
      </Flex>
    </Styles>
  )
}

export default ReviewCollabRequest
