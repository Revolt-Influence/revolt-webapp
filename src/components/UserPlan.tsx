import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { Box } from '@rebass/grid'
import IState from '../models/State'
import { palette } from '../utils/colors'
import { setFont, Divider } from '../utils/styles'
import { Plan } from '../models/Session'
import FeaturesList from './FeaturesList'
import { MainLink } from '../styles/Button'
import ManagePlan from './ManagePlan'
import { capitalizeFirstLetter } from '../utils/strings'

const CurrentPlan = styled.span<{ value: Plan }>`
  display: inline-block;
  ${setFont(600, 'normal')}
  color: ${props => {
    switch (props.value) {
      case 'free':
        return palette.blue._600
      case 'premium':
        return palette.green._500
      case 'admin':
        return palette.orange._500
      default:
        return palette.blue._600
    }
  }};
  margin-top: 20px;
`

const UserPlan: React.FC<{}> = () => {
  const plan = useSelector<IState, Plan>(state => state.session.user.plan)
  return (
    <Box>
      <p>
        Vous êtes abonné au plan{' '}
        <CurrentPlan value={plan}>{capitalizeFirstLetter(plan)}</CurrentPlan>.
      </p>
      <Divider />
      {plan === 'free' ? (
        <>
          <FeaturesList plan="premium" />
          <MainLink to="/brand/upgrade" display="inline">
            Passer au Premium
          </MainLink>
        </>
      ) : null}
      {plan === 'premium' ? <ManagePlan /> : null}
    </Box>
  )
}

export default UserPlan
