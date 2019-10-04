import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Flex, Box } from '@rebass/grid'
import styled from 'styled-components'
import { Container, Row } from '../utils/grid'
import { Title } from '../styles/Text'
import { MainButtonSubmit } from '../styles/Button'
import { FormInput, FormInputLabel } from '../styles/Form'
import ErrorCard from '../components/ErrorCard'
import { palette } from '../utils/colors'
import { usePageTitle } from '../utils/hooks'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { LoginMutation, LoginMutationVariables } from '../__generated__/LoginMutation'
import { GET_SESSION } from '../components/Session'

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

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(password: $password, email: $email) {
      isLoggedIn
      sessionId
      sessionType
      user {
        email
      }
      creator {
        email
      }
    }
  }
`

const Login: React.FC<{}> = () => {
  usePageTitle('Login')
  const history = useHistory()

  // Form state
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  // Server requests
  const [login, { error, loading }] = useMutation<LoginMutation, LoginMutationVariables>(
    LOGIN_MUTATION,
    {
      onCompleted: () => history.push('/'),
      refetchQueries: [{ query: GET_SESSION }],
      awaitRefetchQueries: true,
    }
  )

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    login({ variables: { email, password } })
  }

  return (
    <Container>
      <Flex flexDirection="column" alignItems="center">
        <Title isCentered>Login</Title>
        <Box width={[1, 6 / 12, 5 / 12]}>
          <form onSubmit={handleLogin}>
            <FormInputLabel>
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
            {error && <ErrorCard message="Invalid email or password" />}
            <MainButtonSubmit disabled={loading} value={loading ? 'Login...' : 'Login'} />
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
