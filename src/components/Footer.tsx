import React from 'react'
import { Flex, Box } from '@rebass/grid'
import styled from 'styled-components'
import { withRouter, RouteComponentProps, Link } from 'react-router-dom'
import { palette } from '../utils/colors'
import { ContainerBox } from '../styles/grid'
import { LabelText } from '../styles/Text'
import { TextLinkExternal } from '../styles/Button'

const logoSource = require('../images/logos/logo_light.svg')

const Styles = styled(Flex)`
  border-top: 3px solid ${palette.grey._200};
  .logo {
    margin-top: 1rem;
    width: 13rem;
    margin-bottom: 2rem;
    height: auto;
  }
  .text {
    color: ${palette.grey._700};
    display: block;
    margin-bottom: 0.5rem;
    line-height: 2em;
    text-decoration: none;
  }
`

const Footer: React.FunctionComponent<RouteComponentProps> = ({ location }) => {
  if (
    location.pathname.endsWith('/brief') ||
    location.pathname.endsWith('/dashboard') ||
    location.pathname.includes('/messages') ||
    location.pathname.includes('/community')
  ) {
    return null
  }
  return (
    <ContainerBox>
      <Styles
        mt="3rem"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="flex-start"
        py="2rem"
        flexWrap="wrap"
      >
        <img className="logo" alt="Revolt" src={logoSource} />
        <Flex flexDirection="row" width={[1, 1, 6 / 12]} flexWrap="wrap">
          <Box width={[1, 1, 6 / 12]} mb={['2rem', '2rem', 0]}>
            <LabelText className="text" grey>
              Legal
            </LabelText>
            <Link to="/privacyPolicy" className="text">
              Privacy policy
            </Link>
            <Link to="/termsAndConditions" className="text">
              Terms of use
            </Link>
            <p className="text">Copyright {new Date(Date.now()).getFullYear()}</p>
          </Box>
          <Box width={[1, 1, 6 / 12]}>
            <LabelText grey>Follow us</LabelText>
            <TextLinkExternal
              target="_blank"
              href="https://instagram.com/revolt.club"
              className="text"
            >
              Instagram
            </TextLinkExternal>
            <TextLinkExternal
              target="_blank"
              href="https://twitter.com/RevoltInfluence"
              className="text"
            >
              Twitter
            </TextLinkExternal>
            <TextLinkExternal target="_blank" href="https://revolt.club/blog/" className="text">
              Blog
            </TextLinkExternal>
          </Box>
        </Flex>
      </Styles>
    </ContainerBox>
  )
}

export default withRouter(Footer)
