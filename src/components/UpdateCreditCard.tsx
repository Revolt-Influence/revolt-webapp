import React, { useState } from 'react'
import { CardElement, ReactStripeElements, injectStripe } from 'react-stripe-elements'
import { CreditCardWrapper } from '../styles/CreditCardWrapper'
import { fontStack } from '../utils/styles'
import { FormInputLabel } from '../styles/Form'
import { MainButton } from '../styles/Button'
import { palette } from '../utils/colors'
import { Row } from '../utils/grid'
import SuccessCard from './SuccessCard'
import ErrorCard from './ErrorCard'
import gql from 'graphql-tag'
import { useMutation, useQuery } from '@apollo/react-hooks'
import {
  UpdateCreditCardMutationVariables,
  UpdateCreditCardMutation,
} from '../__generated__/UpdateCreditCardMutation'
import { GetSessionUserName } from '../__generated__/GetSessionUserName'
import Loader from './Loader'

const UPDATE_CREDIT_CARD_MUTATION = gql`
  mutation UpdateCreditCardMutation($newPaymentToken: String!) {
    updateCreditCard(newPaymentToken: $newPaymentToken) {
      _id
      creditCardLast4
      plan
    }
  }
`

const GET_SESSION_USER_NAME = gql`
  query GetSessionUserName {
    session {
      user {
        firstName
        lastName
      }
    }
  }
`

const UpdateCreditCard: React.FC<ReactStripeElements.InjectedStripeProps> = ({ stripe }) => {
  // Form state
  const [cardElementIsFocused, setCardElementIsFocused] = useState(false)
  const [cardElementHasError, setCardElementHasError] = useState(false)
  const [cardIsComplete, setCardIsComplete] = useState(false)
  const [isCreatingToken, setIsCreatingToken] = useState(false)
  const [succeeded, setSucceeded] = useState<boolean>(false)

  // Server requests
  const {
    data: { session },
    ...getSessionStatus
  } = useQuery<GetSessionUserName>(GET_SESSION_USER_NAME)
  const [updateCreditCard, { loading, error }] = useMutation<
    UpdateCreditCardMutation,
    UpdateCreditCardMutationVariables
  >(UPDATE_CREDIT_CARD_MUTATION, { onCompleted: () => setSucceeded(true) })

  if (getSessionStatus.loading) {
    return <Loader />
  }
  if (getSessionStatus.error) {
    return <ErrorCard />
  }

  const handleUpdateCreditCard = async () => {
    setIsCreatingToken(true)
    // Prepare credit card on Stripe
    const { firstName, lastName } = session.user
    const { token } = await stripe.createToken({ name: `${firstName} ${lastName}` })
    // Save new card on server
    updateCreditCard({ variables: { newPaymentToken: token.id } })
    setIsCreatingToken(false)
  }

  return (
    <>
      {/* Credit card form */}
      <FormInputLabel>Carte de crédit</FormInputLabel>
      <CreditCardWrapper isFocused={cardElementIsFocused} hasError={cardElementHasError}>
        <CardElement
          onFocus={() => setCardElementIsFocused(true)}
          onBlur={() => setCardElementIsFocused(false)}
          onChange={e => {
            setCardElementHasError(e.error != null)
            setCardIsComplete(e.complete)
          }}
          style={{
            base: {
              fontFamily: fontStack,
              fontSize: '16px',
              color: palette.grey._900,
            },
          }}
        />
      </CreditCardWrapper>
      {/* Success card */}
      {succeeded ? <SuccessCard message="Votre carte a bien été enregistrée" /> : null}
      {error ? <ErrorCard message="Votre carte n'a pas pu être enregistrée" /> : null}
      {/* Submit button */}
      <Row verticalAlign="flex-end">
        <MainButton
          display="inline"
          onClick={handleUpdateCreditCard}
          disabled={!cardIsComplete || loading || isCreatingToken}
        >
          {loading || isCreatingToken ? 'Changement de carte...' : 'Changer de carte'}
        </MainButton>
      </Row>
    </>
  )
}

export default injectStripe(UpdateCreditCard)
