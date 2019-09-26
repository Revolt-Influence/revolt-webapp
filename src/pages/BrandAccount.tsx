import React from 'react'
import { Box } from '@rebass/grid'
import { Container } from '../utils/grid'
import UpdateUserInfo from '../components/UpdateUserInfo'
import ChangePassword from '../components/ChangePassword'
import SplitView from '../components/SplitView'
import { usePageTitle } from '../utils/hooks'
import { Title } from '../styles/Text'
import UserPlan from '../components/UserPlan'
import Session from '../components/Session'

const BrandAccount: React.FC<{}> = () => {
  usePageTitle('Mon compte')

  return (
    <Container>
      <Title>Mon compte</Title>
      <Box width={[1, 10 / 12, 10 / 12]}>
        {/* Contact info */}
        <SplitView title="Changer mes coordonnées">
          <UpdateUserInfo />
        </SplitView>
        {/* Change password */}
        <SplitView title="Mon mot de passe">
          <ChangePassword />
        </SplitView>
        {/* Payment info */}
        <SplitView title="Mon offre">
          <UserPlan />
        </SplitView>
        {/* Session */}
        <SplitView title="Ma session">
          <Session />
        </SplitView>
      </Box>
    </Container>
  )
}

export default BrandAccount
