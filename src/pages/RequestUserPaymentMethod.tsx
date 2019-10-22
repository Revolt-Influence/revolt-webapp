import React, { useState } from 'react'
import queryString from 'query-string'
import { useLocation } from 'react-router-dom'
import { ContainerBox } from '../styles/grid'
import PageHeader from '../components/PageHeader'
import WarningCard from '../components/WarningCard'
import { MainButton } from '../styles/Button'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { Box } from '@rebass/grid'
import { CreateStripeSession } from '../__generated__/CreateStripeSession'
import ErrorCard from '../components/ErrorCard'
import { LabelText } from '../styles/Text'
import OrderedList from '../components/OrderedList'
import InfoCard from '../components/InfoCard'

const stripe = Stripe(process.env.REACT_APP_STRIPE_API_KEY)

const CREATE_STRIPE_SESSION = gql`
  mutation CreateStripeSession {
    createStripeSession
  }
`

const steps: string[] = [
  'Add a payment method. We partner with Stripe to securely store your payment info',
  'Accept influencer quotes on your campaign dashboard',
  'You will only be charged once the influencer publishes his review',
]

const RequestUserPaymentMethod: React.FC<{}> = () => {
  // Prepare mutations
  const [
    createStripeSession,
    { loading: createSessionLoading, error: createSessionError },
  ] = useMutation<CreateStripeSession, {}>(CREATE_STRIPE_SESSION)

  // Event handlers
  const [error, setError] = useState<string>(null)
  const handleAddPaymentMethod = async () => {
    const {
      data: { createStripeSession: stripeSessionId },
    } = await createStripeSession()
    const { error: stripeError } = await stripe.redirectToCheckout({
      sessionId: stripeSessionId,
    })
    setError(stripeError.message)
  }

  // Get optional intent from URL param
  const location = useLocation()
  const parsedQuery = queryString.parse(location.search)
  const { intent } = parsedQuery

  return (
    <ContainerBox>
      <PageHeader title="Start accepting paid collabs" />
      {intent === 'collab' && (
        <WarningCard message="You need to add a payment method to accept a paid collab" />
      )}
      {intent === 'replace' && (
        <InfoCard message="Adding a payment method will replace your current one" />
      )}
      <Box mt="2rem">
        <p>Paid collabs allow you work with quality influencers and reach a bigger audience.</p>
        <LabelText withMargin>Get started</LabelText>
        <OrderedList items={steps} />
      </Box>
      {createSessionError && <ErrorCard message="We could not add your payment method" />}
      {error && <ErrorCard message={error} />}
      <MainButton onClick={handleAddPaymentMethod} disabled={createSessionLoading}>
        Add a payment method
      </MainButton>
    </ContainerBox>
  )
}

export default RequestUserPaymentMethod
