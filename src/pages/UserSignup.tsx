import React, { useState } from 'react'
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'
import { Flex, Box } from '@rebass/grid'
import queryString from 'query-string'
import styled from 'styled-components'
import { Container } from '../utils/grid'
import { Title } from '../styles/Text'
import { FormInput, FormInputLabel } from '../styles/Form'
import { MainButtonSubmit } from '../styles/Button'
import ErrorCard from '../components/ErrorCard'
import { emailRegex } from '../utils/strings'
import { palette } from '../utils/colors'
import { usePageTitle } from '../utils/hooks'
import gql from 'graphql-tag'
import { SESSION_FRAGMENT, GET_SESSION } from '../components/Session'
import { useMutation } from '@apollo/react-hooks'
import {
  SignupUserMutation,
  SignupUserMutationVariables,
} from '../__generated__/SignupUserMutation'

const Help = styled.p`
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 3rem;
`

const HelpLink = styled.span`
  color: ${palette.blue._700};
`

const SIGNUP_USER_MUTATION = gql`
  mutation SignupUserMutation($user: SignupUserInput!) {
    signupUser(user: $user) {
      ...SessionFragment
    }
  }
  ${SESSION_FRAGMENT}
`

const UserSignup: React.FC<RouteComponentProps> = ({ location }) => {
  // Form state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [company, setCompany] = useState('')

  // Prepare request
  const [signupUser, { loading, error }] = useMutation<
    SignupUserMutation,
    SignupUserMutationVariables
  >(SIGNUP_USER_MUTATION, {
    refetchQueries: [{ query: GET_SESSION }],
    awaitRefetchQueries: true,
  })

  // Check if there's an ambassador
  const parsedQuery = queryString.parse(location.search)
  const hasQueryParams = Object.entries(parsedQuery).length > 0
  const ambassador = hasQueryParams ? (parsedQuery as any).ambassador : null

  usePageTitle("S'inscrire en tant que marque")

  const handleFormSubmit = (e: React.FormEvent<HTMLDivElement>) => {
    // Handle actual form submit
    e.preventDefault()

    signupUser({
      variables: {
        user: {
          email,
          company,
          password,
          ambassador,
        },
      },
    })

    window.scrollTo(0, 0)
  }

  const allowSubmit = password.length >= 6 && !!email && !!company
  return (
    <Container>
      <Box my="3rem">
        <Title isCentered noMargin>
          Créer mon compte
        </Title>
        <p style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          Pas de carte de crédit nécessaire
        </p>
      </Box>
      <Flex flexDirection="column" alignItems="center" mt="2rem">
        <Box as="form" onSubmit={handleFormSubmit} width={[1, 10 / 12, 6 / 12]}>
          {/* Email */}
          <FormInputLabel>
            Email
            <FormInput
              type="email"
              onChange={e => setEmail(e.target.value)}
              value={email}
              pattern={emailRegex}
              placeholder="Votre mail pro"
              required
              hasLabel
            />
          </FormInputLabel>
          {/* Company */}
          <FormInputLabel>
            Entreprise
            <FormInput
              type="text"
              onChange={e => setCompany(e.target.value)}
              value={company}
              placeholder="Votre entreprise"
              hasLabel
            />
          </FormInputLabel>
          {/* Password */}
          <FormInputLabel>
            Mot de passe
            <FormInput
              type="password"
              onChange={e => setPassword(e.target.value)}
              value={password}
              placeholder="Au moins 6 caractères"
              pattern=".{6,}"
              required
              hasLabel
            />
          </FormInputLabel>
          {error && <ErrorCard message="Le compte n'a pas pu être créé" />}
          {/* Button submit */}
          <MainButtonSubmit
            type="submit"
            disabled={loading || !allowSubmit}
            value={loading ? 'Création du compte...' : 'Créer mon compte'}
          />
        </Box>
        <Help>
          Vous avez déjà un compte ?{' '}
          <HelpLink>
            <Link to="/login">Se connecter</Link>
          </HelpLink>
        </Help>
      </Flex>
    </Container>
  )
}

export default withRouter(UserSignup)
