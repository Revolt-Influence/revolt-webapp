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
  usePageTitle('My account')

  return (
    <Container>
      <Title>Mon compte</Title>
      <Box width={[1, 10 / 12, 10 / 12]}>
        {/* Contact info */}
        <SplitView title="My contact info">
          <UpdateUserInfo />
        </SplitView>
        {/* Change password */}
        <SplitView title="My password">
          <ChangePassword />
        </SplitView>
        {/* Payment info */}
        <SplitView title="My plan">
          <UserPlan />
        </SplitView>
        {/* Session */}
        <SplitView title="My session">
          <Session />
        </SplitView>
      </Box>
    </Container>
  )
}

export default BrandAccount
