import React from 'react'
import { Box } from '@rebass/grid'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { MainLinkExternal } from '../styles/Button'
import { GetCreatorStripeLogin } from '../__generated__/GetCreatorStripeLogin'
import ErrorCard from './ErrorCard'

const GET_CREATOR_STRIPE_LOGIN = gql`
  query GetCreatorStripeLogin {
    session {
      creator {
        _id
        stripeLoginLink
        hasConnectedStripe
      }
    }
  }
`

const CreatorPaymentsOverview: React.FC<{}> = () => {
  const { data: { session } = { session: null }, loading, error } = useQuery<
    GetCreatorStripeLogin,
    {}
  >(GET_CREATOR_STRIPE_LOGIN)

  if (loading) return <p>Loading...</p>
  if (error) return <ErrorCard message="Could not load the payment data" />

  const { hasConnectedStripe, stripeLoginLink } = session.creator

  if (!hasConnectedStripe) {
    return (
      <Box>
        <p>
          You haven't entered your bank details yet. Send a quote for a paid collab to start
          accepting payments.
        </p>
      </Box>
    )
  }

  return (
    <Box>
      <p>
        You have entered your bank details on Stripe. To change them, view your current balance, or
        your payments history, you can check your Stripe dashboard. Note that while Revolt collabs
        are handled in US Dollars, your payments are converted to your bank's currency.
      </p>
      <MainLinkExternal href={stripeLoginLink} target="_blank" title="Stripe dashboard">
        View my dashboard
      </MainLinkExternal>
    </Box>
  )
}

export default CreatorPaymentsOverview
