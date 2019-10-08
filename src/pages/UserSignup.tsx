import React, { useState } from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { Flex, Box } from '@rebass/grid'
import queryString from 'query-string'
import styled from 'styled-components'
import { Container } from '../utils/grid'
import { Title } from '../styles/Text'
import { FormInput, FormInputLabel } from '../styles/Form'
import { MainButtonSubmit, TextLinkExternal } from '../styles/Button'
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
import { IconButtonWrapper } from '../styles/Icon'

const checkboxEmpty = require('../images/icons/checkboxEmpty.svg')
const checkboxChecked = require('../images/icons/checkboxChecked.svg')

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

const UserSignup: React.FC<{}> = () => {
  usePageTitle('Brand signup')

  // Form state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [company, setCompany] = useState('')
  const [acceptsTerms, setAcceptsTerms] = useState(false)

  // Router state
  const location = useLocation()
  const history = useHistory()

  // Prepare request
  const [signupUser, { loading, error }] = useMutation<
    SignupUserMutation,
    SignupUserMutationVariables
  >(SIGNUP_USER_MUTATION, {
    refetchQueries: [{ query: GET_SESSION }],
    awaitRefetchQueries: true,
    onCompleted: () => history.push('/'),
  })

  // Check if there's an ambassador
  const parsedQuery = queryString.parse(location.search)
  const hasQueryParams = Object.entries(parsedQuery).length > 0
  const ambassador = hasQueryParams ? (parsedQuery as any).ambassador : null

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

  const allowSubmit = password.length >= 6 && !!email && !!company && acceptsTerms
  return (
    <Container>
      <Box my="3rem">
        <Title isCentered noMargin>
          Create an account
        </Title>
        <p style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          No credit card necessary. Free forever plan
        </p>
      </Box>
      <Flex flexDirection="column" alignItems="center" mt="2rem">
        <Box as="form" onSubmit={handleFormSubmit} width={[1, 10 / 12, 6 / 12]}>
          {/* Email */}
          <FormInputLabel>
            Professional email
            <FormInput
              type="email"
              onChange={e => setEmail(e.target.value)}
              value={email}
              pattern={emailRegex}
              placeholder="Your pro email"
              required
              hasLabel
            />
          </FormInputLabel>
          {/* Company */}
          <FormInputLabel>
            Company
            <FormInput
              type="text"
              onChange={e => setCompany(e.target.value)}
              value={company}
              placeholder="Your employer"
              hasLabel
            />
          </FormInputLabel>
          {/* Password */}
          <FormInputLabel>
            Password
            <FormInput
              type="password"
              onChange={e => setPassword(e.target.value)}
              value={password}
              placeholder="At least 6 characters"
              pattern=".{6,}"
              required
              hasLabel
            />
          </FormInputLabel>
          <Flex
            flexDirection="row"
            mt="1rem"
            alignItems="flex-start"
            onClick={() => setAcceptsTerms(!acceptsTerms)}
          >
            <IconButtonWrapper style={{ marginRight: 10, height: '22px' }}>
              <img
                src={acceptsTerms ? checkboxChecked : checkboxEmpty}
                alt={acceptsTerms ? 'Yes' : 'No'}
              />
            </IconButtonWrapper>
            <p style={{ cursor: 'default' }}>
              I accept the{' '}
              <TextLinkExternal href="/termsAndConditions" target="_blank">
                terms of use
              </TextLinkExternal>
            </p>
          </Flex>
          {error && <ErrorCard message="Could not sign up. The email may already be used" />}
          {/* Button submit */}
          <MainButtonSubmit
            type="submit"
            disabled={loading || !allowSubmit}
            value={loading ? 'Signing up...' : 'Sign up'}
          />
        </Box>
        <Help>
          Already have an account?{' '}
          <HelpLink>
            <Link to="/login">Login</Link>
          </HelpLink>
        </Help>
      </Flex>
    </Container>
  )
}

export default UserSignup
