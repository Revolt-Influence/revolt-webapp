import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { MainButtonSubmit, MainLinkExternal } from '../styles/Button'
import { FormInputLabel, FormTextarea, FormInput } from '../styles/Form'
import { ApplyToCampaign, ApplyToCampaignVariables } from '../__generated__/ApplyToCampaign'
import CheckBox from './CheckBox'
import ErrorCard from './ErrorCard'
import SplitView from './SplitView'
import SuccessCard from './SuccessCard'
import { CREATOR_COLLAB_FRAGMENT } from './CreatorCollabCard'
import { GET_CREATOR_COLLABS } from '../pages/CollabsList'
import InfoCard from './InfoCard'
import { Box } from '@rebass/grid'
import { GetCreatorExpectedViews } from '../__generated__/GetCreatorExpectedViews'
import { getCollabRecommendedQuote } from '../utils/collabs'

const APPLY_TO_CAMPAIGN = gql`
  mutation ApplyToCampaign($message: String!, $campaignId: String!, $quote: Float!) {
    applyToCampaign(message: $message, campaignId: $campaignId, quote: $quote) {
      # Get data of created collab
      ...CreatorCollabFragment
    }
  }
  ${CREATOR_COLLAB_FRAGMENT}
`

const GET_CREATOR_EXPECTED_VIEWS = gql`
  query GetCreatorExpectedViews {
    session {
      creator {
        _id
        email
        hasConnectedStripe
        youtube {
          _id
          medianViews
          estimatedCpm
          url
        }
      }
    }
  }
`

interface Props {
  brand: string
  campaignId: string
}

const CreatorCollabRequestForm: React.FC<Props> = ({ brand, campaignId }) => {
  const [message, setMessage] = useState<string>('')
  const [acceptsTerms, setAcceptsTerms] = useState<boolean>(false)
  const [quote, setQuote] = useState<number>(0)
  const [recommendedQuote, setRecommendedQuote] = useState<number>(0)

  const { data: { session } = { session: null }, loading: sessionLoading } = useQuery<
    GetCreatorExpectedViews
  >(GET_CREATOR_EXPECTED_VIEWS, {
    onCompleted: _session => {
      const { medianViews, estimatedCpm } = _session.session.creator.youtube
      const recommended = getCollabRecommendedQuote(estimatedCpm, medianViews)
      setRecommendedQuote(recommended)
      setQuote(recommended)
    },
  })

  const [
    applyToCampaign,
    {
      loading: applyLoading,
      error: applyError,
      data: { applyToCampaign: createdCollab } = { applyToCampaign: null },
    },
  ] = useMutation<ApplyToCampaign, ApplyToCampaignVariables>(APPLY_TO_CAMPAIGN, {
    refetchQueries: [{ query: GET_CREATOR_COLLABS }],
  })

  const checkIfAllowSubmit = () => {
    if (!acceptsTerms || message.length === 0) {
      return false
    }
    return true
  }
  const allowSubmit = checkIfAllowSubmit()

  const handleSubmit = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault()
    applyToCampaign({ variables: { campaignId, message, quote } })
  }

  if (sessionLoading) {
    return <p>Loading...</p>
  }

  const { hasConnectedStripe, email, youtube } = session.creator

  const getStripeAuthLink = () => `https://connect.stripe.com/express/oauth/authorize?client_id=${process.env.REACT_APP_STRIPE_CLIENT_ID}&state={STATE_VALUE}&stripe_user[email]=${email}&stripe_user[url]=${youtube.url}
    `

  return (
    <SplitView title="Apply" ratio={4 / 12} noBorder>
      <FormInputLabel>
        Motivation message for {brand}
        <FormTextarea
          hasLabel
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Requests with a message a more likely to be accepted"
        />
      </FormInputLabel>
      {hasConnectedStripe ? (
        <>
          <InfoCard
            message={`Based on your channel's stats, we recommend that you ask for $${recommendedQuote} for this collab`}
          />
          <Box width={[1, 1, 8 / 12]}>
            <FormInputLabel withMargin>
              Your quote, in US Dollars
              <FormInput
                hasLabel
                value={quote}
                type="number"
                min="0"
                onChange={e => {
                  if (e.target.value === '') {
                    setQuote(null)
                  }
                  if (parseFloat(e.target.value) > 0) {
                    setQuote(parseFloat(e.target.value))
                  }
                }}
                placeholder="How much the brand will pay you"
              />
            </FormInputLabel>
          </Box>
        </>
      ) : (
        <Box my="2rem">
          <p>
            To start sending quotes for paid collabs and accepting payments, you need to connect
            your bank details.
          </p>
          <MainLinkExternal inverted href={getStripeAuthLink()}>
            Start accepting payments
          </MainLinkExternal>
        </Box>
      )}
      <CheckBox
        handleClick={() => setAcceptsTerms(!acceptsTerms)}
        text={`By checking this box, you are contractually committing to publishing a review of the game if ${brand} accepts the collab`}
        isChecked={acceptsTerms}
      />
      {applyError && <ErrorCard message="Could not apply to the collab" />}
      {createdCollab && (
        <SuccessCard
          message={`Your collab request was saved. ${brand} will contact you if you are selected`}
        />
      )}
      <MainButtonSubmit
        type="submit"
        value={applyLoading ? 'Applying..' : 'Apply'}
        disabled={!allowSubmit || applyLoading || !!createdCollab || (quote == null && quote !== 0)}
        onClick={handleSubmit}
      />
    </SplitView>
  )
}

export default CreatorCollabRequestForm
