import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import { palette } from '../utils/colors'
import { setFont, shadow } from '../utils/styles'

type ButtonNature = 'primary' | 'success' | 'neutral' | 'danger' | 'warning'

interface ITextButtonProps {
  nature?: ButtonNature
  noMargin?: boolean
  smallMargin?: boolean
}

const TextButton = styled.button<ITextButtonProps>`
  ${props => {
    switch (props.nature) {
      case 'primary':
        return css`
          color: ${palette.blue._600};
          &:hover:not(:disabled) {
            color: ${palette.blue._700};
          }
        `
      case 'success':
        return css`
          color: ${palette.green._500};
          &:hover:not(:disabled) {
            color: ${palette.green._600};
          }
        `
      case 'warning':
        return css`
          color: ${palette.orange._500};
          &:hover:not(:disabled) {
            color: ${palette.orange._600};
          }
        `
      case 'danger':
        return css`
          color: ${palette.red._700};
          &:hover:not(:disabled) {
            color: ${palette.red._800};
          }
        `
      default:
        return css`
          color: ${palette.grey._800};
          &:hover:not(:disabled) {
            color: ${palette.grey._900};
          }
        `
    }
  }}
  cursor: pointer;
  margin: 0 ${props => {
    if (props.noMargin) {
      return '0'
    } else {
      return props.smallMargin ? '1.5rem' : '2.5rem'
    }
  }}
  border-radius: 8px;
  transform: 0.3s all ease-in-out;
  ${setFont(600, 'normal')}
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

interface IMainButtonProps {
  inverted?: boolean
  disabled?: boolean
  noMargin?: boolean
  nature?: ButtonNature
  display?: 'inline' | 'block'
  smaller?: boolean
  smallMargin?: boolean
}

const buttonStyles = css<IMainButtonProps>`
  ${props => {
    // Display
    switch (props.display) {
      case 'inline':
        return css`
          display: inline-block;
        `
      case 'block':
        return css`
          display: block;
          width: 100%;
        `
      default:
        return css`
          display: inline-block;
        `
    }
  }}
  border-radius: 8px;
  ${props => {
    if (props.nature === 'danger') {
      return css`
        background: ${palette.red._500};
        color: ${palette.red._500};
        border: 2px solid ${palette.red._500};
        &:hover:not(:disabled) {
          background: ${palette.red._600};
        }
      `
    }
    if (props.nature === 'warning') {
      return css`
        background: ${palette.orange._500};
        color: ${palette.orange._500};
        border: 2px solid ${palette.orange._500};
        &:hover:not(:disabled) {
          background: ${palette.orange._600};
        }
      `
    }
    if (props.nature === 'success') {
      return css`
        background: ${palette.green._600};
        color: ${palette.green._600};
        border: 2px solid ${palette.green._600};
        &:hover:not(:disabled) {
          background: ${palette.green._700};
        }
      `
    }
    // Primary and default
    return css`
      background: ${props.theme.primary._500};
      color: ${props.theme.primary._500};
      border: 2px solid ${props.theme.primary._500};
      &:hover:not(:disabled) {
        background: ${props.theme.primary._600};
      }
    `
  }};
  ${props => {
    if (props.inverted) {
      return css`
        background: transparent;
        &:hover:not(:disabled) {
          background: transparent;
        }
      `
    }
    return css`
      /* Should overwrite the previous declarations */
      color: ${palette.grey._50};
      border: 0;
    `
  }}
  box-shadow: ${props => (props.inverted ? 'none' : shadow._200)};
  text-align: center;
  transition: all 0.3s ease-in-out;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  ${props => {
    if (props.noMargin) {
      return css`
        margin: 0;
      `
    }
    return css`
      margin-top: 15px;
    `
  }}
  ${props => {
    if (props.smaller) {
      return css`
        padding: 5px 10px;
        ${!props.noMargin
          ? css`
              margin-top: 10px;
            `
          : null}
      `
    }
    return css`
      padding: ${props.inverted ? '1.3rem' : '1.5rem'} 2rem;
    `
  }}

  ${setFont(600, 'normal')}
  line-height: normal;
  &:hover:not(:disabled) {
    box-shadow: ${props => (props.inverted ? 'none' : shadow._400)};
  }
  opacity: ${props => (props.disabled ? '0.6' : '1')};
`

const MainButton = styled.button`
  ${buttonStyles}
`

MainButton.defaultProps = {
  type: 'button',
}

interface MainLinkProps extends IMainButtonProps {
  disabled?: boolean
}
const MainLink = styled(Link)<MainLinkProps>`
  ${buttonStyles}
  ${props =>
    props.disabled &&
    css`
      cursor: not-allowed;
      pointer-events: none;
    `}
`

export const MainLinkExternal = styled.a`
  ${buttonStyles}
`

const MainButtonSubmit = styled.input`
  ${buttonStyles}
`

MainButtonSubmit.defaultProps = {
  type: 'submit',
}

const TextLinkExternal = styled.a`
  color: ${palette.blue._500};
  text-decoration: underline;
  transform: color 0.3s ease-in-out;
  &:hover,
  &:focus-visible {
    color: ${palette.blue._600};
  }
`

TextLinkExternal.defaultProps = {
  target: '_blank',
  rel: 'noopener',
}

export { TextButton, MainButton, MainLink, MainButtonSubmit, TextLinkExternal }
