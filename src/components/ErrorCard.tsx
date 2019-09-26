import React from 'react'
import { Box } from '@rebass/grid'
import NotificationCard from './NotificationCard'

interface IErrorCardProps {
  message: string
  noMargin?: boolean
}

const ErrorCard: React.FC<IErrorCardProps> = ({ message, noMargin }) => (
  <Box mt={noMargin ? 0 : '2rem'}>
    <NotificationCard nature="error" message={message} />
  </Box>
)

export default ErrorCard
