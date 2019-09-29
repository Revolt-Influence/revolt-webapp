import * as Sentry from '@sentry/browser' // must be imported with *
import ApolloClient, { gql } from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import React, { useEffect } from 'react'
import TagManager from 'react-gtm-module'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { LastLocationProvider } from 'react-router-last-location'
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import promiseMiddleware from 'redux-promise-middleware'
import { retrieveUser } from '../../actions/session'
import { defaultState } from '../../models/State'
import rootReducer from '../../reducers'
import CustomThemeProvider from '../CustomThemeProvider'
import Portal from '../PopupsPortal'
import RouterSwitch from '../RouterSwitch'
import { GlobalStyle } from './style'

// Create Redux store
const store = createStore(
  rootReducer,
  defaultState,
  composeWithDevTools(applyMiddleware(promiseMiddleware()))
)

// Create Apollo client
const client = new ApolloClient({
  uri: `${process.env.REACT_APP_BACKEND_URL}/graphql`,
})

const App: React.FC = () => {
  // Retrieve user on mount
  useEffect(() => {
    store.dispatch(retrieveUser())
  }, [])

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
    <Provider store={store}>
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
    </Provider>
  )
}

export default App
