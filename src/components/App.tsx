import React, { useEffect } from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import * as Sentry from '@sentry/browser' // must be imported with *
import ApolloClient, { gql, InMemoryCache } from 'apollo-boost'
import TagManager from 'react-gtm-module'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { LastLocationProvider } from 'react-router-last-location'
import RouterSwitch from './RouterSwitch'
import CustomThemeProvider from './CustomThemeProvider'
import { GlobalStyle } from '../styles/Global'
import CreatorProfilePanel from './CreatorProfilePanel'
import { GetCreatorPanel_creatorPanel } from '../__generated__/GetCreatorPanel'
import {
  OpenCreatorPanelVariables,
  OpenCreatorPanel_openCreatorPanel,
} from '../__generated__/OpenCreatorPanel'
import { CloseCreatorPanel_closeCreatorPanel } from '../__generated__/CloseCreatorPanel'

const PANEL_ID = 'panel_ID'

const typeDefs = gql`
  type CreatorPanel {
    id: ID!
    isOpen: Boolean!
    creatorId: String
    collabId: String
  }
  extend type Query {
    creatorPanel: CreatorPanel
  }
  extend type Mutation {
    openCreatorPanel(creatorId: String!, collabId: String): CreatorPanel
    closeCreatorPanel: CreatorPanel
  }
`

const resolvers = {
  Mutation: {
    openCreatorPanel: (
      parent,
      args: OpenCreatorPanelVariables,
      context,
      info
    ): OpenCreatorPanel_openCreatorPanel => ({
      __typename: 'CreatorPanel',
      id: PANEL_ID,
      isOpen: true,
      creatorId: args.creatorId,
      collabId: args.collabId,
    }),
    closeCreatorPanel: (parent, args: {}): CloseCreatorPanel_closeCreatorPanel => ({
      __typename: 'CreatorPanel',
      id: PANEL_ID,
      isOpen: false,
      creatorId: null,
      collabId: null,
    }),
  },
}

const defaultCreatorPanel: GetCreatorPanel_creatorPanel = {
  __typename: 'CreatorPanel',
  id: PANEL_ID,
  isOpen: false,
  creatorId: null,
  collabId: null,
}

const cache = new InMemoryCache()

cache.writeData({
  data: {
    creatorPanel: defaultCreatorPanel,
  },
})

// Create Apollo client
const client = new ApolloClient({
  uri: `${process.env.REACT_APP_BACKEND_URL}/graphql`,
  credentials: 'include',
  resolvers,
  typeDefs,
  cache,
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
              <CreatorProfilePanel />
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
