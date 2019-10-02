import React, { useRef, useEffect, useCallback } from 'react'
import { SubTitle, Title } from '../styles/Text'
import { usePageTitle, useDeviceType } from '../utils/hooks'
import { Flex, Box } from '@rebass/grid'
import ConversationsListPreview from '../components/ConversationsListPreview'
import { RouteComponentProps } from 'react-router'
import PageHeader from '../components/PageHeader'
import ConversationMessages, {
  MESSAGE_FRAGMENT,
  MessageDetailed,
} from '../components/ConversationMessages'
import MessageForm from '../components/MessageForm'
import Loader from '../components/Loader'
import ErrorCard from '../components/ErrorCard'
import FullHeightColumns from '../components/FullHeightColumns'
import { ContainerBox } from '../styles/grid'
import FullHeightWrapper from '../components/FullHeightWrapper'
import gql from 'graphql-tag'
import { useQuery, useLazyQuery } from '@apollo/react-hooks'
import {
  GetConversationsList,
  GetConversationsListVariables,
} from '../__generated__/GetConversationsList'
import { GET_SESSION } from '../components/Session'
import { GetSession } from '../__generated__/GetSession'
import { SessionType } from '../__generated__/globalTypes'
import { GetConversation, GetConversationVariables } from '../__generated__/GetConversation'

const CONVERSATION_FRAGMENT = gql`
  fragment ConversationFragment on Conversation {
    _id
    createdAt
    messages {
      ...MessageFragment
    }
    creator {
      _id
      name
      picture
    }
    brand {
      _id
      name
      logo
    }
  }
  ${MESSAGE_FRAGMENT}
`

export const GET_CONVERSATIONS_LIST = gql`
  query GetConversationsList($page: Float) {
    conversations(page: $page) {
      totalPages
      currentPage
      items {
        ...ConversationFragment
      }
    }
  }
  ${CONVERSATION_FRAGMENT}
`

const GET_CONVERSATION = gql`
  query GetConversation($conversationId: String!) {
    conversation(id: $conversationId) {
      ...ConversationFragment
    }
  }
  ${CONVERSATION_FRAGMENT}
`

interface Match {
  conversationId: string
}

const Conversation: React.FC<RouteComponentProps<Match>> = ({ match }) => {
  const deviceType = useDeviceType()

  // Scroll messages to the bottom
  const messagesRef = useRef<HTMLElement>(null)

  // Fetch conversations on mount
  const {
    data: { conversations: paginatedConversations },
    loading,
    error,
  } = useQuery<GetConversationsList, GetConversationsListVariables>(GET_CONVERSATIONS_LIST)

  const conversations = loading || error ? [] : paginatedConversations.items

  // Get the selected conversation based on URL
  const { conversationId } = match.params
  const conversation = conversations.find(_conv => _conv._id === conversationId)

  // Scroll to the bottom of messages
  useEffect(() => {
    // messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    if (!!messagesRef.current) {
      // messagesRef.current.scrollIntoView(false)
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [conversation])

  // TODO
  // useConversationsSocket()

  // Prepare optional query to get specific conversion
  const [getSpecificConversation, getSpecificConversationStatus] = useLazyQuery<
    GetConversation,
    GetConversationVariables
  >(GET_CONVERSATION, {
    onCompleted: ({ conversation: specificConversation }) => {
      conversations.push(specificConversation)
    },
  })

  // Get session data to know what info to show
  const {
    data: { session },
  } = useQuery<GetSession>(GET_SESSION)
  const isAdmin = session.user && session.user.isAdmin

  const getRecipientName = (): string => {
    // Don't crash when conversation is null
    if (conversation == null) {
      return null
    }
    if (session.sessionType === SessionType.CREATOR) {
      return conversation.brand.name
    }
    if (session.sessionType === SessionType.BRAND) {
      // Always show creator recipient to brands
      return conversation.creator.name
    }
  }
  const recipientName = getRecipientName()
  usePageTitle('Conversations')

  // Fetch the specific conversation if it's not in the paginated list
  if (conversation == null) {
    getSpecificConversation()
  }

  const pageTitle = `Parler à ${recipientName}${
    isAdmin ? ` et ${conversation && conversation.brand.name}` : ''
  }`

  const getDetailedMessages = useCallback((): MessageDetailed[] => {
    if (conversation == null || loading || error) {
      return []
    }
    return conversation.messages.map(_message => {
      const checkIfFromMe = () => {
        if (isAdmin) {
          return _message.isAdminAuthor
        }
        return session.sessionType === SessionType.BRAND
          ? _message.brandAuthor != null
          : _message.creatorAuthor != null
      }

      const getAuthorData = (): { picture: string; name: string } => {
        // The recipient can be a brand, a user or an admin
        if (_message.creatorAuthor != null) {
          return {
            name: conversation.creator.name,
            picture: conversation.creator.picture,
          }
        } else if (_message.brandAuthor != null) {
          return {
            name: conversation.brand.name,
            picture: conversation.brand.logo,
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
        sentAt: _message.createdAt,
        isFromMe: checkIfFromMe(),
        authorName: authorData.name,
        authorPicture: authorData.picture,
      }
    })
  }, [conversation, error, isAdmin, loading, session.sessionType])

  if (loading || getSpecificConversationStatus.loading) {
    return <Loader fullScreen />
  }
  if (error || getSpecificConversationStatus.error) {
    return <ErrorCard message="Vos messages n'ont pas pu être chargés" />
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
        <PageHeader
          smallerOnMobile
          title={pageTitle}
          destination={`/${session.sessionType.toLowerCase()}/messages`}
        />
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

export default Conversation
