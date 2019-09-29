import { ApolloProvider } from '@apollo/react-hooks'
import * as Sentry from '@sentry/browser' // must be imported with *
import ApolloClient from 'apollo-boost'
import React, { useEffect } from 'react'
import TagManager from 'react-gtm-module'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { LastLocationProvider } from 'react-router-last-location'
import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import { palette } from '../utils/colors'
import { setFont, setOutline } from '../utils/styles'
import CustomThemeProvider, { Theme } from './CustomThemeProvider'
import Portal from './PopupsPortal'
import RouterSwitch from './RouterSwitch'

const GlobalStyle = createGlobalStyle`
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

// Create Apollo client
const client = new ApolloClient({
  uri: `${process.env.REACT_APP_BACKEND_URL}/graphql`,
})

const App: React.FC = () => {
  // Setup production services
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      // Setup bug tracking
      Sentry.init({
        dsn: 'https://0a2754312d7b46ca87aea9d97c85d2e4@sentry.io/1370888',
      })
      // Setup analytics
      TagManager.initialize({ gtmId: process.env.REACT_APP_GTM_ID })
    }
  }, []) // Only run on mount

  return (
    <ApolloProvider client={client}>
      <Router>
        <CustomThemeProvider>
          <>
            <GlobalStyle />
            <LastLocationProvider watchOnlyPathname>
              {/* Show the right page */}
              <Route component={RouterSwitch} />
              <Portal />
            </LastLocationProvider>
          </>
        </CustomThemeProvider>
      </Router>
    </ApolloProvider>
  )
}

export default App
