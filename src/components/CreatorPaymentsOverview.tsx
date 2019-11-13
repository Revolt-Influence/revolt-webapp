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
        email
        youtube {
          _id
          url
        }
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
  if (error) return <ErrorCard noMargin message="Could not load the payment data" />

  const { email, youtube } = session.creator
  const getStripeAuthLink = () =>
    `https://dashboard.stripe.com/express/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_STRIPE_CLIENT_ID}&stripe_user[email]=${email}&stripe_user[url]=${youtube.url}&stripe_user[business_type]=individual`

  const { hasConnectedStripe, stripeLoginLink } = session.creator

  if (!hasConnectedStripe) {
    return (
      <Box>
        <p>
          You haven't entered your bank details yet, so you can't receive money yet. We partner with
          Stripe to securely store your bank details. You will never be charged.
        </p>
        <MainLinkExternal href={getStripeAuthLink()}>Start receiving payments</MainLinkExternal>
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
