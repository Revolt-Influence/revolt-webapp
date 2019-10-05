import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { MainButtonSubmit } from '../styles/Button'
import { FormInputLabel, FormTextarea } from '../styles/Form'
import { ApplyToExperience, ApplyToExperienceVariables } from '../__generated__/ApplyToExperience'
import CheckBox from './CheckBox'
import ErrorCard from './ErrorCard'
import SplitView from './SplitView'
import SuccessCard from './SuccessCard'

const APPLY_TO_EXPERIENCE = gql`
  mutation ApplyToExperience($message: String!, $experienceId: String!) {
    applyToExperience(message: $message, experienceId: $experienceId) {
      # Get data of created collab
      _id
      status
    }
  }
`

interface Props {
  brand: string
  experienceId: string
}

const ExperienceForm: React.FC<Props> = ({ brand, experienceId }) => {
  const [
    applyToExperience,
    {
      loading: applyLoading,
      error: applyError,
      data: { applyToExperience: createdCollab } = { applyToExperience: null },
    },
  ] = useMutation<ApplyToExperience, ApplyToExperienceVariables>(APPLY_TO_EXPERIENCE)

  const [message, setMessage] = useState<string>('')
  const [acceptsTerms, setAcceptsTerms] = useState<boolean>(false)

  const checkIfAllowSubmit = () => {
    if (!acceptsTerms || message.length === 0) {
      return false
    }
    return true
  }
  const allowSubmit = checkIfAllowSubmit()

  const handleSubmit = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault()
    applyToExperience({ variables: { experienceId, message } })
  }

  return (
    <SplitView title="Postuler" ratio={4 / 12} noBorder>
      <FormInputLabel>
        Motivation message for {brand}
        <FormTextarea
          hasLabel
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Requests with a message a more likely to be accepted"
        />
      </FormInputLabel>
      <CheckBox
        handleClick={() => setAcceptsTerms(!acceptsTerms)}
        text={`By checking this box, you are contractually committing to publishing a review of the game if ${brand} accepts the collabs`}
        isChecked={acceptsTerms}
      />
      {applyError && <ErrorCard message="Could not apply to the collab" />}
      {createdCollab && (
        <SuccessCard
          message={`Your collab request was saved. ${brand} will contact you if you are selected`}
        />
      )}
      <MainButtonSubmit
        type="submit"
        value={applyLoading ? 'Applying..' : 'Apply'}
        disabled={!allowSubmit || applyLoading}
        onClick={handleSubmit}
      />
    </SplitView>
  )
}

export default ExperienceForm
