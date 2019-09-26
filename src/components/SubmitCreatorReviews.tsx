import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SplitView from './SplitView'
import { ICollab } from '../models/Collab'
import { IBaseReview } from '../models/Review'
import { FormInputLabel, FormInput } from '../styles/Form'
import { MainButtonSubmit } from '../styles/Button'
import CheckBox from './CheckBox'
import IState from '../models/State'
import { IRequestStatus } from '../utils/request'
import SuccessCard from './SuccessCard'
import ErrorCard from './ErrorCard'
import { submitCreatorReviews } from '../actions/collabs'
import { ICreator } from '../models/Creator'
import { TaskFormatType } from '../models/Campaign'
import DropImage from './DropImage'
import { getInstagramPostData } from '../utils/crawler'
import { captureException } from '@sentry/core'

interface ISubmitCreatorReviewsProps {
  collab: ICollab
}

const SubmitCreatorReviews: React.FC<ISubmitCreatorReviewsProps> = ({ collab }) => {
  const [hasRespected, setHasRespected] = React.useState<boolean>(false)

  const nonStoryFormats = collab.proposition.formats.filter(
    _format => _format !== 'Instagram story'
  )

  // Redux stuff
  const dispatch = useDispatch()
  const submitStatus = useSelector<IState, IRequestStatus>(
    state => state.collabs.requests.submitCreatorReviews
  )
  const creator = useSelector<IState, ICreator>(state => state.session.creator)

  const alreadyDone = collab.status === 'done'
  const defaultBaseReviews = collab.proposition.formats
    .filter(_format => _format !== 'Instagram story')
    .map(_format => ({
      link: '',
      format: _format,
      creatorId: creator._id,
    }))

  // Handle story
  const storyRequired = nonStoryFormats.length < collab.proposition.formats.length
  const [story, setStory] = React.useState<IBaseReview>(
    alreadyDone
      ? {
          ...collab.reviews.find(_review => _review.format !== 'Instagram story'),
          creatorId: creator._id,
        }
      : null
  )

  // Handle non-story reviews
  // Get only base reviews from full existing reviews
  const existingBaseReviews = collab.reviews
    .filter(_review => _review.format !== 'Instagram story')
    .map(_review => ({
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
  const allowSubmit =
    hasRespected &&
    reviews.every(_baseReview => _baseReview.link !== '') &&
    (storyRequired ? story != null : true)

  const [postLoading, setPostLoading] = useState<boolean>(false)
  const [postError, setPostError] = useState<boolean>(false)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (allowSubmit) {
      // Scrape the post locally
      const enrichedReviewsPromises = reviews.map(async _review => {
        if (_review.format === 'Instagram post') {
          // Srape the post
          const postData = await getInstagramPostData(_review.link)
          return {
            ..._review,
            instagramPostData: postData,
          }
        } else {
          return _review
        }
      })
      try {
        setPostError(false)
        setPostLoading(true)
        const enrichedReviews = await Promise.all(enrichedReviewsPromises)
        setPostLoading(false)
        dispatch(
          submitCreatorReviews({
            // Dirty hack to make sure an empty story doesn't slip in
            baseReviews: [...enrichedReviews, ...(story != null ? [story] : [])],
            collabId: collab._id,
          })
        )
      } catch (_error) {
        captureException(_error)
      }
    }
  }

  const translateFormat = (format: TaskFormatType): string => {
    switch (format) {
      case 'Instagram post':
        return 'post Instagram'
      case 'Instagram story':
        return 'story Instagram'
      default:
        return format
    }
  }

  return (
    <SplitView title="Mes revues" ratio={3.5 / 12} noBorder>
      <form onSubmit={handleSubmit}>
        {reviews
          .filter(_baseReview => _baseReview.format !== 'Instagram story')
          .map((_baseReview, _index) => (
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
        {storyRequired && (
          <FormInputLabel>
            Votre story
            <DropImage
              currentImage=""
              handleDrop={url =>
                setStory({ creatorId: creator._id, format: 'Instagram story', link: url })
              }
              preset="stories"
            />
          </FormInputLabel>
        )}
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
