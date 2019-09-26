import styled from 'styled-components'
import { setOutline } from '../utils/styles'
import { palette } from '../utils/colors'

interface ICreditCardWrapperProps {
  isFocused: boolean
  hasError: boolean
}

const CreditCardWrapper = styled.div`
  padding: 17px 20px;
  border-radius: 8px;
  margin-top: 6px;
  border: 2px solid ${palette.grey._200};
  background: ${palette.grey._100};
  ${(props: ICreditCardWrapperProps) => {
    if (props.isFocused && props.hasError) {
      return setOutline('red')
    }
    if (props.isFocused) {
      return setOutline('blue')
    }
  }}
`

export { CreditCardWrapper }
