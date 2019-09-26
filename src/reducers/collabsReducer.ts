import IAction from '../models/Action'
import { defaultCollabState, ICollabState } from '../models/Collab'
import { sessionActions } from '../actions/session'
import { collabActions } from '../actions/collabs'
import { loadingRequest, successfulRequest, rejectedRequest } from '../utils/request'

function collabsReducer(state: ICollabState = defaultCollabState, action: IAction): ICollabState {
  const { payload, type } = action
  switch (type) {
    case sessionActions.RETRIEVE_USER_FULFILLED:
      return {
        ...state,
        items: action.payload.body.collabs,
      }
    case collabActions.REVIEW_COLLAB_PROPOSITION_PENDING:
      return {
        ...state,
        requests: {
          ...state.requests,
          reviewProposition: loadingRequest,
        },
      }
    case collabActions.REVIEW_COLLAB_PROPOSITION_FULFILLED:
      return {
        ...state,
        // Replace only the collab that was being changed
        items: state.items.map(collab =>
          collab._id === payload.body.collab._id ? payload.body.collab : collab
        ),
        requests: {
          ...state.requests,
          reviewProposition: successfulRequest,
        },
      }
    case collabActions.REVIEW_COLLAB_PROPOSITION_REJECTED:
      return {
        ...state,
        requests: {
          ...state.requests,
          reviewProposition: rejectedRequest,
        },
      }
    case sessionActions.USER_SIGNUP_FULFILLED:
      return {
        ...state,
        items: [],
      }
    case sessionActions.LOGIN_FULFILLED:
      return {
        ...state,
        items: action.payload.body.collabs,
      }
    case sessionActions.LOGOUT_FULFILLED:
      return {
        ...state,
        items: [],
      }
    case collabActions.APPLY_TO_EXPERIENCE_PENDING:
      return {
        ...state,
        requests: {
          ...state.requests,
          applyToExperience: loadingRequest,
        },
      }
    case collabActions.APPLY_TO_EXPERIENCE_FULFILLED:
      return {
        ...state,
        // Replace only the collab that was being changed
        items: state.items.map(collab =>
          collab._id === payload.body.collab._id ? payload.body.collab : collab
        ),
        requests: {
          ...state.requests,
          applyToExperience: successfulRequest,
        },
      }
    case collabActions.APPLY_TO_EXPERIENCE_REJECTED:
      return {
        ...state,
        requests: {
          ...state.requests,
          applyToExperience: rejectedRequest,
        },
      }
    case collabActions.SUBMIT_CREATOR_REVIEWS_PENDING:
      return {
        ...state,
        requests: {
          ...state.requests,
          submitCreatorReviews: loadingRequest,
        },
      }
    case collabActions.SUBMIT_CREATOR_REVIEWS_FULFILLED:
      return {
        ...state,
        // Replace only the collab that was being changed
        items: state.items.map(_collab =>
          _collab._id === payload.body.collab._id ? payload.body.collab : _collab
        ),
        requests: {
          ...state.requests,
          submitCreatorReviews: successfulRequest,
        },
      }
    case collabActions.SUBMIT_CREATOR_REVIEWS_REJECTED:
      return {
        ...state,
        requests: {
          ...state.requests,
          submitCreatorReviews: rejectedRequest,
        },
      }
    case collabActions.UPDATE_INSTAGRAM_REVIEW_FULFILLED:
      return {
        ...state,
        items: state.items.map(_collab => ({
          ..._collab,
          // Replace old review with refreshed one
          reviews: _collab.reviews.map(_review =>
            _review._id === payload.body.review._id ? payload.body.review : _review
          ),
        })),
      }
    default:
      return state
  }
}

export default collabsReducer
