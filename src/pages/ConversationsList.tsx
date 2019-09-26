import React from 'react'
import { useDeviceType, usePageTitle } from '../utils/hooks'
import { Redirect, withRouter, RouteComponentProps } from 'react-router'
import ConversationsListPreview from '../components/ConversationsListPreview'
import { Title } from '../styles/Text'
import { ContainerBox } from '../styles/grid'
import ErrorBoundary from '../components/ErrorBoundary'
import { useConversationsList } from './Conversation'
import Loader from '../components/Loader'
import NotificationCard from '../components/NotificationCard'

const ConversationsList: React.FC<RouteComponentProps> = ({ match }) => {
  usePageTitle('Mes messages')
  const deviceType = useDeviceType()

  // Fetch coversations if they don't exist
  const { conversations, fetchConversationsStatus } = useConversationsList()

  if (fetchConversationsStatus.isLoading) {
    return <Loader fullScreen />
  }

  if (conversations.length === 0) {
    return (
      <ContainerBox pt="2rem">
        <NotificationCard
          nature="info"
          message="Vous n'avez pas encore de conversation sur Revolt"
        />
      </ContainerBox>
    )
  }

  // Redirect to conversation if not mobile
  if (deviceType !== 'mobile') {
    // Redirect to first conversation
    return <Redirect to={`${match.url}/${conversations[0]._id}`} />
  }

  return (
    <ErrorBoundary message="Les messages n'ont pas pu être affichés">
      <ContainerBox>
        <Title>Mes messages</Title>
        <ConversationsListPreview />
      </ContainerBox>
    </ErrorBoundary>
  )
}

export default withRouter(ConversationsList)
