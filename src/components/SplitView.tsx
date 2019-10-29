import React from 'react'
import styled from 'styled-components'
import { Flex, Box } from '@rebass/grid'
import { palette } from '../utils/colors'
import { setFont } from '../utils/styles'

const Style = styled(Flex)<{ noBorder?: boolean }>`
  ${props => !props.noBorder && `border-top: 3px solid ${palette.grey._200};`}
`

const CardHeader = styled(Box)`
  padding-right: 30px;
  flex-shrink: 0;
  ${setFont(600, 'big')}
`

const Content = styled.div`
  flex: 1;
  width: 100%;
`

interface ISplitViewProps {
  title: string
  ratio?: number
  children: React.ReactChild | React.ReactChild[]
  withMargin?: boolean
  noBorder?: boolean
  noPadding?: boolean
  stacked?: boolean
}

const SplitView: React.FC<ISplitViewProps> = ({
  title,
  children,
  ratio,
  withMargin,
  noBorder,
  noPadding,
  stacked,
}) => {
  const finalRatio = ratio || 4 / 12
  return (
    <Style
      justifyContent="flex-start"
      alignItems="flex-start"
      mb={withMargin ? '3rem' : 0}
      mt={withMargin ? ['2rem', '2rem', '3rem'] : 0}
      py={noPadding ? 0 : ['2.5rem', '2.5rem', '3rem']}
      flexDirection={stacked ? 'column' : ['column', 'column', 'row']}
      width={1}
      noBorder={noBorder}
    >
      <CardHeader width={stacked ? 1 : [1, finalRatio]} mb="1.5rem">
        {title}
      </CardHeader>
      <Content>{children}</Content>
    </Style>
  )
}

export default SplitView
