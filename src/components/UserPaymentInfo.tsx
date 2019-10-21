import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { Box } from '@rebass/grid'
import { GetUserPaymentInfo } from '../__generated__/GetUserPaymentInfo'
import ErrorCard from './ErrorCard'
import { MainLink } from '../styles/Button'

const GET_USER_PAYMENT_INFO = gql`
  query GetUserPaymentInfo {
    session {
      sessionId
      user {
        _id
        hasPaymentMethod
        creditCardLast4
      }
    }
  }
`

const UserPaymentInfo: React.FC<{}> = () => {
  const { data: { session } = { session: null }, loading, error } = useQuery<
    GetUserPaymentInfo,
    {}
  >(GET_USER_PAYMENT_INFO)

  if (loading) return <p>Loading...</p>
  if (error) return <ErrorCard message="Could not show payment info" />

  const { hasPaymentMethod, creditCardLast4 } = session.user

  // Add payment method
  if (!hasPaymentMethod) {
    return (
      <Box>
        <p>You haven't setup a payment method.</p>
        <MainLink to="/brand/requestPaymentMethod">Add a payment method</MainLink>
      </Box>
    )
  }

  // Replace payment method
  return (
    <Box>
      <p>
        The credit card you have entered ends in {creditCardLast4}. It is only charged when a paid
        collab is completed.
      </p>
      <MainLink to={`/brand/requestPaymentMethod?intent=replace`}>
        Replace my payment method
      </MainLink>
    </Box>
  )
}

export default UserPaymentInfo
