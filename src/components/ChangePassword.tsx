import { useMutation, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React, { useState } from 'react'
import styled from 'styled-components'
import { MainButtonSubmit } from '../styles/Button'
import { FormInput, FormInputLabel } from '../styles/Form'
import {
  ChangeCreatorPassword,
  ChangeCreatorPasswordVariables,
} from '../__generated__/ChangeCreatorPassword'
import {
  ChangeUserPassword,
  ChangeUserPasswordVariables,
} from '../__generated__/ChangeUserPassword'
import { GetSession } from '../__generated__/GetSession'
import { SessionType } from '../__generated__/globalTypes'
import ErrorCard from './ErrorCard'
import Loader from './Loader'
import { GET_SESSION } from './Session'
import SuccessCard from './SuccessCard'

const FormWrapper = styled.form`
  width: 100%;
`

const CHANGE_USER_PASSWORD = gql`
  mutation ChangeUserPassword($newPassword: String!, $currentPassword: String!) {
    changeUserPassword(newPassword: $newPassword, currentPassword: $currentPassword) {
      _id
    }
  }
`

const CHANGE_CREATOR_PASSWORD = gql`
  mutation ChangeCreatorPassword($newPassword: String!, $currentPassword: String!) {
    changeCreatorPassword(newPassword: $newPassword, currentPassword: $currentPassword) {
      _id
    }
  }
`

const ChangePassword: React.FC<{}> = () => {
  // Get session to check what mutation to make
  const {
    data: { session } = { session: null },
    loading: sessionLoading,
    error: sessionError,
  } = useQuery<GetSession, {}>(GET_SESSION)
  const [succeeded, setSucceeded] = useState(false)
  // Prepare change password server
  const [changeUserPassword, changeUserPasswordRequest] = useMutation<
    ChangeUserPassword,
    ChangeUserPasswordVariables
  >(CHANGE_USER_PASSWORD, { onCompleted: () => setSucceeded(true) })
  const [changeCreatorPassword, changeCreatorPasswordRequest] = useMutation<
    ChangeCreatorPassword,
    ChangeCreatorPasswordVariables
  >(CHANGE_CREATOR_PASSWORD, { onCompleted: () => setSucceeded(true) })

  // Form state
  const [currentPassword, setCurrentPassword] = React.useState<string>('')
  const [newPassword, setNewPassword] = React.useState<string>('')

  if (sessionLoading) {
    return <Loader />
  }
  if (sessionError) {
    return <ErrorCard />
  }

  const isLoading = changeUserPasswordRequest.loading || changeCreatorPasswordRequest.loading
  const error = changeUserPasswordRequest.error || changeCreatorPasswordRequest.error

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (session.sessionType === SessionType.BRAND) {
      changeUserPassword({ variables: { currentPassword, newPassword } })
    } else if (session.sessionType === SessionType.CREATOR) {
      changeCreatorPassword({ variables: { currentPassword, newPassword } })
    }
    setCurrentPassword('')
    setNewPassword('')
  }

  return (
    <FormWrapper onSubmit={handleFormSubmit}>
      {/* Current password */}
      <FormInputLabel noMargin>
        Mot de passe actuel
        <FormInput
          value={currentPassword}
          onChange={e => setCurrentPassword(e.target.value)}
          type="password"
          placeholder="Votre mot de passe actuel"
          required
          hasLabel
        />
      </FormInputLabel>
      {/* New password */}
      <FormInputLabel>
        Nouveau mot de passe
        <FormInput
          type="password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          pattern=".{6,}"
          placeholder="Au moins 6 caractères"
          required
          hasLabel
        />
      </FormInputLabel>
      {error && <ErrorCard message="Votre mot de passe n'a pas pu être changé" />}
      {succeeded && <SuccessCard message="Votre mot de passe a bien été changé" />}
      {/* Submit form */}
      <MainButtonSubmit
        type="submit"
        value={isLoading ? 'Changement du mot de passe...' : 'Changer de mot de passe'}
        disabled={newPassword.length === 0}
      />
    </FormWrapper>
  )
}

export default ChangePassword
