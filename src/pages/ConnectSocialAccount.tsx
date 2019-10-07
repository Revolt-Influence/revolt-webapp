import React, { useEffect } from 'react'
import { ContainerBox } from '../styles/grid'
import { Title } from '../styles/Text'
import SplitView from '../components/SplitView'
import ConnectCreatorYoutube from '../components/ConnectCreatorYoutube'
import { usePageTitle } from '../utils/hooks'

const ConnectSocialAccount: React.FC<{}> = () => {
  usePageTitle('Connect an account')
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <ContainerBox>
      <Title>Connect an account</Title>
      <SplitView title="Connect YouTube">
        <ConnectCreatorYoutube />
      </SplitView>
    </ContainerBox>
  )
}

export default ConnectSocialAccount
