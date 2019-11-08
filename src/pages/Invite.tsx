import React, { useEffect, useState } from 'react'
import { useRouteMatch, useHistory } from 'react-router-dom'
import { ContainerBox } from '../styles/grid'
import { Title } from '../styles/Text'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_SESSION, SESSION_FRAGMENT } from '../components/Session'
import { GetSession } from '../__generated__/GetSession'
import ProductPresentation, { GET_PRODUCT } from '../components/ProductPresentation'
import { MainButton } from '../styles/Button'
import { GetProduct, GetProductVariables } from '../__generated__/GetProduct'
import Loader from '../components/Loader'
import ErrorCard from '../components/ErrorCard'
import GoogleLogin, { GoogleLoginResponseOffline } from 'react-google-login'
import { YOUTUBE_SCOPE } from '../components/ConnectCreatorYoutube'
import gql from 'graphql-tag'
import {
  SignupCreatorWithYoutube,
  SignupCreatorWithYoutubeVariables,
} from '../__generated__/SignupCreatorWithYoutube'

const SIGNUP_CREATOR_WITH_YOUTUBE = gql`
  mutation SignupCreatorWithYoutube($googleCode: String!) {
    signupCreatorWithYoutube(googleCode: $googleCode) {
      ...SessionFragment
    }
  }
  ${SESSION_FRAGMENT}
`

function useRedirectCreators(campaignId: string) {
  // Router data
  const history = useHistory()
  // Check if logged in
  const { data: { session } = { session: null } } = useQuery<GetSession>(GET_SESSION)
  // If logged in, redirect to the regular product page
  useEffect(() => {
    if (session.isLoggedIn) {
      history.push(`/creator/games/${campaignId}`)
    }
  }, [campaignId, history, session.isLoggedIn])
}

const Invite: React.FC<{}> = () => {
  const [youtubeError, setYoutubeError] = useState<boolean>(false)
  const [signupCreatorWithYoutube] = useMutation<
    SignupCreatorWithYoutube,
    SignupCreatorWithYoutubeVariables
  >(SIGNUP_CREATOR_WITH_YOUTUBE, { refetchQueries: [{ query: GET_SESSION }] })

  // Read campaign id from URL
  const match = useRouteMatch<{ campaignId: string }>()
  const campaignId = match.params.campaignId
  // Redirect logged in creators to the regular product page
  useRedirectCreators(campaignId)

  const { data: { campaign } = { campaign: null }, loading, error } = useQuery<
    GetProduct,
    GetProductVariables
  >(GET_PRODUCT, { variables: { campaignId } })

  if (loading) {
    return <Loader fullScreen />
  }
  if (error) {
    return <ErrorCard message="Could not load your partnership proposition" />
  }

  const handleAuthSuccess = async (response: GoogleLoginResponseOffline) => {
    // Remove hypothetical error
    setYoutubeError(null)
    // Send code to server to signup user
    await signupCreatorWithYoutube({ variables: { googleCode: response.code } })
    console.log('ITS DONE. SIGNUPED.')
  }

  const showButton = () => (
    <div>
      {youtubeError && (
        <ErrorCard message="Could not connect YouTube. Make sure you accept the required permissions" />
      )}

      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        onSuccess={handleAuthSuccess}
        onFailure={error => setYoutubeError(error)}
        cookiePolicy="single_host_origin"
        responseType="code"
        accessType="offline"
        scope={YOUTUBE_SCOPE}
        render={renderProps => (
          <MainButton onClick={renderProps.onClick} disabled={renderProps.disabled}>
            Send my quote with YouTube
          </MainButton>
        )}
      />
    </div>
  )

  return (
    <ContainerBox>
      <Title>Partnership proposition</Title>
      <p>
        You've been selected by {campaign.brand.name} to promote {campaign.product.name}.
      </p>
      <p>Connect your YouTube account to send a quote!</p>
      {showButton()}
      <ProductPresentation campaignId={campaignId} />
      {showButton()}
    </ContainerBox>
  )
}

export default Invite
