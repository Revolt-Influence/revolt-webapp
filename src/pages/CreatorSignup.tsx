import React, { useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
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
import { IconButtonWrapper } from '../styles/Icon'
import gql from 'graphql-tag'
import { SESSION_FRAGMENT, GET_SESSION } from '../components/Session'
import { useMutation } from '@apollo/react-hooks'
import {
  SignupCreatorMutation,
  SignupCreatorMutationVariables,
} from '../__generated__/SignupCreatorMutation'

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

const SIGNUP_CREATOR_MUTATION = gql`
  mutation SignupCreatorMutation($creator: SignupCreatorInput!) {
    signupCreator(creator: $creator) {
      ...SessionFragment
    }
  }
  ${SESSION_FRAGMENT}
`

const CreatorSignup: React.FC<{}> = () => {
  usePageTitle('Influencer signup')

  // Router stuff
  const history = useHistory()
  const location = useLocation()

  const [signupCreator, { loading, error }] = useMutation<
    SignupCreatorMutation,
    SignupCreatorMutationVariables
  >(SIGNUP_CREATOR_MUTATION, {
    refetchQueries: [{ query: GET_SESSION }],
    awaitRefetchQueries: true,
    onCompleted: () => history.push('/'),
  })

  // Form data
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [acceptsTerms, setAcceptsTerms] = useState<boolean>(false)

  // Check if there's an ambassador
  const parsedQuery = queryString.parse(location.search)
  const hasQueryParams = Object.entries(parsedQuery).length > 0
  const ambassador = hasQueryParams ? (parsedQuery as any).ambassador : null

  const allowSubmit = email && password && acceptsTerms

  const handleSubmit = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault()
    signupCreator({
      variables: {
        creator: {
          email,
          password,
          ambassador,
        },
      },
    })
  }

  return (
    <Container>
      <Box my="3rem">
        <Title isCentered noMargin>
          Join the community
        </Title>
      </Box>
      <Flex flexDirection="column" alignItems="center" mt="1.5rem">
        <Box as="form" width={[1, 8 / 12, 5 / 12]} onSubmit={handleSubmit}>
          {/* Email */}
          <FormInputLabel>
            Email
            <FormInput
              type="email"
              onChange={e => setEmail(e.target.value)}
              value={email}
              pattern={emailRegex}
              placeholder="Your email"
              required
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
          {/* Terms and conditions */}
          <Flex
            flexDirection="row"
            mt="1.5rem"
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
          {/* Error states */}
          {error && <ErrorCard message="Could not sign up. This email may be used already" />}
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

export default CreatorSignup
