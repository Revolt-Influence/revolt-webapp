import React from 'react'
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'
import { Flex, Box } from '@rebass/grid'
import queryString from 'query-string'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { Container } from '../utils/grid'
import { Title } from '../styles/Text'
import { FormInput, FormInputLabel, FormSelect } from '../styles/Form'
import { MainButtonSubmit, TextLinkExternal } from '../styles/Button'
import ErrorCard from '../components/ErrorCard'
import { allCountries, allLanguages } from '../utils/locations'
import { emailRegex } from '../utils/strings'
import { palette } from '../utils/colors'
import { Gender } from '../models/Creator'
import { signupInfluencer } from '../actions/session'
import { usePageTitle } from '../utils/hooks'
import { IconButtonWrapper } from '../styles/Icon'
import IState from '../models/State'
import { IRequestStatus } from '../utils/request'

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

const termsLink = 'https://docs.google.com/document/d/1nLrfWKpBxjgQXsrIeISD08FunDNhCLi562HeIaxPdUE/'

const CreatorSignup: React.FC<RouteComponentProps> = ({ location }) => {
  usePageTitle("S'inscrire en tant qu'influenceur")
  const currentYear = new Date().getFullYear()
  // Form data
  const [email, setEmail] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')
  const [phone, setPhone] = React.useState<string>('')
  const [birthYear, setBirthYear] = React.useState<number>(currentYear - 25)
  const [gender, setGender] = React.useState<Gender>('female')
  const [language, setLanguage] = React.useState<string>('French')
  const [country, setCountry] = React.useState<string>('France')
  const [acceptsTerms, setAcceptsTerms] = React.useState<boolean>(false)
  const [hasTermsError, setHasTermsError] = React.useState<boolean>(false)

  // Check if there's an ambassador
  const parsedQuery = queryString.parse(location.search)
  const hasQueryParams = Object.entries(parsedQuery).length > 0
  const ambassador = hasQueryParams ? (parsedQuery as any).ambassador : null

  const dispatch = useDispatch()
  const { isLoading, hasFailed } = useSelector<IState, IRequestStatus>(
    state => state.session.requests.signup
  )

  const handleSubmit = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (!acceptsTerms) {
      setHasTermsError(true)
    } else {
      dispatch(
        signupInfluencer({
          creator: {
            email,
            phone,
            country,
            language,
            birthYear,
            gender,
            picture: null,
            name: null,
            ambassador,
          },
          plainPassword: password,
        })
      )
    }
  }

  return (
    <Container>
      <Box my="3rem">
        <Title isCentered noMargin>
          Rejoignez la communauté
        </Title>
        <p style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          Recevez gratuitement des produits de créateurs indépendants
        </p>
      </Box>
      <Flex flexDirection="column" alignItems="center" mt="1.5rem">
        <Box as="form" width={[1, 10 / 12, 6 / 12]} onSubmit={handleSubmit}>
          {/* Email */}
          <FormInputLabel>
            Email
            <FormInput
              type="email"
              onChange={e => setEmail(e.target.value)}
              value={email}
              pattern={emailRegex}
              placeholder="Votre email"
              required
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
              placeholder="Votre numéro de téléphone"
              required
              hasLabel
            />
          </FormInputLabel>
          <Flex flexDirection="row" justifyContent="space-between" flexWrap="wrap">
            <Box width={[1, 1, 6 / 12]} pr={[0, 0, '1rem']}>
              {/* Phone number */}
              <FormInputLabel withMargin>
                Année de naissance
                <FormSelect
                  fullWidth
                  value={birthYear}
                  onChange={e => setBirthYear(parseInt(e.target.value))}
                >
                  {[...Array(80).keys()]
                    .map(number => currentYear - number - 13)
                    .map(_year => (
                      <option value={_year} key={_year}>
                        {_year}
                      </option>
                    ))}
                </FormSelect>
              </FormInputLabel>
            </Box>
            <Box width={[1, 1, 6 / 12]} pl={[0, 0, '1rem']}>
              <FormInputLabel withMargin>
                Genre
                <FormSelect
                  fullWidth
                  value={gender}
                  onChange={e => setGender(e.target.value as Gender)}
                  required
                >
                  <option value="female">femme</option>
                  <option value="male">homme</option>
                </FormSelect>
              </FormInputLabel>
            </Box>
          </Flex>
          <Flex flexDirection="row" justifyContent="space-between" flexWrap="wrap">
            <Box width={[1, 1, 6 / 12]} pr={[0, 0, '1rem']}>
              <FormInputLabel>
                Langue
                <FormSelect
                  fullWidth
                  value={language}
                  onChange={e => setLanguage(e.target.value)}
                  required
                >
                  {allLanguages.map(_language => (
                    <option value={_language} key={_language}>
                      {_language}
                    </option>
                  ))}
                </FormSelect>
              </FormInputLabel>
            </Box>
            <Box width={[1, 1, 6 / 12]} pl={[0, 0, '1rem']}>
              <FormInputLabel>
                Pays
                <FormSelect
                  fullWidth
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                  required
                >
                  <option value="France">France</option>
                  <option value="United States of America">United States of America</option>
                  {allCountries.map(_country => (
                    <option value={_country} key={_country}>
                      {_country}
                    </option>
                  ))}
                </FormSelect>
              </FormInputLabel>
            </Box>
          </Flex>
          {/* Terms and conditions */}
          <Flex
            flexDirection="row"
            mt="1rem"
            alignItems="flex-start"
            onClick={() => setAcceptsTerms(!acceptsTerms)}
          >
            <IconButtonWrapper style={{ marginRight: 10, height: '22px' }}>
              <img
                src={acceptsTerms ? checkboxChecked : checkboxEmpty}
                alt={acceptsTerms ? 'Oui' : 'Non'}
              />
            </IconButtonWrapper>
            <p style={{ cursor: 'default' }}>
              J'accepte les{' '}
              <TextLinkExternal href={termsLink} target="_blank">
                conditions d'utilisation
              </TextLinkExternal>
            </p>
          </Flex>
          {/* Error states */}
          {hasTermsError && (
            <ErrorCard message="Vous devez accepter les conditions pour continuer" />
          )}
          {hasFailed && <ErrorCard message="Le compte n'a pas pu être créé" />}
          {/* Button submit */}
          <MainButtonSubmit
            type="submit"
            disabled={isLoading}
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

export default withRouter(CreatorSignup)
