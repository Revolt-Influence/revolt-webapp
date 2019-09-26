import React from 'react'
import { StripeProvider, Elements } from 'react-stripe-elements'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import UpdateCreditCard from './UpdateCreditCard'
import { IRequestStatus } from '../utils/request'
import { Divider } from '../utils/styles'
import { MainButton } from '../styles/Button'
import SuccessCard from './SuccessCard'
import ErrorCard from './ErrorCard'
import IState from '../models/State'
import { cancelPremium } from '../actions/session'
import { useStripe } from '../utils/hooks'

const ManagePlanWrapper = styled.div`
  width: 100%;
`

const Details = styled.p`
  line-height: 25px;
  margin-bottom: 20px;
`

const OtherDetails = styled.p`
  line-height: 25px;
`

const ManagePlan: React.FC<{}> = () => {
  // Redux
  const dispatch = useDispatch()
  const last4 = useSelector<IState, string>(state => state.session.user.creditCardLast4)
  const cancelPremiumStatus = useSelector<IState, IRequestStatus>(
    state => state.session.requests.cancelPremium
  )

  // Load Stripe async
  const stripe = useStripe()

  return (
    <ManagePlanWrapper>
      <StripeProvider stripe={stripe}>
        <>
          <Details>
            Votre carte actuelle finit en {last4}. Vous pouvez la remplacer par une nouvelle.
          </Details>
          <Elements>
            <UpdateCreditCard stripe={stripe} />
          </Elements>
          <Divider />
          <OtherDetails>
            Vous pouvez aussi annuler votre abonnement. Vous perdrez immédiatement l'accès à toutes
            les fonctionnalités Premium.
          </OtherDetails>
          {cancelPremiumStatus.hasSucceeded ? (
            <SuccessCard message="Votre abonnement a bien été annulé" />
          ) : null}
          {cancelPremiumStatus.hasFailed ? (
            <ErrorCard message="Votre abonnement n'a pas pu être annulé" />
          ) : null}
          <MainButton
            nature="danger"
            display="inline"
            disabled={cancelPremiumStatus.isLoading}
            onClick={() => dispatch(cancelPremium())}
            inverted
          >
            {cancelPremiumStatus.isLoading ? 'Annulation...' : 'Annuler mon abonnement'}
          </MainButton>
        </>
      </StripeProvider>
    </ManagePlanWrapper>
  )
}

export default ManagePlan
