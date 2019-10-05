import React from 'react'
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

const ATTACH_CREATOR_YOUTUBE = gql`
  mutation AttachCreatorYoutube($youtubeCode: String!) {
    attachCreatorYoutubeChannel(youtubeCode: $youtubeCode) {
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
  const [error, setError] = React.useState(null)

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
    attachCreatorYoutube({ variables: { youtubeCode: response.code } })
  }

  const scope =
    'https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/yt-analytics.readonly'

  // Youtube is already linked, show preview
  if (session.creator.youtube != null) {
    return (
      <>
        <p>Vous avez bien connecté votre chaîne YouTube.</p>
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
      <p>
        Votre chaîne va être vérifiée par notre équipe. Elle doit respecter les règles suivantes :
      </p>
      <Box mt="1.5rem">
        <CheckList items={['At least 1k subscribers', 'At least 10 videos']} />
      </Box>
      {(error || attachCreatorYoutubeStatus.error) && (
        <ErrorCard message={getErrorMessage(attachCreatorYoutubeStatus.error.message)} />
      )}
      <GoogleLogin
        clientId="1084044949036-9vs7ckrse27t3c1kep4k24l8i9rv906k.apps.googleusercontent.com"
        onSuccess={handleAuthSuccess}
        onFailure={error => setError(error)}
        cookiePolicy="single_host_origin"
        responseType="code"
        accessType="offline"
        scope={scope}
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
