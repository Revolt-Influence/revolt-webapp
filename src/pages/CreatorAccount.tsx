import React from 'react'
import { Box } from '@rebass/grid'
import { ContainerBox } from '../styles/grid'
import SplitView from '../components/SplitView'
import { usePageTitle } from '../utils/hooks'
import { Title } from '../styles/Text'
import ErrorBoundary from '../components/ErrorBoundary'
import CreatorIdentityProfile from '../components/CreatorIdentity'
import ConnectCreatorYoutube from '../components/ConnectCreatorYoutube'
import UpdateCreatorContactInfo from '../components/UpdateCreatorContactInfo'
import Session from '../components/Session'
import ChangePassword from '../components/ChangePassword'
import CreatorPaymentsOverview from '../components/CreatorPaymentsOverview'

const CreatorAccount: React.FC<{}> = () => {
  usePageTitle('My account')

  return (
    <ErrorBoundary message="Votre profil n'a pas pu être affiché">
      <ContainerBox>
        <Title>My account</Title>
        <Box width={[1, 10 / 12, 10 / 12]}>
          {/* Identity */}
          <SplitView title="My profile">
            <CreatorIdentityProfile />
          </SplitView>
          {/* Youtube */}
          <SplitView title="My YouTube channel">
            <ConnectCreatorYoutube />
          </SplitView>
          {/* Contact info */}
          <SplitView title="My contact info">
            <UpdateCreatorContactInfo />
          </SplitView>
          {/* Change password */}
          <SplitView title="My password">
            <ChangePassword />
          </SplitView>
          {/* Payments overview */}
          <SplitView title="Payments">
            <CreatorPaymentsOverview />
          </SplitView>
          {/* Session */}
          <SplitView title="My session">
            <Session />
          </SplitView>
        </Box>
      </ContainerBox>
    </ErrorBoundary>
  )
}

export default CreatorAccount
