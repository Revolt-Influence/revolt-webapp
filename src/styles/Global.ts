import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import { palette } from '../utils/colors'
import { setFont, setOutline } from '../utils/styles'
import { Theme } from './CustomThemeProvider'

export const GlobalStyle = createGlobalStyle`
  ${reset}
  html {
    font-size: 10px;
    @media screen and (max-width: ${props => (props.theme as Theme).breakpoints[1]}) {
      font-size: 9px;
    }
  }
  body, html {
    padding: 0;
    width: 100%;
    background: ${palette.grey._50};
    color: ${palette.grey._900};
    text-rendering: optimizeLegibility !important;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: subpixel-antialiased;
    -webkit-text-stroke: 1px transparent;
    line-height: 2.5rem;
  }
  body {
    ${setFont(500, 'normal')}
  }
  * {
    box-sizing: border-box;
    &:focus-visible {
      ${setOutline('blue', { isBold: true })}
    }
  }

  button {
    display: inline-block;
    border: none;
    padding: 0;
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    all: unset;
    -webkit-appearance: none;
    -moz-appearance: none;
    box-sizing: border-box;
    cursor: pointer;
    &:focus-visible {
      ${setOutline('blue')}
    }
  }
  input {
    ${setFont(500, 'normal')}
    &[type=submit] {
      outline: unset;
      ${setFont(600, 'normal')}
    }
    -webkit-appearance: none;
    -webkit-border-radius:0px;
  }
  h1 {
    ${setFont(600, 'huge')}
  }
  a {
    color: unset;
    text-decoration: none;
    &:focus-visible {
      ${setOutline('blue')}
    }
  }
  input:not([type="submit"]):focus-visible, textarea:focus-visible, select:focus-visible {
    ${setOutline('blue')}
  }
  input[type="submit"]:focus-visible {
    ${setOutline('blue', { isBold: true })}
  }
`
