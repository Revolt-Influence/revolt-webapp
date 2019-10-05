import React, { useState } from 'react'
import { FormInputLabel, FormInput } from '../styles/Form'
import { MainButtonSubmit } from '../styles/Button'
import { emailRegex } from '../utils/strings'
import ErrorCard from './ErrorCard'
import SuccessCard from './SuccessCard'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_SESSION } from './Session'
import { GetSession } from '../__generated__/GetSession'
import gql from 'graphql-tag'
import {
  UpdateCreatorEmailVariables,
  UpdateCreatorEmail,
} from '../__generated__/UpdateCreatorEmail'

const UPDATE_CREATOR_EMAIL = gql`
  mutation UpdateCreatorEmail($newEmail: String!) {
    updateCreatorEmail(newEmail: $newEmail) {
      _id
      email
    }
  }
`

const UpdateCreatorContactInfo: React.FC<{}> = () => {
  // Get creator from session
  const { data: { session } = { session: null } } = useQuery<GetSession>(GET_SESSION)
  // Prepare change email
  const [succeeded, setSucceeded] = useState(false)
  const [updateEmail, { loading, error }] = useMutation<
    UpdateCreatorEmail,
    UpdateCreatorEmailVariables
  >(UPDATE_CREATOR_EMAIL, { onCompleted: () => setSucceeded(true) })
  // Form state
  const [email, setEmail] = useState(session.creator.email)

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    updateEmail({ variables: { newEmail: email } })
  }

  return (
    <form onSubmit={handleFormSubmit}>
      {/* Edit email */}
      <FormInputLabel noMargin>
        Email address
        <FormInput
          value={email}
          onChange={e => setEmail(e.target.value)}
          pattern={emailRegex}
          required
          hasLabel
        />
      </FormInputLabel>
      {error && <ErrorCard message="Could not save changes" />}
      {succeeded && <SuccessCard message="Changes saved" />}
      {/* Submit form */}
      <MainButtonSubmit
        value={loading ? 'Saving...' : 'Save'}
        disabled={loading || email === session.creator.email}
      />
    </form>
  )
}

export default UpdateCreatorContactInfo
