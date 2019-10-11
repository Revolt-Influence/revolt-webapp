import React from 'react'
import { Flex } from '@rebass/grid'
import styled, { css } from 'styled-components'
import { palette } from '../utils/colors'
import { applyCloudinaryTransformations } from '../utils/images'
import { shadow } from '../utils/styles'
import gql from 'graphql-tag'
import { MessageBubble } from '../styles/MessageBubble'

const Message = styled(Flex)<{ isFromMe: boolean }>`
  &:not(:last-child) {
    margin-bottom: 1rem;
  }

  ${props => {
    if (props.isFromMe) {
      return css`
        align-self: flex-end;
      `
    } else {
      return css`
        align-self: flex-start;
      `
    }
  }}

  .recipient {
    width: 4rem;
    height: 4rem;
    object-fit: contain;
    align-self: flex-start;
    border-radius: 50%;
    margin-right: 1rem;
    box-shadow: ${shadow.inset};
    flex-shrink: 0;
  }
`

export const MESSAGE_FRAGMENT = gql`
  fragment MessageFragment on Message {
    _id
    text
    brandAuthor {
      _id
    }
    creatorAuthor {
      _id
    }
    isAdminAuthor
    createdAt
    conversation {
      _id
    }
  }
`

export interface MessageDetailed {
  _id: string
  text: string
  sentAt: number
  isFromMe: boolean
  authorName: string
  authorPicture: string
}

interface Props {
  messages: MessageDetailed[]
}

const ConversationMessages: React.FC<Props> = ({ messages }) => (
  <Flex flexDirection="column" alignItems="flex-start">
    {messages
      // Sort from oldest to most recent because we're autoscrolling to the bottom of the list
      .sort((_messageA, _messageB) => (_messageA.sentAt > _messageB.sentAt ? 1 : -1))
      .map(_message => (
        <Message isFromMe={_message.isFromMe} key={_message._id}>
          {!_message.isFromMe && (
            <img
              src={applyCloudinaryTransformations(_message.authorPicture, { width: 80 })}
              alt={_message.authorName}
              className="recipient"
            />
          )}
          <MessageBubble isFromMe={_message.isFromMe}>{_message.text}</MessageBubble>
        </Message>
      ))}
  </Flex>
)

export default ConversationMessages
