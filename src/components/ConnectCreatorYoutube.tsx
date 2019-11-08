import React, { useState } from 'react'
import { GoogleLogin, GoogleLoginResponseOffline } from 'react-google-login'
import { Box } from '@rebass/grid'
import CheckList from './CheckList'
import { MainButton } from '../styles/Button'
import ErrorCard from './ErrorCard'
import YoutubePreview from './YoutubePreview'
import { errorNames } from '../utils/errors'
import gql from 'graphql-tag'
import { CREATOR_PROFILE_FRAGMENT } from './CreatorProfile'
import { useMutation, useQuery } from '@apollo/react-hooks'
import {
  AttachCreatorYoutube,
  AttachCreatorYoutubeVariables,
} from '../__generated__/AttachCreatorYoutube'
import { GET_SESSION } from './Session'
import { GetSession } from '../__generated__/GetSession'
import Loader from './Loader'

export const YOUTUBE_SCOPE =
  'https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/yt-analytics.readonly https://www.googleapis.com/auth/yt-analytics-monetary.readonly'

const ATTACH_CREATOR_YOUTUBE = gql`
  mutation AttachCreatorYoutube($googleCode: String!) {
    attachCreatorYoutubeChannel(googleCode: $googleCode) {
      ...CreatorProfileFragment
    }
  }
  ${CREATOR_PROFILE_FRAGMENT}
`

const ConnectCreatorYoutube: React.FC<{}> = () => {
  // Network requests
  const { data: { session } = { session: null }, ...sessionStatus } = useQuery<GetSession, {}>(
    GET_SESSION
  )
  const [attachCreatorYoutube, attachCreatorYoutubeStatus] = useMutation<
    AttachCreatorYoutube,
    AttachCreatorYoutubeVariables
  >(ATTACH_CREATOR_YOUTUBE)
  const [error, setError] = useState(null)

  if (sessionStatus.loading) {
    return <Loader />
  }
  if (sessionStatus.error) {
    return <ErrorCard />
  }

  const handleAuthSuccess = (response: GoogleLoginResponseOffline) => {
    // Remove hypothetical error
    setError(null)
    // Send code to server to generate access_token and refresh_token
    attachCreatorYoutube({ variables: { googleCode: response.code } })
  }

  // Youtube is already linked, show preview
  if (session.creator.youtube != null) {
    return (
      <>
        <p>You have linked your YouTube channel</p>
        <Box mt="1rem">
          <YoutubePreview youtuberId={session.creator.youtube._id} />
        </Box>
      </>
    )
  }

  // Show the right error message
  const getErrorMessage = (message: string | boolean): string => {
    switch (message) {
      case errorNames.notEnoughFollowers:
        return "You don't have 1000 subscribers"
      default:
        return 'We could not connect your account. Make sure you accept the required permissions'
    }
  }

  // Link Youtube account
  return (
    <div>
      <p>Your channel will be reviewed by our team. It must respect the following rules:</p>
      <Box mt="1.5rem">
        <CheckList items={['At least 1k subscribers', 'At least 10 videos']} />
      </Box>
      {attachCreatorYoutubeStatus.error && (
        <ErrorCard message={getErrorMessage(attachCreatorYoutubeStatus.error.message)} />
      )}
      {error && <ErrorCard />}
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        onSuccess={handleAuthSuccess}
        onFailure={error => setError(error)}
        cookiePolicy="single_host_origin"
        responseType="code"
        accessType="offline"
        scope={YOUTUBE_SCOPE}
        render={renderProps => (
          <MainButton
            onClick={renderProps.onClick}
            disabled={renderProps.disabled || attachCreatorYoutubeStatus.loading}
          >
            {attachCreatorYoutubeStatus.loading ? 'Connecting channel...' : 'Connect my channel'}
          </MainButton>
        )}
      />
    </div>
  )
}

export default ConnectCreatorYoutube
