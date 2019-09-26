import React, { useState, useCallback } from 'react'
import { ContainerBox } from '../styles/grid'
import { Flex } from '@rebass/grid'
import styled from 'styled-components'
import { useClientSize } from '../utils/hooks'

const FullHeightRow = styled(Flex)<{ height: string }>`
  height: 100%;
  @media screen and (min-width: ${props => props.theme.breakpoints[1]}) {
    height: ${props => props.height};
  }
`

const Column = styled(Flex)`
  @media screen and (min-width: ${props => props.theme.breakpoints[1]}) {
    height: 100%;
    max-height: 100%;
    min-height: 100%;
    overflow-y: scroll;
  }
`

interface Props {
  leftComponent: () => React.ReactChild
  rightComponent: () => React.ReactChild
  ratio?: number
  noPadding?: boolean
}

/**
 *
 * @description Full height split screen. Make sure you disable the footer for the component
 */
const FullHeightColumns: React.FC<Props> = ({
  ratio,
  leftComponent,
  rightComponent,
  noPadding,
}) => {
  // Calculate distance from top of document
  const [topDistance, setTopDistance] = useState(0)
  const measuredRef = useCallback((node: HTMLElement) => {
    if (node !== null) {
      setTopDistance(node.offsetTop)
    }
  }, [])

  const { height } = useClientSize()

  const availableHeight = height - topDistance

  return (
    <ContainerBox ref={measuredRef} height="100%">
      <FullHeightRow height={`${availableHeight}px`} flexWrap="wrap">
        <Column
          width={[1, 1, ratio]}
          flexDirection="column"
          alignItems="flex-start"
          pt={noPadding ? 0 : ['1rem', '1rem', '2rem']}
          pr={noPadding ? 0 : [0, 0, '1rem']}
          pb={noPadding ? 0 : ['1rem', '1rem', '2rem']}
        >
          {leftComponent()}
        </Column>
        <Column
          width={[1, 1, 1 - ratio]}
          pt={noPadding ? 0 : ['1rem', '1rem', '2rem']}
          pl={noPadding ? 0 : [0, 0, '1rem']}
          pb={noPadding ? 0 : '2rem'}
        >
          {rightComponent()}
        </Column>
      </FullHeightRow>
    </ContainerBox>
  )
}

FullHeightColumns.defaultProps = {
  ratio: 1 / 3,
}

export default FullHeightColumns
