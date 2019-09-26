import styled from 'styled-components'
import { setFont } from '../utils/styles'
import { palette } from '../utils/colors'

const Price = styled.div`
  display: inline-block;
  margin-top: 2px;
  color: ${palette.green._900};
  border: 2px solid ${palette.green._300};
  background: ${palette.green._100};
  padding: 4px 10px;
  border-radius: 8px;
  ${setFont(600, 'normal')}
`

export { Price }
