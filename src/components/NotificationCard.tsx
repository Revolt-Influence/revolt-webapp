import React from 'react'
import styled, { css } from 'styled-components'
import { palette } from '../utils/colors'

const infoSource = require('../images/icons/info_blue.svg')
const warningSource = require('../images/icons/warning_orange.svg')
const successSource = require('../images/icons/success_green.svg')
const errorSource = require('../images/icons/error_red.svg')

type NotificationCardNature = 'info' | 'warning' | 'success' | 'error'

const Styles = styled.div<{ nature: NotificationCardNature }>`
  display: inline-flex;
  flex-direction: row;
  align-items: flex-start;
  border-radius: 8px;
  padding: 1rem;
  ${props => {
    switch (props.nature) {
      case 'info':
        return css`
          background: ${palette.blue._100};
          color: ${palette.blue._900};
          border: 2px solid ${palette.blue._200};
        `
      case 'warning':
        return css`
          background: ${palette.orange._100};
          color: ${palette.orange._900};
          border: 2px solid ${palette.orange._200};
        `
      case 'success':
        return css`
          background: ${palette.green._100};
          color: ${palette.green._900};
          border: 2px solid ${palette.green._200};
        `
      case 'error':
        return css`
          background: ${palette.red._100};
          color: ${palette.red._900};
          border: 2px solid ${palette.red._200};
        `
      default:
        return css`
          background: ${palette.blue._100};
          color: ${palette.blue._900};
          border: 2px solid ${palette.blue._200};
        `
    }
  }}

  img {
    height: 2.5rem;
    width: auto;
    margin-right: 1rem;
  }
`

interface INotificationCardProps {
  nature: NotificationCardNature
  message: string
}

const NotificationCard: React.FC<INotificationCardProps> = ({ nature, message }) => {
  const getIcon = () => {
    switch (nature) {
      case 'info':
        return infoSource
      case 'warning':
        return warningSource
      case 'success':
        return successSource
      case 'error':
        return errorSource
      default:
        return infoSource
    }
  }
  const icon = getIcon()

  return (
    <Styles nature={nature}>
      <img src={icon} alt={`${nature} icon`} />
      <p>{message}</p>
    </Styles>
  )
}

export default NotificationCard
