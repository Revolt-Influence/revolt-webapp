import React from 'react'
import styled from 'styled-components'
import { StripeProvider, Elements } from 'react-stripe-elements'
import UpgradePlanForm from './UpgradePlanForm'
import { useStripe } from '../utils/hooks'

const ChangePlanWrapper = styled.div`
  width: 100%;
`

const Details = styled.p`
  line-height: 25px;
  margin-bottom: 20px;
`

const ChangePlan: React.FC<{}> = () => {
  // Load stripe
  const stripe = useStripe()

  return (
    <ChangePlanWrapper>
      <StripeProvider stripe={stripe}>
        <>
          <Details>
            Une fois Premium, vous serez débités de 179€ au début de chaque mois. Vous pouvez
            annuler votre abonnement à tout moment pour revenir à l'offre Free.
          </Details>
          <Elements>
            <UpgradePlanForm />
          </Elements>
        </>
      </StripeProvider>
    </ChangePlanWrapper>
  )
}

export default ChangePlan
