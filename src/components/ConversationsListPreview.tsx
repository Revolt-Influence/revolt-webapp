import React from 'react'
import ErrorBoundary from '../components/ErrorBoundary'
import { Box } from '@rebass/grid'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { IConversationsState } from '../models/Conversation'
import { useSelector, useDispatch } from 'react-redux'
import IState from '../models/State'
import { SessionType } from '../models/Session'
import { ICreator } from '../models/Creator'
import { IBrand } from '../models/Brand'
import { useIsAdmin } from '../utils/hooks'
import SelectableCard from './SelectableCard'
import { TextButton } from '../styles/Button'
import { fetchConversationsPage } from '../actions/conversations'

interface IMatch {
  conversationId: string
}

const ConversationsListPreview: React.FC<RouteComponentProps<IMatch>> = ({ match }) => {
  const conversationId = match.params.conversationId || 'default id'
  const basePath = match.path.replace('/:conversationId', '')
  const dispatch = useDispatch()
  const { items: conversations, totalPages, currentPage } = useSelector<
    IState,
    IConversationsState
  >(state => state.conversations)
  const sessionType = useSelector<IState, SessionType>(state => state.session.type)
  const isAdmin = useIsAdmin()
  const conversationOverviews = conversations
    // Sort by most recent message
    .sort(
      (_convA, _convB) =>
        _convB.messages[_convB.messages.length - 1].sentAt -
        _convA.messages[_convA.messages.length - 1].sentAt
    )
    // Select just the data we need
    .map(_conv => ({
      _id: _conv._id,
      lastMessage: _conv.messages[_conv.messages.length - 1],
      recipientName:
        sessionType === 'brand' ? (_conv.creator as ICreator).name : (_conv.brand as IBrand).name,
      recipientPicture:
        sessionType === 'brand'
          ? (_conv.creator as ICreator).picture
          : (_conv.brand as IBrand).logo,
      authorName: isAdmin ? (_conv.brand as IBrand).name : null,
      authorPicture: isAdmin ? (_conv.brand as IBrand).logo : null,
    }))

  return (
    <ErrorBoundary message="Les messages n'ont pas pu être affichés">
      <Box width={1}>
        {currentPage > 1 && (
          <Box mb="1rem">
            <TextButton onClick={() => dispatch(fetchConversationsPage(currentPage - 1))} noMargin>
              Voir les plus récents
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
        {totalPages > currentPage && (
          <TextButton onClick={() => dispatch(fetchConversationsPage(currentPage + 1))} noMargin>
            Voir les plus anciens
          </TextButton>
        )}
      </Box>
    </ErrorBoundary>
  )
}

export default withRouter(ConversationsListPreview)
