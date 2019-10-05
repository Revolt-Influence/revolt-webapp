import React, { useEffect } from 'react'
import styled, { css } from 'styled-components'
import { shadow } from '../utils/styles'
import { palette } from '../utils/colors'

const infoSource = require('../images/icons/info_blue.svg')
const successSource = require('../images/icons/success_green.svg')
const errorSource = require('../images/icons/error_red.svg')

type Nature = 'info' | 'success' | 'error'

const Styles = styled.div<{ nature: Nature }>`
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  ${props => {
    switch (props.nature) {
      case 'info':
        return css`
          background: ${palette.blue._100};
          border: 2px solid ${palette.blue._300};
        `
      case 'success':
        return css`
          background: ${palette.green._100};
          border: 2px solid ${palette.green._300};
        `
      case 'error':
        return css`
          background: ${palette.red._100};
          border: 2px solid ${palette.red._300};
        `
      default:
        return css`
          background: ${palette.blue._100};
          border: 2px solid ${palette.blue._300};
        `
    }
  }}
  box-shadow: ${shadow._200};
  padding: 1.5rem 3rem;
  z-index: 200;
  border-radius: 8px;

  .icon {
    width: 2.5rem;
    height: auto;
    margin-right: 1.5rem;
  }
`

interface IToastProps {
  disappear?: boolean
  nature: Nature
  text: string
}

const Toast: React.FunctionComponent<IToastProps> = ({ disappear, nature, text }) => {
  const [isShown, setIsShown] = React.useState<boolean>(true)

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      // Timeout end
      if (disappear && isShown) {
        setIsShown(false)
      }
    }, 5000)
    // Cancel timeout on unmount
    return () => window.clearTimeout(timeout)
  }) // Every render

  if (!isShown) return null

  const getImage = () => {
    switch (nature) {
      case 'info':
        return infoSource
      case 'error':
        return errorSource
      case 'success':
        return successSource
      default:
        return infoSource
    }
  }

  return (
    <Styles nature={nature}>
      <img className="icon" src={getImage()} alt={nature} />
      <p>{text}</p>
    </Styles>
  )
}

export default Toast
