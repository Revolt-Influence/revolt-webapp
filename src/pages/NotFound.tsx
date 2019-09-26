import React from 'react'
import styled from 'styled-components'
import { Flex } from '@rebass/grid'
import { MainLink } from '../styles/Button'
import { ContainerBox } from '../styles/grid'

const illustrationSource = require('../images/illustrations/notFound.svg')

const Styles = styled(ContainerBox)`
  text-align: center;
  img.illustration {
    width: 400px;
    max-width: 95vw;
    height: auto;
    display: block;
    margin-top: 3rem;
    margin-bottom: 3rem;
  }
`

const NotFound = () => (
  <Styles py={['3rem', '3rem', '3rem']}>
    <Flex flexDirection="column" alignItems="center" justifyContent="flex-start">
      <h1>Cette page n'existe pas</h1>
      <img className="illustration" src={illustrationSource} alt="404" />
      <MainLink display="inline" to="/">
        Retourner à l'accueil
      </MainLink>
    </Flex>
  </Styles>
)

export default NotFound
