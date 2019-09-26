import React from 'react'
import styled from 'styled-components'
import { Box, Flex } from '@rebass/grid'
import { useSelector } from 'react-redux'
import copy from 'copy-to-clipboard'
import { LabelText } from '../styles/Text'
import { ContainerBox } from '../styles/grid'
import { MainButton } from '../styles/Button'
import OrderedList from '../components/OrderedList'
import { usePageTitle } from '../utils/hooks'
import IState from '../models/State'
import { setFont } from '../utils/styles'
import PageHeader from '../components/PageHeader'

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
  "L'influenceur doit s'incrire avec votre lien",
  "L'influenceur doit avoir au moins 2k sur YouTube",
  "L'influenceur doit réaliser un partenariat sur la plateforme",
]

const AmbassadorProgram: React.FunctionComponent<{}> = () => {
  usePageTitle('Devenez ambassadeur')
  // Copy link
  const creatorId = useSelector<IState, string>(state => state.session.creator._id)
  const creatorLink = `${window.location.origin}/creatorSignup?ambassador=${creatorId}`
  const [creatorCopyButtonText, setCreatorCopyButtonText] = React.useState<string>('Copier le lien')

  const handleCreatorCopy = () => {
    copy(creatorLink)
    setCreatorCopyButtonText('Lien copié !')
    window.setTimeout(() => {
      setCreatorCopyButtonText('Copier le lien')
    }, 2000)
  }

  return (
    <Styles>
      <PageHeader title="Invitez vos amis et soyez récompensé" />
      <Flex
        flexDirection="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        flexWrap="wrap"
        mb={['2rem', '2rem', 0]}
      >
        {/* Creator referral */}
        <Box width={[1, 1, 8 / 12]}>
          <p>Nous vous donnons 5€ chaque fois que vous amenez un influenceur actif sur Revolt.</p>
          <LabelText withMargin>Conditions</LabelText>
          <OrderedList items={creatorSteps} />
          <LabelText withMargin>Lien à envoyer aux influenceurs</LabelText>
          <p className="link">{creatorLink}</p>
          <MainButton onClick={handleCreatorCopy} smaller inverted>
            {creatorCopyButtonText}
          </MainButton>
        </Box>
        <Box width={[0, 0, 4 / 12]}>
          <img src={illustrationSource} alt="Ambassadeur" className="illustration" />
        </Box>
      </Flex>
    </Styles>
  )
}

export default AmbassadorProgram
