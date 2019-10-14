import styled, { css } from 'styled-components'
import { palette } from '../utils/colors'

export const MessageBubble = styled.div<{ isFromMe: boolean }>`
  display: inline-block;
  padding: 1rem 2rem;
  border-radius: 2rem;
  max-width: 65rem;
  white-space: pre-wrap;
  ${props => {
    if (props.isFromMe) {
      return css`
        align-self: flex-end;
        background: ${props.theme.accent._200};
      `
    } else {
      return css`
        align-self: flex-start;
        background: ${palette.grey._200};
      `
    }
  }}
`
