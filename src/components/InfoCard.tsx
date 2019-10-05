import { Box } from '@rebass/grid'
import React from 'react'
import NotificationCard from './NotificationCard'

interface Props {
  message?: string
  noMargin?: boolean
}

const InfoCard: React.FC<Props> = ({ message, noMargin }) => (
  <Box mt={noMargin ? 0 : '2rem'}>
    <NotificationCard nature="info" message={message} />
  </Box>
)

InfoCard.defaultProps = {
  message: 'Something went wrong',
}

export default InfoCard
