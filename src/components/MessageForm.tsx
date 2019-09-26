import React, { useState, useRef } from 'react'
import Textarea from 'react-textarea-autosize'
import { Flex, Box } from '@rebass/grid'
import styled from 'styled-components'
import { palette } from '../utils/colors'
import { setOutline, setFont } from '../utils/styles'
import { TextButton } from '../styles/Button'
import { useDispatch, useSelector } from 'react-redux'
import { sendMessage } from '../actions/conversations'
import IState from '../models/State'
import { IRequestStatus } from '../utils/request'
import ErrorCard from './ErrorCard'

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

interface Props {
  conversationId: string
}

const MessageForm: React.FC<Props> = ({ conversationId }) => {
  const [text, setText] = useState<string>('')
  const dispatch = useDispatch()
  const sendMessageStatus = useSelector<IState, IRequestStatus>(
    state => state.conversations.requests.sendMessage
  )
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const handleSendMessage = () => {
    // Send message to server
    dispatch(sendMessage({ text, conversationId }))
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
      {sendMessageStatus.hasFailed && <ErrorCard message="Le message n'a pas pu être envoyé" />}
      <Styles flexDirection="row" alignItems="flex-start" justifyContent="space-between" my="1rem">
        <Textarea
          minRows={1}
          maxRows={8}
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Votre message"
          disabled={sendMessageStatus.isLoading}
          inputRef={textAreaRef}
          autoFocus
        />
        <Box mt="0.8rem">
          <TextButton
            onClick={handleSendMessage}
            style={{ padding: '0.5rem' }}
            nature="primary"
            disabled={sendMessageStatus.isLoading}
            smallMargin
          >
            {sendMessageStatus.isLoading ? 'Envoi...' : 'Envoyer'}
          </TextButton>
        </Box>
      </Styles>
    </div>
  )
}

export default MessageForm
