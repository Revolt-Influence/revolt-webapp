import React from 'react'
import styled from 'styled-components'
import { Flex, Box } from '@rebass/grid'
import { MainLink } from '../styles/Button'
import { Container } from '../utils/grid'
import { setFont } from '../utils/styles'
import { usePageTitle } from '../utils/hooks'

const illustrationSource = require('../images/illustrations/landing.png')

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
  usePageTitle("Communauté d'influenceurs")
  return (
    <Container>
      <FullPage flexDirection={['column', 'row', 'row']} justifyContent="space-between">
        <main>
          <Title>
            Permettre aux marques et aux influenceurs de créer ensemble plus simplement.
          </Title>
          <p className="pitch">
            Chaque jour, des marques et des influenceurs créent du contenu beau et innovant sur
            notre plateforme. Rejoignez-nous.
          </p>
          <Flex flexDirection={['column', 'row', 'row']}>
            {/* The Box is necessary for some weird CSS reason */}
            <Box>
              <MainLink to="/creatorSignup">Je suis un influenceur</MainLink>
            </Box>
            <Box ml={[0, '2rem', '2rem']}>
              <MainLink
                to="/userSignup"
                inverted
                style={{ padding: 'calc(1.5rem - 2px) calc(2rem - 2px)' }}
              >
                Je suis une marque
              </MainLink>
            </Box>
          </Flex>
        </main>
        <img
          src={illustrationSource}
          className="illustration"
          alt="Partenariats avec des influenceurs"
        />
      </FullPage>
    </Container>
  )
}

export default Landing
