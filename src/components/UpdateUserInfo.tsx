import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FormInputLabel, FormInput } from '../styles/Form'
import { MainButtonSubmit } from '../styles/Button'
import { emailRegex } from '../utils/strings'
import { IUser } from '../models/User'
import { updateUserInfo } from '../actions/session'
import ErrorCard from './ErrorCard'
import SuccessCard from './SuccessCard'
import IState from '../models/State'
import { IRequestStatus } from '../utils/request'

const UpdateUserInfo: React.FC<{}> = () => {
  // Redux stuff
  const dispatch = useDispatch()
  const user = useSelector<IState, IUser>(state => state.session.user)
  const { isLoading, hasFailed, hasSucceeded } = useSelector<IState, IRequestStatus>(
    state => state.session.requests.editInfo
  )
  // Form state
  const [newPhone, setNewPhone] = React.useState(user.phone)
  const [newEmail, setNewEmail] = React.useState(user.email)

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(updateUserInfo({ newEmail, newPhone, currentEmail: user.email }))
  }

  return (
    <form onSubmit={handleFormSubmit}>
      {/* Edit email */}
      <FormInputLabel noMargin>
        Adresse email
        <FormInput
          value={newEmail}
          onChange={e => setNewEmail(e.target.value)}
          pattern={emailRegex}
          required
          hasLabel
        />
      </FormInputLabel>
      {/* Edit phone number */}
      <FormInputLabel>
        Numéro de téléphone
        <FormInput
          type="tel"
          value={newPhone}
          onChange={e => setNewPhone(e.target.value)}
          required
          hasLabel
        />
      </FormInputLabel>
      {hasFailed && <ErrorCard message="Le changement n'a pas pu être enregistré" />}
      {hasSucceeded && <SuccessCard message="Le changement a bien été enregistré" />}
      {/* Submit form */}
      <MainButtonSubmit
        value={isLoading ? 'Enregistrement...' : 'Enregistrer mes coordonnées'}
        disabled={isLoading || (newEmail === user.email && newPhone === user.phone)}
      />
    </form>
  )
}

export default UpdateUserInfo
