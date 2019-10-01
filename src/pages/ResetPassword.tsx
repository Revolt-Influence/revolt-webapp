import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Flex } from '@rebass/grid'
import ErrorCard from '../components/ErrorCard'
import SuccessCard from '../components/SuccessCard'
import { Title } from '../styles/Text'
import { FormInputLabel, FormInput } from '../styles/Form'
import { MainButtonSubmit, MainLink } from '../styles/Button'
import { usePageTitle } from '../utils/hooks'
import { ContainerBox } from '../styles/grid'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import {
  ResetPasswordMutation,
  ResetPasswordMutationVariables,
} from '../__generated__/ResetPasswordMutation'

const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPasswordMutation($newPassword: String!, $token: String!) {
    resetPasswordViaEmail(newPassword: $newPassword, token: $token)
  }
`

interface RouterProps {
  token: string
}

interface Props extends RouteComponentProps<RouterProps> {}

const ResetPassword: React.FC<Props> = ({ match }) => {
  // Page management
  usePageTitle('Réinitialiser le mot de passe')
  const { token } = match.params
  // Form state
  const [newPassword, setNewPassword] = useState<string>('')
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('')
  const [succeeded, setSucceeded] = useState<boolean>(false)
  // Server requests
  const [resetPassword, { loading, error }] = useMutation<
    ResetPasswordMutation,
    ResetPasswordMutationVariables
  >(RESET_PASSWORD_MUTATION, { onCompleted: () => setSucceeded(true) })

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    resetPassword({ variables: { newPassword, token } })
  }

  return (
    <ContainerBox>
      <Flex justifyContent="center" flexDirection="column" width={[1, 10 / 12, 6 / 12]} mx="auto">
        <Title>Réinitialiser votre mot de passe</Title>
        {succeeded ? (
          <>
            <SuccessCard message="Votre mot de passe a bien été enregistré" />
            <MainLink to="/login">Se connecter</MainLink>
          </>
        ) : (
          <form onSubmit={handleFormSubmit}>
            {/* New password */}
            <FormInputLabel>
              Nouveau mot de passe
              <FormInput
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                type="password"
                placeholder="Au moins 6 carctères"
                pattern=".{6,}"
                required
                hasLabel
              />
            </FormInputLabel>
            {/* Confirm new password */}
            <FormInputLabel>
              Confirmer le mot de passe
              <FormInput
                value={confirmNewPassword}
                onChange={e => setConfirmNewPassword(e.target.value)}
                type="password"
                placeholder="Même mot de passe"
                required
                hasLabel
              />
            </FormInputLabel>
            {error && <ErrorCard message="Ce lien n'est pas valide" />}
            <MainButtonSubmit
              value={loading ? 'Enregistrement...' : 'Enregistrer le mot de passe'}
              type="submit"
              disabled={loading || newPassword !== confirmNewPassword}
            />
          </form>
        )}
      </Flex>
    </ContainerBox>
  )
}

export default ResetPassword
