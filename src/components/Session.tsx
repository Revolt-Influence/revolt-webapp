import { useMutation, useQuery } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'
import { Box } from '@rebass/grid'
import gql from 'graphql-tag'
import React from 'react'
import { MainButton } from '../styles/Button'
import { GetSession } from '../__generated__/GetSession'
import { SessionType } from '../__generated__/globalTypes'
import { Logout } from '../__generated__/Logout'
import ErrorCard from './ErrorCard'
import Loader from './Loader'

export const SESSION_FRAGMENT = gql`
  fragment SessionFragment on Session {
    isLoggedIn
    sessionId
    sessionType
    user {
      _id
      email
      hasPaymentMethod
      company
      plan
      isAdmin
    }
    creator {
      _id
      name
      picture
      email
      status
      hasConnectedStripe
      youtube {
        _id
      }
    }
  }
`

export const GET_SESSION = gql`
  query GetSession {
    session {
      ...SessionFragment
    }
  }
  ${SESSION_FRAGMENT}
`

const LOGOUT = gql`
  mutation Logout {
    logout {
      sessionId
    }
  }
`

const Session: React.FC<{}> = () => {
  const history = useHistory()
  // Get session data
  const {
    data: { session } = { session: null },
    loading: sessionLoading,
    error: sessionError,
    client,
  } = useQuery<GetSession>(GET_SESSION)
  const getEmail = () => {
    switch (session.sessionType) {
      case SessionType.BRAND:
        return session.user.email
      case SessionType.CREATOR:
        return session.creator.email
      default:
        return null
    }
  }
  const email = getEmail()

  // Prepare logout
  const [logout, logoutStatus] = useMutation<Logout>(LOGOUT, {
    onCompleted: () => {
      // Reset the cache
      client.resetStore()
      // Redirect home
      history.push('/')
    },
    refetchQueries: [{ query: GET_SESSION }],
    awaitRefetchQueries: true,
  })

  if (sessionLoading) {
    return <Loader />
  }
  if (sessionError) {
    return <ErrorCard />
  }

  return (
    <div>
      <Box mb="1rem">You are connected as {email}</Box>
      {logoutStatus.error ? <ErrorCard message="Could not logout" /> : null}
      <MainButton onClick={() => logout()} disabled={logoutStatus.loading} noMargin inverted>
        {logoutStatus.loading ? 'Logging out...' : 'Log out'}
      </MainButton>
    </div>
  )
}

export default Session
