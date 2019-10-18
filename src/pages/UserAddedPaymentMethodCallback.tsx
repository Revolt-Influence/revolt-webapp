import React, { useEffect, useState } from 'react'
import queryString from 'query-string'
import { useLocation } from 'react-router-dom'
import { ContainerBox } from '../styles/grid'
import { Title } from '../styles/Text'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import ErrorCard from '../components/ErrorCard'
import SuccessCard from '../components/SuccessCard'
import Loader from '../components/Loader'
import { MainLink, MainButton } from '../styles/Button'
import {
  SaveUserPaymentMethod,
  SaveUserPaymentMethodVariables,
} from '../__generated__/SaveUserPaymentMethod'

const SAVE_USER_PAYMENT_METHOD = gql`
  mutation SaveUserPaymentMethod($token: String!) {
    saveUserPaymentMethod(token: $token) {
      _id
      hasPaymentMethod
    }
  }
`

const UserAddedPaymentMethodCallback: React.FC<{}> = () => {
  // Prepare save payment method to server mutation
  const [succeeded, setSucceeded] = useState<boolean>(false)
  const [savePaymentMethod, { loading, error }] = useMutation<
    SaveUserPaymentMethod,
    SaveUserPaymentMethodVariables
  >(SAVE_USER_PAYMENT_METHOD, {
    onCompleted: () => setSucceeded(true),
  })

  // Validate token on first load
  const location = useLocation()
  const { session_id: sessionId } = queryString.parse(location.search)
  useEffect(() => {
    // Save payment method to the server using the Stripe session ID
    savePaymentMethod({ variables: { token: sessionId as string } })
  }, [savePaymentMethod, sessionId])

  return (
    <ContainerBox>
      {loading && <Loader fullScreen />}
      {error && (
        <>
          <ErrorCard message="Could not save your payment info" />
          <MainButton onClick={() => window.location.reload()}>Try again</MainButton>
        </>
      )}
      {succeeded && (
        <>
          <SuccessCard message="Your payment method was saved!" />
          <Title>Congratulations!</Title>
          <p>
            You're now ready to accept paid collabs with influencers. You will only be charged once
            a collab you accepted is completed.
          </p>
          <MainLink to="/brand/campaigns">View my collab requests</MainLink>
        </>
      )}
    </ContainerBox>
  )
}

export default UserAddedPaymentMethodCallback
