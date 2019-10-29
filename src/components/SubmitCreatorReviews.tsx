import { useMutation, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React, { useState } from 'react'
import { MainButtonSubmit, MainButton } from '../styles/Button'
import { FormInput, FormInputLabel } from '../styles/Form'
import { CollabStatus, ReviewFormat, SubmitCollabReviewInput } from '../__generated__/globalTypes'
import {
  SubmitCollabReview,
  SubmitCollabReviewVariables,
} from '../__generated__/SubmitCollabReview'
import CheckBox from './CheckBox'
import ErrorCard from './ErrorCard'
import Loader from './Loader'
import SplitView from './SplitView'
import SuccessCard from './SuccessCard'
import { showReviewFormat } from '../utils/enums'
import CheckList from './CheckList'
import { CREATOR_COLLAB_FRAGMENT } from './CreatorCollabCard'
import { GetCreatorCollab, GetCreatorCollabVariables } from '../__generated__/GetCreatorCollab'
import { Box } from '@rebass/grid'
import WarningCard from './WarningCard'
import { LabelText } from '../styles/Text'
import copy from 'copy-to-clipboard'

const SUBMIT_COLLAB_REVIEW = gql`
  mutation SubmitCollabReview($review: SubmitCollabReviewInput!, $collabId: String!) {
    submitCollabReview(review: $review, collabId: $collabId) {
      _id
      review {
        _id
      }
    }
  }
`

const GET_CREATOR_COLLAB = gql`
  query GetCreatorCollab($collabId: String!) {
    collab(collabId: $collabId) {
      ...CreatorCollabFragment
    }
  }
  ${CREATOR_COLLAB_FRAGMENT}
`

interface Props {
  collabId: string
}

const SubmitCreatorReviews: React.FC<Props> = ({ collabId }) => {
  // Form state
  const [hasRespected, setHasRespected] = useState<boolean>(false)
  const [review, setReview] = useState<SubmitCollabReviewInput>({
    format: ReviewFormat.YOUTUBE_VIDEO,
    link: '',
  })
  const [succeeded, setSucceeded] = useState<boolean>(false)
  const [copyText, setCopyText] = useState<'Copy' | 'Copied!'>('Copy')

  // Network requests
  const { data: { collab } = { collab: null }, ...collabRequestStatus } = useQuery<
    GetCreatorCollab,
    GetCreatorCollabVariables
  >(GET_CREATOR_COLLAB, { variables: { collabId } })
  const [submitCollabReview, { loading, error }] = useMutation<
    SubmitCollabReview,
    SubmitCollabReviewVariables
  >(SUBMIT_COLLAB_REVIEW, { onCompleted: () => setSucceeded(true) })

  if (collabRequestStatus.loading) {
    return <Loader />
  }
  if (collabRequestStatus.error) {
    return <ErrorCard />
  }

  const alreadyDone = collab.status === CollabStatus.DONE

  if (alreadyDone) {
    return <ErrorCard message="You have already posted your review" />
  }

  const updateLink = (newLink: string) => {
    setReview({ ...review, link: newLink })
  }
  const allowSubmit = hasRespected && review.link !== ''

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    submitCollabReview({
      variables: {
        collabId,
        review,
      },
    })
  }

  const handleCopy = () => {
    copy(collab.trackedLink)
    setCopyText('Copied!')
    window.setTimeout(() => setCopyText('Copy'), 2000)
  }

  return (
    <SplitView title="My review" ratio={3.5 / 12} noBorder noPadding>
      <form onSubmit={handleSubmit}>
        <WarningCard
          message="Make sure your review includes your custom link. It is used to track your collab's performance"
          noMargin
        />
        <Box mt="2rem" />
        <LabelText>Your custom link</LabelText>
        <Box style={{ display: 'inline-block' }} mr="1rem">
          {collab.trackedLink}
        </Box>
        <MainButton smaller inverted noMargin onClick={handleCopy}>
          {copyText}
        </MainButton>
        <LabelText withMargin>Your review</LabelText>
        <FormInputLabel noMargin>
          Link of your {showReviewFormat(review.format)}
          <FormInput
            value={review.link}
            onChange={e => updateLink(e.target.value)}
            placeholder="https://..."
            required
            hasLabel
          />
        </FormInputLabel>
        <LabelText withMargin>Collab rules</LabelText>
        <p>Make sure you have respected the following campaign rules before submitting:</p>
        <CheckList items={collab.campaign.rules} />
        <CheckBox
          isChecked={hasRespected}
          handleClick={() => setHasRespected(!hasRespected)}
          text="I have respected all the campaign rules"
        />
        {succeeded && <SuccessCard message="Your review was saved" />}
        {error && <ErrorCard message="Could not saved your review" />}
        <MainButtonSubmit
          value={loading ? 'Submitting...' : 'Submit my review'}
          type="submit"
          disabled={!allowSubmit || loading}
        />
      </form>
    </SplitView>
  )
}

export default SubmitCreatorReviews
