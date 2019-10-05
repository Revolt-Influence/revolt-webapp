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
          Forgot password
        </Title>
        <p style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          Get a link by email to reset your passsword
        </p>
      </Box>
      <Flex flexDirection="column" alignItems="center" mt="1.5rem">
        <Box width={[1, 6 / 12, 5 / 12]} as="form" onSubmit={handleSubmit}>
          <FormInputLabel>
            Email address
            <FormInput
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              hasLabel
            />
          </FormInputLabel>
          {succeeded ? <SuccessCard message="You have received a link by email" /> : null}
          {error ? <ErrorCard message="Could not send the email" /> : null}
          <MainButtonSubmit
            disabled={loading}
            value={loading ? 'Sending the email...' : 'Reset my password'}
          />
        </Box>
      </Flex>
    </Container>
  )
}

export default ForgotPassword
