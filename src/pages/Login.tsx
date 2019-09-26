import React from 'react'
import { Link } from 'react-router-dom'
import { Flex, Box } from '@rebass/grid'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Container, Row } from '../utils/grid'
import { Title } from '../styles/Text'
import { MainButtonSubmit } from '../styles/Button'
import { FormInput, FormInputLabel } from '../styles/Form'
import { loginUser } from '../actions/session'
import ErrorCard from '../components/ErrorCard'
import IState from '../models/State'
import { IRequestStatus } from '../utils/request'

import { palette } from '../utils/colors'
import { usePageTitle } from '../utils/hooks'

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

const Login: React.FC<{}> = () => {
  const [email, setEmail] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')

  usePageTitle('Se connecter')

  // Redux stuff
  const dispatch = useDispatch()
  const requestStatus = useSelector<IState, IRequestStatus>(state => state.session.requests.login)

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(loginUser({ email, plainPassword: password }))
  }

  const { hasFailed, isLoading } = requestStatus
  return (
    <Container>
      <Flex flexDirection="column" alignItems="center">
        <Title isCentered>Se connecter</Title>
        <Box width={[1, 6 / 12, 5 / 12]}>
          <form onSubmit={handleLogin}>
            <FormInputLabel>
              Email
              <FormInput
                type="email"
                onChange={e => setEmail(e.target.value)}
                value={email}
                placeholder="Votre email"
                hasLabel
                required
              />
            </FormInputLabel>
            <FormInputLabel>
              Mot de passe
              <FormInput
                type="password"
                onChange={e => setPassword(e.target.value)}
                value={password}
                placeholder="Votre mot de passe"
                hasLabel
                required
              />
            </FormInputLabel>
            <Row justify="flex-end">
              <Link to="/forgotPassword">
                <HelpLink>Mot de passe oublié ?</HelpLink>
              </Link>
            </Row>
            {hasFailed && <ErrorCard message="Email ou mot de passe invalide" />}
            <MainButtonSubmit
              disabled={isLoading}
              value={isLoading ? 'Connexion...' : 'Se connecter'}
            />
          </form>
        </Box>
        <Help>
          Vous n'avez pas encore de compte ?{' '}
          <HelpLink>
            <Link to="/">S'inscrire</Link>
          </HelpLink>
        </Help>
      </Flex>
    </Container>
  )
}

export default Login
