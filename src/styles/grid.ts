import styled from 'styled-components'
import { Box } from '@rebass/grid'

const CONTAINER_SIZE = '1250px'

const ContainerBox = styled(Box)`
  margin-left: auto;
  margin-right: auto;
  width: ${CONTAINER_SIZE};
  max-width: calc(100vw - 2rem);
`

export { ContainerBox, CONTAINER_SIZE }
