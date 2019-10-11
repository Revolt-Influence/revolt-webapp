import React from 'react'
import styled from 'styled-components'
import { Flex } from '@rebass/grid'
import { SubTitle } from '../styles/Text'
import { MainLink } from '../styles/Button'
import { shadow } from '../utils/styles'

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
  <Styles flexDirection="column" alignItems="center" py={['2rem', '2rem', '3.1rem']}>
    <SubTitle noMargin>Invite your friends</SubTitle>
    <p className="description">
      Win 5€ per streamer
      <br />
      signed up on Revolt
    </p>
    <MainLink to="/creator/ambassador">Become an ambassador</MainLink>
  </Styles>
)

export default AmbassadorProgramCard
