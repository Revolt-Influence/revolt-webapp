import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { useClientSize } from '../utils/hooks'

interface Props {
  children: React.ReactChild
}

const Styles = styled.div<{ height: number }>`
  height: ${props => props.height}px;
`

const FullHeightWrapper: React.FC<Props> = ({ children }) => {
  const [topDistance, setTopDistance] = useState<number>(0)
  const measuredRef = useCallback((node: HTMLElement) => {
    if (node !== null) {
      setTopDistance(node.offsetTop)
    }
  }, [])

  const { height } = useClientSize()
  const availableHeight = height - topDistance

  return (
    <div ref={measuredRef}>
      <Styles height={availableHeight}>{children}</Styles>
    </div>
  )
}

export default FullHeightWrapper
