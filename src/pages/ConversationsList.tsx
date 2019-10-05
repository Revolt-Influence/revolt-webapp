import React from 'react'
import { useDeviceType, usePageTitle } from '../utils/hooks'
import { Redirect, withRouter, RouteComponentProps } from 'react-router'
import ConversationsListPreview from '../components/ConversationsListPreview'
import { Title } from '../styles/Text'
import { ContainerBox } from '../styles/grid'
import ErrorBoundary from '../components/ErrorBoundary'
import Loader from '../components/Loader'
import NotificationCard from '../components/NotificationCard'
import { useQuery } from '@apollo/react-hooks'
import { GET_CONVERSATIONS_LIST } from './Conversation'
import {
  GetConversationsList,
  GetConversationsListVariables,
} from '../__generated__/GetConversationsList'
import ErrorCard from '../components/ErrorCard'

const ConversationsList: React.FC<RouteComponentProps> = ({ match }) => {
  usePageTitle('My messages')
  const deviceType = useDeviceType()

  // Fetch coversations if they don't exist
  const {
    data: { conversations: paginatedConversations } = { conversations: null },
    loading,
    error,
  } = useQuery<GetConversationsList, GetConversationsListVariables>(GET_CONVERSATIONS_LIST)

  if (loading) {
    return <Loader fullScreen />
  }
  if (error) {
    return <ErrorCard />
  }

  if (paginatedConversations.items.length === 0) {
    return (
      <ContainerBox pt="2rem">
        <NotificationCard nature="info" message="You don't have any conversations yet" />
      </ContainerBox>
    )
  }

  // Redirect to conversation if not mobile
  if (deviceType !== 'mobile') {
    // Redirect to first conversation
    return <Redirect to={`${match.url}/${paginatedConversations.items[0]._id}`} />
  }

  return (
    <ErrorBoundary message="Could not load messages">
      <ContainerBox>
        <Title>My messages</Title>
        <ConversationsListPreview />
      </ContainerBox>
    </ErrorBoundary>
  )
}

export default withRouter(ConversationsList)
