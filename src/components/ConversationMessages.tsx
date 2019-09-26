import React from 'react'
import { Flex } from '@rebass/grid'
import { IMessageDetailed } from '../models/Conversation'
import styled, { css } from 'styled-components'
import { palette } from '../utils/colors'
import { applyCloudinaryTransformations } from '../utils/images'
import { shadow } from '../utils/styles'

const MessageBubble = styled(Flex)<{ isFromMe: boolean }>`
  max-width: 65rem;
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

  .bubble {
    padding: 1rem 2rem;
    border-radius: 2rem;
    white-space: pre-wrap;
    ${props => {
      if (props.isFromMe) {
        return css`
          align-self: flex-end;
          background: ${palette.pink._200};
        `
      } else {
        return css`
          align-self: flex-start;
          background: ${palette.grey._200};
        `
      }
    }}
  }

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

interface Props {
  messages: IMessageDetailed[]
}

const ConversationMessages: React.FC<Props> = ({ messages }) => (
  <Flex flexDirection="column" alignItems="flex-start">
    {messages
      // Sort from oldest to most recent because we're autoscrolling to the bottom of the list
      .sort((_messageA, _messageB) => (_messageA.sentAt > _messageB.sentAt ? 1 : -1))
      .map(_message => (
        <MessageBubble isFromMe={_message.isFromMe} key={_message._id}>
          {!_message.isFromMe && (
            <img
              src={applyCloudinaryTransformations(_message.authorPicture, { width: 80 })}
              alt={_message.authorName}
              className="recipient"
            />
          )}
          <div className="bubble">{_message.text}</div>
        </MessageBubble>
      ))}
  </Flex>
)

export default ConversationMessages
