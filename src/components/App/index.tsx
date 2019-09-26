import React, { useEffect } from 'react'
import * as Sentry from '@sentry/browser' // must be imported with *
import TagManager from 'react-gtm-module'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { LastLocationProvider } from 'react-router-last-location'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider } from 'react-redux'
import promiseMiddleware from 'redux-promise-middleware'
import { defaultState } from '../../models/State'
import rootReducer from '../../reducers'
import RouterSwitch from '../RouterSwitch'
import Portal from '../PopupsPortal'
import { GlobalStyle } from './style'
import CustomThemeProvider from '../CustomThemeProvider'
import { retrieveUser } from '../../actions/session'

// Create Redux store
const store = createStore(
  rootReducer,
  defaultState,
  composeWithDevTools(applyMiddleware(promiseMiddleware()))
)

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
      <Router>
        <CustomThemeProvider>
          <>
            <GlobalStyle />
            <LastLocationProvider watchOnlyPathname>
              {/* <SocketProvider> */}
              {/* Show the right page */}
              <Route component={RouterSwitch} />
              <Portal />
              {/* </SocketProvider> */}
            </LastLocationProvider>
          </>
        </CustomThemeProvider>
      </Router>
    </Provider>
  )
}

export default App
