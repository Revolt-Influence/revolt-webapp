import React, { useState } from 'react'
import { StripeProvider, Elements } from 'react-stripe-elements'
import UpdateCreditCard from './UpdateCreditCard'
import { Divider } from '../utils/styles'
import { MainButton } from '../styles/Button'
import SuccessCard from './SuccessCard'
import ErrorCard from './ErrorCard'
import { useStripe } from '../utils/hooks'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import Loader from './Loader'
import { DowngradeUser } from '../__generated__/DowngradeUser'
import { GetUserPlan } from '../__generated__/GetUserPlan'
import { GET_USER_PLAN } from './UserPlan'

const DOWNGRADE_USER = gql`
  mutation DowngradeUser {
    downgradeUser {
      plan
      creditCardLast4
    }
  }
`

const ManagePlan: React.FC<{}> = () => {
  const { data: { session } = { session: null }, ...getUserPlanStatus } = useQuery<GetUserPlan, {}>(
    GET_USER_PLAN
  )
  const [downgradeSuccess, setDowngradeSuccess] = useState<boolean>(false)
  const [downgradeUser, downgradeUserStatus] = useMutation<DowngradeUser, {}>(DOWNGRADE_USER, {
    onCompleted: () => setDowngradeSuccess(true),
  })

  // Load Stripe async
  const stripe = useStripe()

  if (getUserPlanStatus.loading) {
    return <Loader />
  }
  if (getUserPlanStatus.error) {
    return <ErrorCard />
  }

  return (
    <div>
      <StripeProvider stripe={stripe}>
        <>
          <p>
            Votre carte actuelle finit en {session.user.creditCardLast4}. Vous pouvez la remplacer
            par une nouvelle.
          </p>
          <Elements>
            <UpdateCreditCard stripe={stripe} />
          </Elements>
          <Divider />
          <p>
            Vous pouvez aussi annuler votre abonnement. Vous perdrez immédiatement l'accès à toutes
            les fonctionnalités Premium.
          </p>
          {downgradeSuccess ? <SuccessCard message="Votre abonnement a bien été annulé" /> : null}
          {downgradeUserStatus.error ? (
            <ErrorCard message="Votre abonnement n'a pas pu être annulé" />
          ) : null}
          <MainButton
            nature="danger"
            display="inline"
            disabled={downgradeUserStatus.loading}
            onClick={() => downgradeUser()}
            inverted
          >
            {downgradeUserStatus.loading ? 'Annulation...' : 'Annuler mon abonnement'}
          </MainButton>
        </>
      </StripeProvider>
    </div>
  )
}

export default ManagePlan
