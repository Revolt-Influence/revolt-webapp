import styled, { css } from 'styled-components'
import { setFont } from '../utils/styles'
import { palette, paletteColorName } from '../utils/colors'

const Status = styled.div<{ color: paletteColorName }>`
  display: inline-block;
  line-height: 3rem;
  padding: 0 1rem;
  border-radius: 1.5rem;
  ${props => {
    switch (props.color) {
      case 'blue':
        return css`
          background: ${palette.blue._200};
          color: ${palette.blue._900};
        `
      case 'green':
        return css`
          background: ${palette.green._200};
          color: ${palette.green._900};
        `
      case 'orange':
        return css`
          background: ${palette.orange._200};
          color: ${palette.orange._900};
        `
      case 'red':
        return css`
          background: ${palette.red._200};
          color: ${palette.red._900};
        `
      case 'pink':
        return css`
          background: ${palette.pink._200};
          color: ${palette.pink._900};
        `
      case 'grey':
        return css`
          background: ${palette.grey._200};
          color: ${palette.grey._900};
        `
      default:
        return css`
          background: ${palette.blue._200};
          color: ${palette.blue._900};
        `
    }
  }}
  ${setFont(600, 'normal')}
`

export { Status }
