import React from 'react'
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'
import { Flex, Box } from '@rebass/grid'
import queryString from 'query-string'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Container } from '../utils/grid'
import { Title } from '../styles/Text'
import { FormInput, FormInputLabel } from '../styles/Form'
import { MainButtonSubmit } from '../styles/Button'
import { IUser } from '../models/User'
import { signupUser } from '../actions/session'
import ErrorCard from '../components/ErrorCard'
import { emailRegex } from '../utils/strings'
import IState from '../models/State'
import { IRequestStatus } from '../utils/request'
import { palette } from '../utils/colors'
import { usePageTitle } from '../utils/hooks'

const Help = styled.p`
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 3rem;
`

const HelpLink = styled.span`
  color: ${palette.blue._700};
`

const BrandSignup: React.FC<RouteComponentProps> = ({ location }) => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [company, setCompany] = React.useState('')

  const { isLoading, hasFailed } = useSelector<IState, IRequestStatus>(
    state => state.session.requests.signup
  )

  // Check if there's an ambassador
  const parsedQuery = queryString.parse(location.search)
  const hasQueryParams = Object.entries(parsedQuery).length > 0
  const ambassador = hasQueryParams ? (parsedQuery as any).ambassador : null

  usePageTitle("S'inscrire en tant que marque")

  const dispatch = useDispatch()
  const handleFormSubmit = (e: React.FormEvent<HTMLDivElement>) => {
    // Handle actual form submit
    e.preventDefault()
    const user: IUser = {
      email,
      phone,
      company,
      passwordHash: null,
      signupDate: Date.now(),
      switchToPremiumDate: null,
      plan: 'free',
      creditCardLast4: null,
      firstName: null,
      lastName: null,
      hasVerifiedEmail: false,
      ambassador,
    }
    dispatch(signupUser({ user, plainPassword: password }))
    window.scrollTo(0, 0)
  }

  const allowSubmit = password.length >= 6 && !!email && !!company && !!phone
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
          {/* Phone number */}
          <FormInputLabel>
            Numéro de téléphone
            <FormInput
              type="tel"
              onChange={e => setPhone(e.target.value)}
              value={phone}
              placeholder="06 XX XX XX XX"
              required
              hasLabel
            />
          </FormInputLabel>
          {hasFailed && <ErrorCard message="Le compte n'a pas pu être créé" />}
          {/* Button submit */}
          <MainButtonSubmit
            type="submit"
            disabled={isLoading || !allowSubmit}
            value={isLoading ? 'Création du compte...' : 'Créer mon compte'}
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

export default withRouter(BrandSignup)
