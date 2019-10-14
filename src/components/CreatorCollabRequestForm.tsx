import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { MainButtonSubmit } from '../styles/Button'
import { FormInputLabel, FormTextarea } from '../styles/Form'
import { ApplyToCampaign, ApplyToCampaignVariables } from '../__generated__/ApplyToCampaign'
import CheckBox from './CheckBox'
import ErrorCard from './ErrorCard'
import SplitView from './SplitView'
import SuccessCard from './SuccessCard'
import { CREATOR_COLLAB_FRAGMENT } from './CreatorCollabCard'
import { GET_CREATOR_COLLABS } from '../pages/CollabsList'

const APPLY_TO_CAMPAIGN = gql`
  mutation ApplyToCampaign($message: String!, $campaignId: String!) {
    applyToCampaign(message: $message, campaignId: $campaignId) {
      # Get data of created collab
      ...CreatorCollabFragment
    }
  }
  ${CREATOR_COLLAB_FRAGMENT}
`

interface Props {
  brand: string
  campaignId: string
}

const CreatorCollabRequestForm: React.FC<Props> = ({ brand, campaignId }) => {
  const [
    applyToCampaign,
    {
      loading: applyLoading,
      error: applyError,
      data: { applyToCampaign: createdCollab } = { applyToCampaign: null },
    },
  ] = useMutation<ApplyToCampaign, ApplyToCampaignVariables>(APPLY_TO_CAMPAIGN, {
    refetchQueries: [{ query: GET_CREATOR_COLLABS }],
  })

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
    applyToCampaign({ variables: { campaignId, message } })
  }

  return (
    <SplitView title="Apply" ratio={4 / 12} noBorder>
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
        disabled={!allowSubmit || applyLoading || !!createdCollab}
        onClick={handleSubmit}
      />
    </SplitView>
  )
}

export default CreatorCollabRequestForm
