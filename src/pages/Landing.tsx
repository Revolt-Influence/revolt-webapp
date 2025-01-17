import React from 'react'
import styled from 'styled-components'
import { Flex, Box } from '@rebass/grid'
import { MainLink } from '../styles/Button'
import { Container } from '../utils/grid'
import { setFont } from '../utils/styles'
import { usePageTitle } from '../utils/hooks'

const illustrationSource = require('../images/illustrations/landing.svg')

const Title = styled.p`
  ${setFont(600, 'huge')}
  max-width: 20em;
  line-height: 1.2em;
`

const FullPage = styled(Flex)`
  padding: 75px 0;
  @media screen and (min-width: ${props => props.theme.breakpoints[0]}) {
    height: calc(100vh - 70px);
    padding-top: 0;
    padding-bottom: 0;
  }

  main {
    height: 100%;
    padding-right: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    p.pitch {
      margin-top: 20px;
      margin-bottom: 10px;
      max-width: 600px;
    }
  }

  img.illustration {
    width: 600px;
    margin-left: 50px;
    height: auto;
    align-self: center;
    @media screen and (max-width: ${props => props.theme.breakpoints[0]}) {
      display: none;
    }
  }
`

const Landing: React.FC<{}> = () => {
  usePageTitle('Gaming creators')
  return (
    <Container>
      <FullPage flexDirection={['column', 'row', 'row']} justifyContent="space-between">
        <main>
          <Title>Welcome to Revolt Gaming</Title>
          <p className="pitch">
            The influencer marketing platform that allows creators and video game publishers to
            create better, together.
          </p>
          <Flex flexDirection={['column', 'row', 'row']}>
            {/* The Box is necessary for some weird CSS reason */}
            <Box>
              <MainLink to="/userSignup">I'm a game publisher</MainLink>
            </Box>
            <Box ml={[0, '2rem', '2rem']}>
              <MainLink
                to="/creatorSignup"
                inverted
                // style={{ padding: 'calc(1.5rem - 2px) calc(2rem - 2px)' }}
              >
                I'm an influencer
              </MainLink>
            </Box>
          </Flex>
        </main>
        <img src={illustrationSource} className="illustration" alt="Collbs" />
      </FullPage>
    </Container>
  )
}

export default Landing
