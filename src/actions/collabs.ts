import { request, backendURL } from '../utils/request'
import IAction from '../models/Action'
import { DashboardAction, ICollabProposition } from '../models/Collab'
import { IBaseReview } from '../models/Review'

const collabActions = {
  // Review influencer proposition
  REVIEW_COLLAB_PROPOSITION: 'REVIEW_COLLAB_PROPOSITION',
  REVIEW_COLLAB_PROPOSITION_PENDING: 'REVIEW_COLLAB_PROPOSITION_PENDING',
  REVIEW_COLLAB_PROPOSITION_FULFILLED: 'REVIEW_COLLAB_PROPOSITION_FULFILLED',
  REVIEW_COLLAB_PROPOSITION_REJECTED: 'GET_CAMPAIGN_REJECTED',
  // Review influencer proposition
  APPLY_TO_EXPERIENCE: 'APPLY_TO_EXPERIENCE',
  APPLY_TO_EXPERIENCE_PENDING: 'APPLY_TO_EXPERIENCE_PENDING',
  APPLY_TO_EXPERIENCE_FULFILLED: 'APPLY_TO_EXPERIENCE_FULFILLED',
  APPLY_TO_EXPERIENCE_REJECTED: 'APPLY_TO_EXPERIENCE_REJECTED',
  // Creator links his reviews
  SUBMIT_CREATOR_REVIEWS: 'SUBMIT_CREATOR_REVIEWS',
  SUBMIT_CREATOR_REVIEWS_PENDING: 'SUBMIT_CREATOR_REVIEWS_PENDING',
  SUBMIT_CREATOR_REVIEWS_FULFILLED: 'SUBMIT_CREATOR_REVIEWS_FULFILLED',
  SUBMIT_CREATOR_REVIEWS_REJECTED: 'SUBMIT_CREATOR_REVIEWS_REJECTED',
  // Update instagram review
  UPDATE_INSTAGRAM_REVIEW: 'UPDATE_INSTAGRAM_REVIEW',
  UPDATE_INSTAGRAM_REVIEW_PENDING: 'UPDATE_INSTAGRAM_REVIEW_PENDING',
  UPDATE_INSTAGRAM_REVIEW_FULFILLED: 'UPDATE_INSTAGRAM_REVIEW_FULFILLED',
  UPDATE_INSTAGRAM_REVIEW_REJECTED: 'UPDATE_INSTAGRAM_REVIEW_REJECTED',
}

function reviewCollabProposition(payload: { collabId: string; action: DashboardAction }): IAction {
  const { collabId, action } = payload
  return {
    payload: request
      .post(`${backendURL}/collab/${collabId}/review`)
      .send({ action })
      .withCredentials(),
    type: collabActions.REVIEW_COLLAB_PROPOSITION,
  }
}

function applyToExperience(payload: {
  campaignId: string
  proposition: ICollabProposition
}): IAction {
  const { campaignId, proposition } = payload
  return {
    payload: request
      .post(`${backendURL}/campaigns/${campaignId}/apply`)
      .send({ proposition })
      .withCredentials(),
    type: collabActions.APPLY_TO_EXPERIENCE,
  }
}

function submitCreatorReviews(payload: { collabId: string; baseReviews: IBaseReview[] }): IAction {
  const { collabId, baseReviews } = payload
  return {
    payload: request
      .post(`${backendURL}/collab/${collabId}/creatorReviews`)
      .send({ baseReviews })
      .withCredentials(),
    type: collabActions.SUBMIT_CREATOR_REVIEWS,
  }
}

function updateInstagramReview({
  reviewId,
  postData,
  creatorId,
}: {
  reviewId: string
  postData: any
  creatorId: string
}): IAction {
  return {
    payload: request
      .patch(`${backendURL}/review/${reviewId}`)
      .send({ postData })
      .withCredentials(),
    type: collabActions.UPDATE_INSTAGRAM_REVIEW,
  }
}

export {
  collabActions,
  reviewCollabProposition,
  applyToExperience,
  submitCreatorReviews,
  updateInstagramReview,
}
