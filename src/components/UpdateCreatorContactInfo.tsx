import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FormInputLabel, FormInput } from '../styles/Form'
import { MainButtonSubmit } from '../styles/Button'
import { emailRegex } from '../utils/strings'
import ErrorCard from './ErrorCard'
import SuccessCard from './SuccessCard'
import IState from '../models/State'
import { IRequestStatus } from '../utils/request'
import { updateCreatorContactInfo } from '../actions/creators'
import { ICreator } from '../models/Creator'

const UpdateCreatorContactInfo: React.FC<{}> = () => {
  // Redux stuff
  const dispatch = useDispatch()
  const creator = useSelector<IState, ICreator>(state => state.session.creator)
  const { isLoading, hasFailed, hasSucceeded } = useSelector<IState, IRequestStatus>(
    state => state.session.requests.updateCreatorContact
  )
  // Form state
  const [phone, setPhone] = React.useState(creator.phone)
  const [email, setEmail] = React.useState(creator.email)

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(updateCreatorContactInfo({ email, phone }))
  }

  return (
    <form onSubmit={handleFormSubmit}>
      {/* Edit email */}
      <FormInputLabel noMargin>
        Adresse email
        <FormInput
          value={email}
          onChange={e => setEmail(e.target.value)}
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
          value={phone}
          onChange={e => setPhone(e.target.value)}
          required
          hasLabel
        />
      </FormInputLabel>
      {hasFailed && <ErrorCard message="Le changement n'a pas pu être enregistré" />}
      {hasSucceeded && <SuccessCard message="Le changement a bien été enregistré" />}
      {/* Submit form */}
      <MainButtonSubmit
        value={isLoading ? 'Enregistrement...' : 'Enregistrer mes coordonnées'}
        disabled={isLoading || (email === creator.email && phone === creator.phone)}
      />
    </form>
  )
}

export default UpdateCreatorContactInfo
