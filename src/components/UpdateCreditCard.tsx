import React from 'react'
import { CardElement, ReactStripeElements, injectStripe } from 'react-stripe-elements'
import { useDispatch, useSelector } from 'react-redux'
import { CreditCardWrapper } from '../styles/CreditCardWrapper'
import { fontStack } from '../utils/styles'
import { FormInputLabel } from '../styles/Form'
import { MainButton } from '../styles/Button'
import { palette } from '../utils/colors'
import { Row } from '../utils/grid'
import { IRequestStatus } from '../utils/request'
import SuccessCard from './SuccessCard'
import ErrorCard from './ErrorCard'
import IState from '../models/State'
import { IUser } from '../models/User'
import { updateCreditCard } from '../actions/session'

const UpdateCreditCard: React.FC<ReactStripeElements.InjectedStripeProps> = ({ stripe }) => {
  // Form state
  const [cardElementIsFocused, setCardElementIsFocused] = React.useState(false)
  const [cardElementHasError, setCardElementHasError] = React.useState(false)
  const [cardIsComplete, setCardIsComplete] = React.useState(false)
  const [isCreatingToken, setIsCreatingToken] = React.useState(false)

  // Redux stuff
  const dispatch = useDispatch()
  const { isLoading, hasSucceeded, hasFailed } = useSelector<IState, IRequestStatus>(
    state => state.session.requests.updateCreditCard
  )
  const { firstName, lastName } = useSelector<IState, IUser>(state => state.session.user)

  const handleUpdateCreditCard = async () => {
    setIsCreatingToken(true)
    // Submit payment
    const { token } = await stripe.createToken({ name: `${firstName} ${lastName}` })
    dispatch(updateCreditCard({ token: token.id }))
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
      {hasSucceeded ? <SuccessCard message="Votre carte a bien été enregistrée" /> : null}
      {hasFailed ? <ErrorCard message="Votre carte n'a pas pu être enregistrée" /> : null}
      {/* Submit button */}
      <Row verticalAlign="flex-end">
        <MainButton
          display="inline"
          onClick={handleUpdateCreditCard}
          disabled={!cardIsComplete || isLoading || isCreatingToken}
        >
          {isLoading || isCreatingToken ? 'Changement de carte...' : 'Changer de carte'}
        </MainButton>
      </Row>
    </>
  )
}

export default injectStripe(UpdateCreditCard)
