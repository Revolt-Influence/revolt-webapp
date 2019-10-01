import React from 'react'
import styled from 'styled-components'
import { Box } from '@rebass/grid'
import { palette } from '../utils/colors'
import { setFont, Divider } from '../utils/styles'
import FeaturesList from './FeaturesList'
import { MainLink } from '../styles/Button'
import ManagePlan from './ManagePlan'
import { capitalizeFirstLetter } from '../utils/strings'
import { Plan } from '../__generated__/globalTypes'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { GetUserPlan } from '../__generated__/GetUserPlan'
import Loader from './Loader'
import ErrorCard from './ErrorCard'

const CurrentPlan = styled.span<{ value: Plan }>`
  display: inline-block;
  ${setFont(600, 'normal')}
  color: ${props => {
    switch (props.value) {
      case Plan.FREE:
        return palette.blue._600
      case Plan.PREMIUM:
        return palette.green._500
      default:
        return palette.blue._600
    }
  }};
  margin-top: 20px;
`

export const GET_USER_PLAN = gql`
  query GetUserPlan {
    session {
      user {
        plan
        creditCardLast4
      }
    }
  }
`

const UserPlan: React.FC<{}> = () => {
  const {
    data: { session },
    loading,
    error,
  } = useQuery<GetUserPlan, {}>(GET_USER_PLAN)
  if (loading) {
    return <Loader />
  }
  if (error) {
    return <ErrorCard />
  }
  const { plan } = session.user
  return (
    <Box>
      <p>
        Vous êtes abonné au plan{' '}
        <CurrentPlan value={plan}>{capitalizeFirstLetter(plan)}</CurrentPlan>.
      </p>
      <Divider />
      {plan === Plan.FREE ? (
        <>
          <FeaturesList plan="premium" />
          <MainLink to="/brand/upgrade" display="inline">
            Passer au Premium
          </MainLink>
        </>
      ) : null}
      {plan === Plan.PREMIUM ? <ManagePlan /> : null}
    </Box>
  )
}

export default UserPlan
