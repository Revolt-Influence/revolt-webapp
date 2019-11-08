import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Flex, Box } from '@rebass/grid'
import styled from 'styled-components'
import { Container, Row } from '../utils/grid'
import { Title } from '../styles/Text'
import { MainButtonSubmit, MainButton } from '../styles/Button'
import { FormInput, FormInputLabel } from '../styles/Form'
import ErrorCard from '../components/ErrorCard'
import { palette } from '../utils/colors'
import { usePageTitle } from '../utils/hooks'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { GET_SESSION, SESSION_FRAGMENT } from '../components/Session'
import GoogleLogin, { GoogleLoginResponseOffline } from 'react-google-login'
import { LoginWithGoogle, LoginWithGoogleVariables } from '../__generated__/LoginWithGoogle'
import { LoginWithEmail, LoginWithEmailVariables } from '../__generated__/LoginWithEmail'
import { Divider } from '../utils/styles'

const Help = styled.p`
  text-align: center;
  margin-top: 3rem;
  margin-bottom: 3rem;
`

const HelpLink = styled.span`
  display: inline-block;
  color: ${palette.blue._700};
  margin-top: 0.5rem;
`

const LOGIN_WITH_EMAIL = gql`
  mutation LoginWithEmail($email: String!, $password: String!) {
    loginWithEmail(password: $password, email: $email) {
      ...SessionFragment
    }
  }
  ${SESSION_FRAGMENT}
`

const LOGIN_WITH_GOOGLE = gql`
  mutation LoginWithGoogle($googleCode: String!) {
    loginWithGoogle(googleCode: $googleCode) {
      ...SessionFragment
    }
  }
  ${SESSION_FRAGMENT}
`

const Login: React.FC<{}> = () => {
  usePageTitle('Log in')
  const history = useHistory()

  // Form state
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [googleAuthError, setGoogleAuthError] = useState(null)

  // Server requests
  const [loginWithEmail, { error: emailError, loading: emailLoading }] = useMutation<
    LoginWithEmail,
    LoginWithEmailVariables
  >(LOGIN_WITH_EMAIL, {
    onCompleted: () => history.push('/'),
    refetchQueries: [{ query: GET_SESSION }],
    awaitRefetchQueries: true,
  })
  const [loginWithGoogle, { error: googleError, loading: googleLoading }] = useMutation<
    LoginWithGoogle,
    LoginWithGoogleVariables
  >(LOGIN_WITH_GOOGLE, {
    onCompleted: () => history.push('/'),
    refetchQueries: [{ query: GET_SESSION }],
    awaitRefetchQueries: true,
  })

  const handleEmailLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Hash password on server
    loginWithEmail({ variables: { email, password } })
  }

  const handleGoogleLogin = async (response: GoogleLoginResponseOffline) => {
    // Reset hypothetical error
    setGoogleAuthError(null)
    // Send code to server to signup user
    loginWithGoogle({ variables: { googleCode: response.code } })
  }

  return (
    <Container>
      <Flex flexDirection="column" alignItems="center">
        <Title isCentered>Log in</Title>
        <Box width={[1, 6 / 12, 4 / 12]}>
          {(googleAuthError || googleError) && <ErrorCard message="Could not log in with Google" />}
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            onSuccess={handleGoogleLogin}
            onFailure={error => setGoogleAuthError(error)}
            cookiePolicy="single_host_origin"
            responseType="code"
            accessType="offline"
            render={renderProps => (
              <MainButton
                onClick={renderProps.onClick}
                disabled={renderProps.disabled || googleLoading}
                display="block"
                inverted
              >
                {googleLoading ? 'Logging in...' : 'Log in with Google account'}
              </MainButton>
            )}
          />
          <Divider />
          <form onSubmit={handleEmailLogin}>
            <FormInputLabel withMargin>
              Email
              <FormInput
                type="email"
                onChange={e => setEmail(e.target.value)}
                value={email}
                placeholder="Your email"
                hasLabel
                required
              />
            </FormInputLabel>
            <FormInputLabel>
              Password
              <FormInput
                type="password"
                onChange={e => setPassword(e.target.value)}
                value={password}
                placeholder="Your password"
                hasLabel
                required
              />
            </FormInputLabel>
            <Row justify="flex-end">
              <Link to="/forgotPassword">
                <HelpLink>Forgot your password?</HelpLink>
              </Link>
            </Row>
            {emailError && <ErrorCard message="Invalid email or password" />}
            <MainButtonSubmit
              disabled={emailLoading || googleLoading}
              value={emailLoading ? 'Logging in...' : 'Log in with email'}
              display="block"
            />
          </form>
        </Box>
        <Help>
          Don't have an account yet?{' '}
          <HelpLink>
            <Link to="/">Sign up</Link>
          </HelpLink>
        </Help>
      </Flex>
    </Container>
  )
}

export default Login
