import React, { useState } from 'react'
import { GetCreatorCampaignPage_collabs } from '../__generated__/GetCreatorCampaignPage'
import { FormInputLabel, FormInput } from '../styles/Form'
import { MainButtonSubmit } from '../styles/Button'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { UpdateCollabQuote, UpdateCollabQuoteVariables } from '../__generated__/UpdateCollabQuote'
import ErrorCard from './ErrorCard'
import SuccessCard from './SuccessCard'
import { Box } from '@rebass/grid'

const UPDATE_COLLAB_QUOTE = gql`
  mutation UpdateCollabQuote($collabId: String!, $newQuote: Float!) {
    updateCollabQuote(newQuote: $newQuote, collabId: $collabId) {
      _id
      status
      quote
    }
  }
`

interface Props {
  collab: GetCreatorCampaignPage_collabs
  onChangeQuote?: () => void
}

const UpdateQuoteForm: React.FC<Props> = ({ collab, onChangeQuote }) => {
  // Form state
  const [newQuote, setNewQuote] = useState<number>(collab.quote)
  const [succeeded, setSucceeded] = useState<boolean>(false)

  // Server requests
  const [updateCollabQuote, { loading, error }] = useMutation<
    UpdateCollabQuote,
    UpdateCollabQuoteVariables
  >(UPDATE_COLLAB_QUOTE, { onCompleted: () => setSucceeded(true) })

  // Event handlers
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    updateCollabQuote({ variables: { collabId: collab._id, newQuote } })
    // Optional callback
    if (onChangeQuote) {
      onChangeQuote()
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box width={[1, 8 / 12, 4 / 12]}>
        <FormInputLabel>
          New quote, in US Dollars
          <FormInput
            value={newQuote}
            type="number"
            min="0"
            onChange={e => {
              if (e.target.value === '') {
                setNewQuote(null)
              }
              if (parseFloat(e.target.value) >= 0) {
                setNewQuote(parseFloat(e.target.value))
              }
            }}
            hasLabel
          />
        </FormInputLabel>
      </Box>
      {error && <ErrorCard message="Could not update the quote" />}
      {succeeded && <SuccessCard message="Your quote was updated" />}
      <MainButtonSubmit
        disabled={loading || (newQuote == null && newQuote !== 0) || newQuote === collab.quote}
        value={loading ? 'Updating' : 'Update my quote'}
      />
    </form>
  )
}

export default UpdateQuoteForm
