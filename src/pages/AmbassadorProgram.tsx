import React from 'react'
import styled from 'styled-components'
import { Box, Flex } from '@rebass/grid'
import copy from 'copy-to-clipboard'
import { LabelText } from '../styles/Text'
import { ContainerBox } from '../styles/grid'
import { MainButton } from '../styles/Button'
import OrderedList from '../components/OrderedList'
import { usePageTitle } from '../utils/hooks'
import { setFont } from '../utils/styles'
import PageHeader from '../components/PageHeader'
import { useQuery } from '@apollo/react-hooks'
import { GET_SESSION } from '../components/Session'
import { GetSession } from '../__generated__/GetSession'

const illustrationSource = require('../images/illustrations/ambassador.svg')

const Styles = styled(ContainerBox)`
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

const AmbassadorProgram: React.FunctionComponent<{}> = () => {
  usePageTitle('Become an ambassador')
  // Copy link
  const { data: { session } = { session: null } } = useQuery<GetSession>(GET_SESSION)
  const creatorId = session.creator._id
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
      <PageHeader title="Invite your friends and earn a reward" />
      <Flex
        flexDirection="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        flexWrap="wrap"
        mb={['2rem', '2rem', 0]}
      >
        {/* Creator referral */}
        <Box width={[1, 1, 8 / 12]}>
          <p>We give you $5 each time you bring a qualified influencer on the platform.</p>
          <LabelText withMargin>Conditions</LabelText>
          <OrderedList items={creatorSteps} />
          <LabelText withMargin>Link to share</LabelText>
          <p className="link">{creatorLink}</p>
          <MainButton onClick={handleCreatorCopy} smaller inverted>
            {creatorCopyButtonText}
          </MainButton>
        </Box>
        <Box width={[0, 0, 4 / 12]}>
          <img src={illustrationSource} alt="ambassador" className="illustration" />
        </Box>
      </Flex>
    </Styles>
  )
}

export default AmbassadorProgram
