import React from 'react'
import { ContainerBox } from '../styles/grid'
import { Title } from '../styles/Text'
import SplitView from '../components/SplitView'
import ConnectCreatorYoutube from '../components/ConnectCreatorYoutube'
import { usePageTitle } from '../utils/hooks'

const ConnectSocialAccount: React.FC<{}> = () => {
  usePageTitle('Connecter un compte')
  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <ContainerBox>
      <Title>Connecter un compte</Title>
      <SplitView title="Connecter YouTube">
        <ConnectCreatorYoutube />
      </SplitView>
    </ContainerBox>
  )
}

export default ConnectSocialAccount
