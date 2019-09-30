import { useMutation, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React, { useState } from 'react'
import { MainButtonSubmit } from '../styles/Button'
import { FormInputLabel, FormTextarea } from '../styles/Form'
import { ApplyToExperience, ApplyToExperienceVariables } from '../__generated__/ApplyToExperience'
import { GetSession } from '../__generated__/GetSession'
import CheckBox from './CheckBox'
import ErrorCard from './ErrorCard'
import Loader from './Loader'
import { GET_SESSION } from './Session'
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
  const {
    data: { session },
    loading: sessionLoading,
    error: sessionError,
  } = useQuery<GetSession, {}>(GET_SESSION)

  const [
    applyToExperience,
    {
      loading: applyLoading,
      error: applyError,
      data: { applyToExperience: createdCollab },
    },
  ] = useMutation<ApplyToExperience, ApplyToExperienceVariables>(APPLY_TO_EXPERIENCE)

  const [message, setMessage] = useState<string>('')
  const [acceptsTerms, setAcceptsTerms] = useState<boolean>(false)

  if (sessionLoading) {
    return <Loader fullScreen />
  }
  if (sessionError) {
    return <ErrorCard />
  }

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
        Message de motivation pour {brand}
        <FormTextarea
          hasLabel
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Les candidatures avec un message de motivation ont plus de chances d'être sélectionnées"
        />
      </FormInputLabel>
      <CheckBox
        handleClick={() => setAcceptsTerms(!acceptsTerms)}
        text={`En cochant cette case, vous vous engagez contractuellement à réaliser les livrables attendus dans les délais, dès lors que ${brand} valide le partenariat.`}
        isChecked={acceptsTerms}
      />
      {applyError && <ErrorCard message="Votre candidature n'a pas pu être enregistrée" />}
      {createdCollab && (
        <SuccessCard
          message={`Votre candidature a bien été enregistrée. ${brand} vous contactera si vous êtes sélectionné`}
        />
      )}
      <MainButtonSubmit
        type="submit"
        value={applyLoading ? 'Envoi de votre demande...' : 'Postuler'}
        disabled={!allowSubmit || applyLoading}
        onClick={handleSubmit}
      />
    </SplitView>
  )
}

export default ExperienceForm
