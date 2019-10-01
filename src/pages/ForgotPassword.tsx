import { useMutation } from '@apollo/react-hooks'
import { Box, Flex } from '@rebass/grid'
import gql from 'graphql-tag'
import React, { useState } from 'react'
import ErrorCard from '../components/ErrorCard'
import SuccessCard from '../components/SuccessCard'
import { MainButtonSubmit } from '../styles/Button'
import { FormInput, FormInputLabel } from '../styles/Form'
import { Title } from '../styles/Text'
import { Container } from '../utils/grid'
import { usePageTitle } from '../utils/hooks'
import {
  SendResetPasswordEmail,
  SendResetPasswordEmailVariables,
} from '../__generated__/SendResetPasswordEmail'

const SEND_RESET_PASSWORD_EMAIL = gql`
  mutation SendResetPasswordEmail($email: String!) {
    sendResetPasswordEmail(email: $email)
  }
`

const ForgotPassword: React.FC<{}> = () => {
  usePageTitle('Forgot password')
  const [email, setEmail] = useState('')
  const [succeeded, setSucceeded] = useState(false)
  const [sendResetPasswordEmail, { loading, error }] = useMutation<
    SendResetPasswordEmail,
    SendResetPasswordEmailVariables
  >(SEND_RESET_PASSWORD_EMAIL, { onCompleted: () => setSucceeded(true) })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendResetPasswordEmail({ variables: { email } })
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
          {succeeded ? <SuccessCard message="Vous avez reçu un lien par email" /> : null}
          {error ? <ErrorCard message="Le mail n'a pas pu être envoyé" /> : null}
          <MainButtonSubmit
            disabled={loading}
            value={loading ? 'Envoi du mail...' : 'Réinitialiser mon mot de passe'}
          />
        </Box>
      </Flex>
    </Container>
  )
}

export default ForgotPassword
