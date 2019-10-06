import React, { useState } from 'react'
import ErrorBoundary from '../components/ErrorBoundary'
import { Box } from '@rebass/grid'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { useIsAdmin } from '../utils/hooks'
import SelectableCard from './SelectableCard'
import { TextButton } from '../styles/Button'
import { useQuery } from '@apollo/react-hooks'
import { GET_SESSION } from './Session'
import { GetSession } from '../__generated__/GetSession'
import {
  GetConversationsList,
  GetConversationsListVariables,
} from '../__generated__/GetConversationsList'
import { GET_CONVERSATIONS_LIST } from '../pages/Conversation'
import Loader from './Loader'
import ErrorCard from './ErrorCard'
import { SessionType } from '../__generated__/globalTypes'

interface IMatch {
  conversationId: string
}

const ConversationsListPreview: React.FC<RouteComponentProps<IMatch>> = ({ match }) => {
  const conversationId = match.params.conversationId || 'default id'
  const basePath = match.path.replace('/:conversationId', '')
  const [page, setPage] = useState<number>(1)
  const {
    data: { conversations: paginatedConversations } = { conversations: null },
    loading,
    error,
  } = useQuery<GetConversationsList, GetConversationsListVariables>(GET_CONVERSATIONS_LIST, {
    variables: { page },
  })
  const { data: { session } = { session: null } } = useQuery<GetSession>(GET_SESSION)
  const isAdmin = useIsAdmin()

  if (loading) {
    return <Loader />
  }
  if (error) {
    return <ErrorCard />
  }

  const conversationOverviews = paginatedConversations.items
    // Sort by most recent message
    .sort(
      (_convA, _convB) =>
        _convB.messages[_convB.messages.length - 1].createdAt -
        _convA.messages[_convA.messages.length - 1].createdAt
    )
    // Select just the data we need
    .map(_conv => ({
      _id: _conv._id,
      lastMessage: _conv.messages[_conv.messages.length - 1],
      recipientName:
        session.sessionType === SessionType.BRAND ? _conv.creator.name : _conv.brand.name,
      recipientPicture:
        session.sessionType === SessionType.BRAND ? _conv.creator.picture : _conv.brand.logo,
      authorName: isAdmin ? _conv.brand.name : null,
      authorPicture: isAdmin ? _conv.brand.logo : null,
    }))

  return (
    <ErrorBoundary message="Could not show messages">
      <Box width={1}>
        {paginatedConversations.currentPage > 1 && (
          <Box mb="1rem">
            <TextButton onClick={() => setPage(page - 1)} noMargin>
              See newer messages
            </TextButton>
          </Box>
        )}
        {conversationOverviews.map(_conversation => (
          <SelectableCard
            linkTo={`${basePath}/${_conversation._id}`}
            key={_conversation._id}
            selected={_conversation._id === conversationId}
            picture={_conversation.recipientPicture}
            title={`${_conversation.recipientName}${
              isAdmin ? `, ${_conversation.authorName}` : ''
            }`}
            description={_conversation.lastMessage.text}
          />
        ))}
        {paginatedConversations.totalPages > paginatedConversations.currentPage && (
          <TextButton onClick={() => setPage(page + 1)} noMargin>
            See older messages
          </TextButton>
        )}
      </Box>
    </ErrorBoundary>
  )
}

export default withRouter(ConversationsListPreview)
