import React, { useState } from 'react'
import { FormInputLabel, FormInput } from '../styles/Form'
import { MainButtonSubmit } from '../styles/Button'
import { emailRegex } from '../utils/strings'
import ErrorCard from './ErrorCard'
import SuccessCard from './SuccessCard'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_SESSION } from './Session'
import { GetSession } from '../__generated__/GetSession'
import { UpdateUserEmail, UpdateUserEmailVariables } from '../__generated__/UpdateUserEmail'
import gql from 'graphql-tag'

const UPDATE_USER_EMAIL = gql`
  mutation UpdateUserEmail($newEmail: String!) {
    updateUserEmail(newEmail: $newEmail) {
      _id
      email
    }
  }
`

const UpdateUserInfo: React.FC<{}> = () => {
  // Get user from session
  const { data: { session } = { session: null } } = useQuery<GetSession>(GET_SESSION)
  // Prepare change email
  const [succeeded, setSucceeded] = useState<boolean>(false)
  const [updateEmail, { loading, error }] = useMutation<UpdateUserEmail, UpdateUserEmailVariables>(
    UPDATE_USER_EMAIL,
    { onCompleted: () => setSucceeded(true) }
  )

  // Form state
  const [email, setEmail] = useState(session.user.email)

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    updateEmail({ variables: { newEmail: email } })
  }

  return (
    <form onSubmit={handleFormSubmit}>
      {/* Edit email */}
      <FormInputLabel noMargin>
        Email
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
        disabled={loading || email === session.user.email}
      />
    </form>
  )
}

export default UpdateUserInfo
