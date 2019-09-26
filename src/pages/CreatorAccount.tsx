import React from 'react'
import { Box } from '@rebass/grid'
import { ContainerBox } from '../styles/grid'
import SplitView from '../components/SplitView'
import ConnectCreatorInstagram from '../components/ConnectCreatorInstagram'
import { usePageTitle } from '../utils/hooks'
import CreatorPostalAddress from '../components/CreatorPostalAddress'
import { Title } from '../styles/Text'
import ErrorBoundary from '../components/ErrorBoundary'
import CreatorIdentityProfile from '../components/CreatorIdentity'
import ConnectCreatorYoutube from '../components/ConnectCreatorYoutube'
import UpdateCreatorContactInfo from '../components/UpdateCreatorContactInfo'
import Session from '../components/Session'
import ChangePassword from '../components/ChangePassword'
import AmbassadorStatusCard from '../components/AmbassadorStatusCard'

const CreatorAccount: React.FC<{}> = () => {
  usePageTitle('Mon compte')

  return (
    <ErrorBoundary message="Votre profil n'a pas pu être affiché">
      <ContainerBox>
        <Title>Mon compte</Title>
        <Box width={[1, 10 / 12, 10 / 12]}>
          {/* Identity */}
          <SplitView title="Mon profil">
            <CreatorIdentityProfile />
          </SplitView>
          {/* Instagram */}
          <SplitView title="Mon Instagram">
            <ConnectCreatorInstagram />
          </SplitView>
          {/* Youtube */}
          <SplitView title="Ma chaîne Youtube">
            <ConnectCreatorYoutube />
          </SplitView>
          {/* Contact info */}
          <SplitView title="Mes coordonnées">
            <UpdateCreatorContactInfo />
          </SplitView>
          {/* Change password */}
          <SplitView title="Mon mot de passe">
            <ChangePassword />
          </SplitView>
          {/* Ambassador program advancement */}
          <SplitView title="Ambassadeur">
            <AmbassadorStatusCard />
          </SplitView>
          {/* Postal address */}
          <SplitView title="Mon adresse">
            <CreatorPostalAddress />
          </SplitView>
          {/* Session */}
          <SplitView title="Ma session">
            <Session />
          </SplitView>
        </Box>
      </ContainerBox>
    </ErrorBoundary>
  )
}

export default CreatorAccount
