import React, { useEffect } from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import * as Sentry from '@sentry/browser' // must be imported with *
import ApolloClient from 'apollo-boost'
import TagManager from 'react-gtm-module'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { LastLocationProvider } from 'react-router-last-location'
import RouterSwitch from './RouterSwitch'
import PopupsPortal from './PopupsPortal'
import CustomThemeProvider from './CustomThemeProvider'
import { GlobalStyle } from '../styles/Global'
import CreatorProfilePanel from './CreatorProfilePanel'

// Create Apollo client
const client = new ApolloClient({
  uri: `${process.env.REACT_APP_BACKEND_URL}/graphql`,
  credentials: 'include',
  clientState: {
    resolvers: {},
    defaults: {},
  },
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
              {/* Show items that don't depend on the router */}
              <PopupsPortal />
              {/* <CreatorProfilePanel /> */}
              {/* Show the right page */}
              <Route component={RouterSwitch} />
            </LastLocationProvider>
          </>
        </CustomThemeProvider>
      </Router>
    </ApolloProvider>
  )
}

export default App
