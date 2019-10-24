import React from 'react'
import { Box, Flex } from '@rebass/grid'
import copy from 'copy-to-clipboard'
import { LabelText, SubTitle } from '../styles/Text'
import { MainButton, MainLinkExternal } from '../styles/Button'
import OrderedList from '../components/OrderedList'
import styled from 'styled-components'
import { setFont } from '../utils/styles'

const illustrationSource = require('../images/illustrations/ambassador.svg')

const Styles = styled.div`
  .illustration {
    display: block;
    width: 25rem;
    height: auto;
    @media screen and (max-width: ${props => props.theme.breakpoints[1]}) {
      display: none;
    }
  }

  .link {
    ${setFont(600, 'normal')}
  }
`

const creatorSteps = [
  'The influencer must sign up with your link',
  'The influencer must have at least 2k followers on YouTube or Twitch',
  'The influencer must conclude a collab on the platform',
]
export const AMBASSADOR_CREATOR_REWARD = 5

interface Props {
  creatorId: string
}

const AmbassadorProgramCreators: React.FC<Props> = ({ creatorId }) => {
  const creatorLink = `${window.location.origin}/creatorSignup?ambassador=${creatorId}`
  const [creatorCopyButtonText, setCreatorCopyButtonText] = React.useState<string>('Copy link')

  const handleCreatorCopy = () => {
    copy(creatorLink)
    setCreatorCopyButtonText('Link copied!')
    window.setTimeout(() => {
      setCreatorCopyButtonText('Copy link')
    }, 2000)
  }

  return (
    <Styles>
      <SubTitle>Invite your friends and earn a reward</SubTitle>
      <Flex
        flexDirection="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        flexWrap="wrap"
        mb={['2rem', '2rem', 0]}
      >
        {/* Creator referral */}
        <Box width={[1, 1, 8 / 12]}>
          <p>
            We give you ${AMBASSADOR_CREATOR_REWARD} each time you bring a qualified influencer on
            the platform.
          </p>
          <LabelText withMargin>Conditions</LabelText>
          <OrderedList items={creatorSteps} />
          <LabelText withMargin>Link to share</LabelText>
          <p className="link">{creatorLink}</p>
          <Flex>
            <Box mr="1rem">
              <MainLinkExternal
                target="_blank"
                href={`https://twitter.com/intent/tweet?text=${encodeURI(
                  'Hey ! Just discovered Revolt Gaming it’s a very cool platform to find partnerships as a Twitch/Youtube streamer, check it out: '
                )}&url=${creatorLink}`}
              >
                Tweet my link
              </MainLinkExternal>
            </Box>
            <MainButton onClick={handleCreatorCopy} inverted>
              {creatorCopyButtonText}
            </MainButton>
          </Flex>
        </Box>
        <Box width={[0, 0, 4 / 12]}>
          <img src={illustrationSource} alt="ambassador" className="illustration" />
        </Box>
      </Flex>
    </Styles>
  )
}

export default AmbassadorProgramCreators
