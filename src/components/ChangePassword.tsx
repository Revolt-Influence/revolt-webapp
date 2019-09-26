import React from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { FormInputLabel, FormInput } from '../styles/Form'
import { MainButtonSubmit } from '../styles/Button'
import { changePassword } from '../actions/session'
import ErrorCard from './ErrorCard'
import SuccessCard from './SuccessCard'
import IState from '../models/State'
import { IRequestStatus } from '../utils/request'
import { ISession } from '../models/Session'

const FormWrapper = styled.form`
  width: 100%;
`

const ChangePassword: React.FC<{}> = () => {
  const [currentPassword, setCurrentPassword] = React.useState<string>('')
  const [newPassword, setNewPassword] = React.useState<string>('')
  const [confirmNewPassword, setConfirmNewPassword] = React.useState<string>('')

  const dispatch = useDispatch()
  const { type, creator, user } = useSelector<IState, ISession>(state => state.session)
  const email = type === 'brand' ? user.email : creator.email
  const { isLoading, hasFailed, hasSucceeded } = useSelector<IState, IRequestStatus>(
    state => state.session.requests.changePassword
  )

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(changePassword({ email, currentPassword, newPassword }))
    setCurrentPassword('')
    setNewPassword('')
    setConfirmNewPassword('')
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
      {/* Confirm new password */}
      <FormInputLabel>
        Confirmer le nouveau mot de passe
        <FormInput
          type="password"
          value={confirmNewPassword}
          onChange={e => setConfirmNewPassword(e.target.value)}
          pattern=".{6,}"
          placeholder="Nouveau mot de passe"
          required
          hasLabel
        />
      </FormInputLabel>
      {hasFailed && <ErrorCard message="Votre mot de passe n'a pas pu être changé" />}
      {hasSucceeded && <SuccessCard message="Votre mot de passe a bien été changé" />}
      {/* Submit form */}
      <MainButtonSubmit
        type="submit"
        value={isLoading ? 'Changement du mot de passe...' : 'Changer de mot de passe'}
        disabled={newPassword.length === 0 || newPassword !== confirmNewPassword}
      />
    </FormWrapper>
  )
}

export default ChangePassword
