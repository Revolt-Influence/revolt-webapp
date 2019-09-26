import React from 'react'
import { Flex, Box } from '@rebass/grid'
import { useSelector, useDispatch } from 'react-redux'
import { Title } from '../styles/Text'
import { MainButtonSubmit } from '../styles/Button'
import { FormInput, FormInputLabel } from '../styles/Form'
import { Container } from '../utils/grid'
import { IRequestStatus } from '../utils/request'
import SuccessCard from '../components/SuccessCard'
import ErrorCard from '../components/ErrorCard'
import { usePageTitle } from '../utils/hooks'
import IState from '../models/State'
import { sendResetPasswordLink } from '../actions/session'

const ForgotPassword: React.FC<{}> = () => {
  usePageTitle('Mot de passe oublié')
  const [email, setEmail] = React.useState('')
  const dispatch = useDispatch()
  const { isLoading, hasFailed, hasSucceeded } = useSelector<IState, IRequestStatus>(
    state => state.session.requests.sendResetPasswordLink
  )

  const handleSubmit = (e: React.FormEvent) => {
    console.log('submit')
    e.preventDefault()
    dispatch(sendResetPasswordLink(email))
    setEmail('')
  }

  return (
    <Container>
      <Box my="3rem">
        <Title isCentered noMargin>
          Mot de passe oublié{' '}
        </Title>
        <p style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          Recevez un lien par mail pour le réinitialiser
        </p>
      </Box>
      <Flex flexDirection="column" alignItems="center" mt="1.5rem">
        <Box width={[1, 6 / 12, 5 / 12]} as="form" onSubmit={handleSubmit}>
          <FormInputLabel>
            Adresse email
            <FormInput
              type="email"
              placeholder="Votre adresse email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              hasLabel
            />
          </FormInputLabel>
          {hasSucceeded ? <SuccessCard message="Vous avez reçu un lien par email" /> : null}
          {hasFailed ? <ErrorCard message="Le mail n'a pas pu être envoyé" /> : null}
          <MainButtonSubmit
            disabled={isLoading}
            value={isLoading ? 'Envoi du mail...' : 'Réinitialiser mon mot de passe'}
          />
        </Box>
      </Flex>
    </Container>
  )
}

export default ForgotPassword
