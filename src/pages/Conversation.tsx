import React, { useRef, useEffect, useCallback } from 'react'
import { SubTitle, Title } from '../styles/Text'
import { usePageTitle, useDeviceType, useIsAdmin, useConversationsSocket } from '../utils/hooks'
import { Flex, Box } from '@rebass/grid'
import ConversationsListPreview from '../components/ConversationsListPreview'
import { RouteComponentProps } from 'react-router'
import PageHeader from '../components/PageHeader'
import { useSelector, useDispatch } from 'react-redux'
import IState from '../models/State'
import { ISession } from '../models/Session'
import ConversationMessages from '../components/ConversationMessages'
import MessageForm from '../components/MessageForm'
import { IConversation, IMessageDetailed } from '../models/Conversation'
import { fetchConversationsPage, fetchConversation } from '../actions/conversations'
import { IRequestStatus } from '../utils/request'
import Loader from '../components/Loader'
import ErrorCard from '../components/ErrorCard'
import { ICreator } from '../models/Creator'
import { IBrand } from '../models/Brand'
import FullHeightColumns from '../components/FullHeightColumns'
import { ContainerBox } from '../styles/grid'
import FullHeightWrapper from '../components/FullHeightWrapper'

function useConversationsList() {
  // Fetch conversations on mount
  const dispatch = useDispatch()
  const conversations = useSelector<IState, IConversation[]>(state => state.conversations.items)
  const fetchConversationsStatus = useSelector<IState, IRequestStatus>(
    state => state.conversations.requests.getConversationsPage
  )
  useEffect(() => {
    if (conversations.length === 0) {
      dispatch(fetchConversationsPage(1))
    }
  }, [conversations.length, dispatch])
  useConversationsSocket()
  return { conversations, fetchConversationsStatus }
}

interface Match {
  conversationId: string
}

const Conversation: React.FC<RouteComponentProps<Match>> = ({ match }) => {
  const deviceType = useDeviceType()
  const { conversationId } = match.params
  const dispatch = useDispatch()

  // Scroll messages to the bottom
  const messagesRef = useRef<HTMLElement>(null)

  // Fetch conversations on mount
  const { conversations, fetchConversationsStatus } = useConversationsList()

  const conversation = conversations.find(_conv => _conv._id === conversationId)
  const { type: sessionType } = useSelector<IState, ISession>(state => state.session)

  const isAdmin = useIsAdmin()

  const getRecipientName = (): string => {
    // Don't crash when conversation is null
    if (conversation == null) {
      return null
    }
    if (sessionType === 'creator') {
      return (conversation.brand as IBrand).name
    }
    if (sessionType === 'brand') {
      // Always show creator recipient to brands
      return (conversation.creator as ICreator).name
    }
  }
  const recipientName = getRecipientName()

  const pageTitle = `Parler à ${recipientName}${
    isAdmin ? ` et ${conversation && (conversation.brand as IBrand).name}` : ''
  }`
  usePageTitle(recipientName)

  // Scroll to the bottom of messages
  useEffect(() => {
    // messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    if (!!messagesRef.current) {
      // messagesRef.current.scrollIntoView(false)
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [conversation])

  // useConversationsSocket()

  const getDetailedMessages = useCallback((): IMessageDetailed[] => {
    if (
      conversation == null ||
      fetchConversationsStatus.isLoading ||
      fetchConversationsStatus.hasFailed
    ) {
      return []
    }
    return conversation.messages.map(_message => {
      const checkIfFromMe = () => {
        if (isAdmin) {
          return _message.isAdminAuthor
        }
        return sessionType === 'brand'
          ? _message.brandAuthor != null
          : _message.creatorAuthor != null
      }

      const getAuthorData = (): { picture: string; name: string } => {
        // The recipient can be a brand, a user or an admin
        if (_message.creatorAuthor != null) {
          return {
            name: (conversation.creator as ICreator).name,
            picture: (conversation.creator as ICreator).picture,
          }
        } else if (_message.brandAuthor != null) {
          return {
            name: (conversation.brand as IBrand).name,
            picture: (conversation.brand as IBrand).logo,
          }
        } else if (_message.isAdminAuthor) {
          return {
            name: 'Revolt',
            // Cloudinary Revolt logo (cloudinary because then we can apply cloudinary
            // transformations like for the other brand logos)
            picture:
              'https://res.cloudinary.com/influencerz/image/upload/v1568799334/brands/Logo_carre%CC%81_plein.png',
          }
        }
      }
      const authorData = getAuthorData()

      return {
        _id: _message._id,
        text: _message.text,
        sentAt: _message.sentAt,
        isFromMe: checkIfFromMe(),
        authorName: authorData.name,
        authorPicture: authorData.picture,
      }
    })
  }, [
    conversation,
    fetchConversationsStatus.hasFailed,
    fetchConversationsStatus.isLoading,
    isAdmin,
    sessionType,
  ])

  if (fetchConversationsStatus.isLoading) {
    return <Loader fullScreen />
  }
  if (fetchConversationsStatus.hasFailed) {
    return <ErrorCard message="Vos messages n'ont pas pu être chargés" />
  }

  // Fetch the specific conversation if it's not in the paginated list
  if (conversation == null) {
    dispatch(fetchConversation(conversationId))
  }

  const detailedMessages = getDetailedMessages()

  const showMessages = () => (
    <Flex
      flexDirection="column"
      flex={1}
      height="100%"
      ml={deviceType === 'desktop' ? '3rem' : 0}
      justifyContent="space-between"
    >
      {/* Conversation header */}
      {deviceType === 'desktop' ? (
        <SubTitle>{pageTitle}</SubTitle>
      ) : (
        <PageHeader smallerOnMobile title={pageTitle} destination={`/${sessionType}/messages`} />
      )}
      {/* Conversation messages */}
      <Box flex={1} style={{ overflowY: 'scroll' }} ref={messagesRef}>
        <ConversationMessages messages={detailedMessages} />
      </Box>
      {/* Conversation message form */}
      <MessageForm conversationId={conversationId} />
    </Flex>
  )

  if (deviceType !== 'desktop') {
    return (
      <ContainerBox>
        <FullHeightWrapper>{showMessages()}</FullHeightWrapper>
      </ContainerBox>
    )
  }

  return (
    <FullHeightColumns
      noPadding
      ratio={deviceType === 'desktop' ? 1 / 3 : 0}
      leftComponent={() =>
        deviceType === 'desktop' ? (
          <Flex
            width={[0, 0, 1]}
            flexDirection="column"
            style={{ height: '100%', maxHeight: '100%' }}
          >
            <Title>Mes messages</Title>
            <Box flex={1} style={{ overflowY: 'scroll' }} pb="1rem">
              <ConversationsListPreview />
            </Box>
          </Flex>
        ) : (
          // Empty div prevents whitespace
          <div />
        )
      }
      rightComponent={showMessages}
    />
  )
}

export { useConversationsList }
export default Conversation
