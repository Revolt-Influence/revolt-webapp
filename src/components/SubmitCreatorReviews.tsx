import { useMutation, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React, { useState } from 'react'
import { MainButtonSubmit } from '../styles/Button'
import { FormInput, FormInputLabel } from '../styles/Form'
import { GetCollab, GetCollabVariables } from '../__generated__/GetCollab'
import { CollabStatus, ReviewFormat, SubmitCollabReviewInput } from '../__generated__/globalTypes'
import {
  SubmitCollabReview,
  SubmitCollabReviewVariables,
} from '../__generated__/SubmitCollabReview'
import CheckBox from './CheckBox'
import { GET_COLLAB } from './CreatorProfile'
import ErrorCard from './ErrorCard'
import Loader from './Loader'
import SplitView from './SplitView'
import SuccessCard from './SuccessCard'
import { showReviewFormat } from '../utils/enums'

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

  // Network requests
  const { data: { collab } = { collab: null }, ...collabRequestStatus } = useQuery<
    GetCollab,
    GetCollabVariables
  >(GET_COLLAB, { variables: { collabId } })
  const [submitCollabReview, { loading, error }] = useMutation<
    SubmitCollabReview,
    SubmitCollabReviewVariables
  >(SUBMIT_COLLAB_REVIEW, { onCompleted: () => setSucceeded(true) })
  const alreadyDone = collab.status === CollabStatus.DONE

  if (alreadyDone) {
    return <ErrorCard message="You have already posted your review" />
  }

  if (collabRequestStatus.loading) {
    return <Loader />
  }
  if (collabRequestStatus.error) {
    return <ErrorCard />
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

  return (
    <SplitView title="Mes revues" ratio={3.5 / 12} noBorder>
      <form onSubmit={handleSubmit}>
        <FormInputLabel>
          Lien de votre {showReviewFormat(review.format)}
          <FormInput
            value={review.link}
            onChange={e => updateLink(e.target.value)}
            placeholder="https://..."
            required
            hasLabel
          />
        </FormInputLabel>
        <CheckBox
          isChecked={hasRespected}
          handleClick={() => setHasRespected(!hasRespected)}
          text="I have respected the campaign rules"
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
