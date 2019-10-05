import React from 'react'
import { Box } from '@rebass/grid'
import NotificationCard from './NotificationCard'

interface Props {
  message: string
  noMargin?: boolean
}

const SuccessCard: React.FC<Props> = ({ message, noMargin }) => (
  <Box mt={noMargin ? 0 : '2rem'}>
    <NotificationCard nature="success" message={message} />
  </Box>
)

export default SuccessCard
