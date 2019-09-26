import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GoogleLogin, GoogleLoginResponseOffline } from 'react-google-login'
import { Box } from '@rebass/grid'
import IState from '../models/State'
import { ICreator } from '../models/Creator'
import CheckList from './CheckList'
import { MainButton } from '../styles/Button'
import { linkYoutubeChannel } from '../actions/creators'
import ErrorCard from './ErrorCard'
import YoutubePreview from './YoutubePreview'
import { IRequestStatus } from '../utils/request'
import { errorNames } from '../utils/errors'

const ConnectCreatorYoutube: React.FC<{}> = () => {
  const dispatch = useDispatch()
  const creator = useSelector<IState, ICreator>(state => state.session.creator)
  const requestStatus = useSelector<IState, IRequestStatus>(
    state => state.session.requests.linkYoutubeChannel
  )
  const [error, setError] = React.useState(null)

  const handleAuthSuccess = (response: GoogleLoginResponseOffline) => {
    // Remove hypothetical error
    setError(null)
    // Send code to server to generate access_token and refresh_token
    dispatch(linkYoutubeChannel(response.code))
  }

  const scope =
    'https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/yt-analytics.readonly'

  // Youtube is already linked, show preview
  if (creator.youtube != null) {
    return (
      <>
        <p>Vous avez bien connecté votre chaîne YouTube.</p>
        <Box mt="1rem">
          <YoutubePreview youtuber={creator.youtube} />
        </Box>
      </>
    )
  }

  // Show the right error message
  const getErrorMessage = (message: string | boolean): string => {
    switch (message) {
      case errorNames.notEnoughFollowers:
        return "Vous n'avez pas encore 2k abonnés"
      default:
        return "Nous n'avons pas pu connecter votre chaîne. Veillez à bien accorder les permissions demandées"
    }
  }

  // Link Youtube account
  return (
    <div>
      <p>
        Votre chaîne va être vérifiée par notre équipe. Elle doit respecter les règles suivantes :
      </p>
      <Box mt="1.5rem">
        <CheckList items={['Plus de 1000 abonnés', 'Au moins 10 vidéos']} />
      </Box>
      {(error || requestStatus.hasFailed) && (
        <ErrorCard message={getErrorMessage(requestStatus.hasFailed)} />
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
            disabled={renderProps.disabled || requestStatus.isLoading}
          >
            {requestStatus.isLoading ? 'Connexion de la chaîne...' : 'Connecter ma chaîne'}
          </MainButton>
        )}
      />
    </div>
  )
}

export default ConnectCreatorYoutube
