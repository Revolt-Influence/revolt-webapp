import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React, { useState } from 'react'
import { MainButtonSubmit } from '../styles/Button'
import { FormInput, FormInputLabel } from '../styles/Form'
import { IRequestStatus } from '../utils/request'
import { GetCollab, GetCollabVariables } from '../__generated__/GetCollab'
import CheckBox from './CheckBox'
import { GET_COLLAB } from './CreatorProfile'
import ErrorCard from './ErrorCard'
import SplitView from './SplitView'
import SuccessCard from './SuccessCard'

const SUBMIT_COLLAB_REVIEW = gql`
  mutation SubmitCollabReview() {
    submitCollabReview(reviews: , collabId: ) {
      
    }
  }
`

interface Props {
  collabId: string
}

const SubmitCreatorReviews: React.FC<Props> = ({ collabId }) => {
  const {
    data: { collab },
  } = useQuery<GetCollab, GetCollabVariables>(GET_COLLAB)

  const [hasRespected, setHasRespected] = React.useState<boolean>(false)

  // Redux stuff
  const dispatch = useDispatch()
  const submitStatus = useSelector<IState, IRequestStatus>(
    state => state.collabs.requests.submitCreatorReviews
  )
  const creator = useSelector<IState, ICreator>(state => state.session.creator)

  const alreadyDone = collab.status === 'done'
  const defaultBaseReviews = collab.proposition.formats.map(_format => ({
    link: '',
    format: _format,
    creatorId: creator._id,
  }))

  // Get only base reviews from full existing reviews
  const existingBaseReviews = collab.reviews.map(_review => ({
    ..._review,
    link: _review.link,
    format: _review.format,
    creatorId: creator._id,
  }))

  const [reviews, setReviews] = React.useState<IBaseReview[]>(
    alreadyDone ? existingBaseReviews : defaultBaseReviews
  )
  const updateLink = (newLink: string, index: number) => {
    setReviews(
      reviews.map((_baseReview, _index) =>
        _index === index ? { ..._baseReview, link: newLink } : _baseReview
      )
    )
  }
  const allowSubmit = hasRespected && reviews.every(_baseReview => _baseReview.link !== '')

  const [postLoading, setPostLoading] = useState<boolean>(false)
  const [postError, setPostError] = useState<boolean>(false)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (allowSubmit) {
      try {
        setPostError(false)
        setPostLoading(true)
        setPostLoading(false)
        dispatch(
          submitCreatorReviews({
            // Dirty hack to make sure an empty story doesn't slip in
            baseReviews: reviews,
            collabId: collab._id,
          })
        )
      } catch (_error) {}
    }
  }

  const translateFormat = (format: TaskFormatType): string => {
    switch (format) {
      case 'Youtube video':
        return 'Vidéo YouTube'
      default:
        return format
    }
  }

  return (
    <SplitView title="Mes revues" ratio={3.5 / 12} noBorder>
      <form onSubmit={handleSubmit}>
        {reviews.map((_baseReview, _index) => (
          <FormInputLabel key={_index}>
            Lien de votre {translateFormat(_baseReview.format)}
            <FormInput
              value={_baseReview.link}
              onChange={e => updateLink(e.target.value, _index)}
              placeholder="https://..."
              required
              hasLabel
            />
          </FormInputLabel>
        ))}
        <CheckBox
          isChecked={hasRespected}
          handleClick={() => setHasRespected(!hasRespected)}
          text="J'ai bien respecté les règles de la campagne"
        />
        {submitStatus.hasSucceeded && (
          <SuccessCard message="Vos revues ont bien été enregistrées" />
        )}
        {(submitStatus.hasFailed || postError) && (
          <ErrorCard message="Vos revues n'ont pas pu être enregistrées" />
        )}
        <MainButtonSubmit
          value={
            submitStatus.isLoading || postLoading ? 'Enregistrement...' : 'Enregistrer mes posts'
          }
          type="submit"
          disabled={!allowSubmit || submitStatus.isLoading || postLoading}
        />
      </form>
    </SplitView>
  )
}

export default SubmitCreatorReviews
