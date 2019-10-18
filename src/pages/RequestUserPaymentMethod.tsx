import React, { useState } from 'react'
import { ContainerBox } from '../styles/grid'
import PageHeader from '../components/PageHeader'
import WarningCard from '../components/WarningCard'
import { MainButton } from '../styles/Button'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { Box } from '@rebass/grid'
import { CreateStripeSession } from '../__generated__/CreateStripeSession'
import ErrorCard from '../components/ErrorCard'

const stripe = Stripe(process.env.REACT_APP_STRIPE_API_KEY)

const CREATE_STRIPE_SESSION = gql`
  mutation CreateStripeSession {
    createStripeSession
  }
`

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

  return (
    <ContainerBox>
      <PageHeader title="Add a payment method" />
      <WarningCard message="You need to add a payment method to accept a paid collab" />
      <Box mt="2rem">
        <p>Paid collabs allow you work with quality influencers and reach a bigger audience.</p>
        <p>
          We use Stripe to securely manage payments. You will ony be charged once the collab is
          completed.
        </p>
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
