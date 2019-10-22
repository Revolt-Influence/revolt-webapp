import { Box } from '@rebass/grid'
import React from 'react'
import NotificationCard from './NotificationCard'

interface Props {
  message?: string
  noMargin?: boolean
}

const WarningCard: React.FC<Props> = ({ message, noMargin }) => (
  <Box mt={noMargin ? 0 : '2rem'}>
    <NotificationCard nature="warning" message={message} />
  </Box>
)

WarningCard.defaultProps = {
  message: 'Careful!',
}

export default WarningCard
