import React from 'react'
import styled from 'styled-components'
import { Flex } from '@rebass/grid'
import { SubTitle } from '../styles/Text'
import { MainLink } from '../styles/Button'
import { shadow } from '../utils/styles'
import { AMBASSADOR_BRAND_REWARD } from './AmbassadorProgramBrands'
import { AMBASSADOR_CREATOR_REWARD } from './AmbassadorProgramCreators'

const Styles = styled(Flex)`
  border-radius: 8px;
  box-shadow: ${shadow._200};
  .description {
    margin-top: 2rem;
    text-align: center;
    margin-bottom: 0.3rem;
  }
`

const AmbassadorProgramCard: React.FunctionComponent<{}> = () => (
  <Styles flexDirection="column" alignItems="center" px="2rem" py={['2rem', '2rem', '3.2rem']}>
    <SubTitle noMargin>Become an ambassador</SubTitle>
    <p className="description">
      Win ${AMBASSADOR_BRAND_REWARD} per brand and ${AMBASSADOR_CREATOR_REWARD} per influencer
      signed up on Revolt
    </p>
    <MainLink to="/creator/ambassador">Become an ambassador</MainLink>
  </Styles>
)

export default AmbassadorProgramCard
