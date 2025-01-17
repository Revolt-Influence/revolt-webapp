import { Box } from '@rebass/grid'
import React from 'react'
import NotificationCard from './NotificationCard'

interface Props {
  message?: string
  noMargin?: boolean
}

const ErrorCard: React.FC<Props> = ({ message, noMargin }) => (
  <Box mt={noMargin ? 0 : '2rem'}>
    <NotificationCard nature="error" message={message} />
  </Box>
)

ErrorCard.defaultProps = {
  message: 'Something went wrong',
}

export default ErrorCard
