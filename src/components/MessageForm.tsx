import React, { useState, useRef } from 'react'
import Textarea from 'react-textarea-autosize'
import { Flex, Box } from '@rebass/grid'
import styled from 'styled-components'
import { palette } from '../utils/colors'
import { setOutline, setFont } from '../utils/styles'
import { TextButton } from '../styles/Button'
import ErrorCard from './ErrorCard'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { SendMessage, SendMessageVariables } from '../__generated__/SendMessage'

const Styles = styled(Flex)`
  color: ${palette.grey._900};
  background: ${palette.grey._100};
  border: 2px solid ${palette.grey._200};
  border-radius: 8px;
  width: 100%;
  overflow: hidden;
  &:focus-within {
    ${setOutline('blue')}
  }
  border-radius: 8px;
  textarea {
    ${setFont(500, 'normal')}
    resize: none;
    background: none;
    border: none;
    box-shadow: none;
    outline: none;
    flex: 1;
    width: 100%;
    height: 100%;
    padding: 1.5rem 2rem;
  }
`

const SEND_MESSAGE = gql`
  mutation SendMessage($text: String!, $conversationId: String!) {
    sendMessage(text: $text, conversationId: $conversationId)
  }
`

interface Props {
  conversationId: string
}

const MessageForm: React.FC<Props> = ({ conversationId }) => {
  const [text, setText] = useState<string>('')
  const [sendMessage, { error, loading }] = useMutation<SendMessage, SendMessageVariables>(
    SEND_MESSAGE
  )
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const handleSendMessage = () => {
    // Send message to server
    sendMessage({ variables: { text, conversationId } })
    // Reset form
    setText('')
    // Focus message form
    textAreaRef.current.focus()
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Listen for enter key, not shift+enter
    if (e.key === 'Enter' && !e.shiftKey) {
      // Prevent onChange from being called
      e.preventDefault()
      // Send message to server
      handleSendMessage()
    }
  }
  return (
    <div>
      {error && <ErrorCard message="Le message n'a pas pu être envoyé" />}
      <Styles flexDirection="row" alignItems="flex-start" justifyContent="space-between" my="1rem">
        <Textarea
          minRows={1}
          maxRows={8}
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Votre message"
          disabled={loading}
          inputRef={textAreaRef}
          autoFocus
        />
        <Box mt="0.8rem">
          <TextButton
            onClick={handleSendMessage}
            style={{ padding: '0.5rem' }}
            nature="primary"
            disabled={loading}
            smallMargin
          >
            {loading ? 'Envoi...' : 'Envoyer'}
          </TextButton>
        </Box>
      </Styles>
    </div>
  )
}

export default MessageForm
