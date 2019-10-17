import React, { useEffect, useState } from 'react'
import queryString from 'query-string'
import { useLocation } from 'react-router-dom'
import { ContainerBox } from '../styles/grid'
import { Title } from '../styles/Text'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import {
  CreateStripeConnectedAccount,
  CreateStripeConnectedAccountVariables,
} from '../__generated__/CreateStripeConnectedAccount'
import ErrorCard from '../components/ErrorCard'
import SuccessCard from '../components/SuccessCard'
import Loader from '../components/Loader'
import { MainLink, MainButton } from '../styles/Button'

const CREATE_STRIPE_CONNECTED_ACCOUNT = gql`
  mutation CreateStripeConnectedAccount($code: String!) {
    createStripeConnectedAccount(code: $code) {
      _id
    }
  }
`

const StripeConnectCreatorCallback: React.FC<{}> = () => {
  const [succeeded, setSucceeded] = useState<boolean>(false)
  const [createStripeConnectedAccount, { loading, error }] = useMutation<
    CreateStripeConnectedAccount,
    CreateStripeConnectedAccountVariables
  >(CREATE_STRIPE_CONNECTED_ACCOUNT, { onCompleted: () => setSucceeded(true) })

  // Validate token on first load
  const location = useLocation()
  const { code } = queryString.parse(location.search)
  useEffect(() => {
    createStripeConnectedAccount({ variables: { code: code as string } })
  }, [createStripeConnectedAccount, code])

  return (
    <ContainerBox>
      {loading && <Loader fullScreen />}
      {error && (
        <>
          <ErrorCard message="Could not save your bank info" />
          <MainButton onClick={() => window.location.reload()}>Try again</MainButton>
        </>
      )}
      {succeeded && (
        <>
          <SuccessCard message="Your bank details were saved" />
          <Title>Congratulations!</Title>
          <p>You're now ready to get paid for your collabs.</p>
          <MainLink to="/creator/games">Send quotes</MainLink>
        </>
      )}
    </ContainerBox>
  )
}

export default StripeConnectCreatorCallback
