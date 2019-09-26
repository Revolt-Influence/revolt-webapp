import styled, { css } from 'styled-components'

const iconStyles = css`
  width: 24px;
  height: 24px;
`

const Icon = styled.img`
  ${iconStyles}
`

const IconButtonWrapper = styled.button`
  img {
    ${iconStyles}
  }
`

IconButtonWrapper.defaultProps = {
  type: 'button',
}

export { Icon, IconButtonWrapper }
