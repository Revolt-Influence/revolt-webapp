import Action from '../models/Action'
import { creatorsActions } from '../actions/creators'
import { ICreatorState, defaultCreatorState } from '../models/Creator'
import { loadingRequest, successfulRequest, rejectedRequest } from '../utils/request'

const displayReducer = (
  state: ICreatorState = defaultCreatorState,
  action: Action
): ICreatorState => {
  const { type, payload } = action
  switch (type) {
    case creatorsActions.GET_FULL_PROFILE_PENDING:
      return {
        ...state,
        requests: {
          ...state.requests,
          getFullProfile: loadingRequest,
        },
      }
    case creatorsActions.GET_FULL_PROFILE_FULFILLED:
      return {
        ...state,
        items: [
          ...state.items.filter(_creator => _creator._id !== payload.body.creator._id),
          payload.body.creator,
        ],
        requests: {
          ...state.requests,
          getFullProfile: successfulRequest,
        },
      }
    case creatorsActions.GET_FULL_PROFILE_REJECTED:
      return {
        ...state,
        requests: {
          ...state.requests,
          getFullProfile: rejectedRequest,
        },
      }
    case creatorsActions.GET_CREATORS_PAGE_PENDING:
      return {
        ...state,
        requests: {
          ...state.requests,
          getProfilesPage: loadingRequest,
        },
      }
    case creatorsActions.GET_CREATORS_PAGE_FULFILLED:
      return {
        ...state,
        items: payload.body.creators,
        currentPage: payload.body.currentPage,
        totalPages: payload.body.totalPages,
        requests: {
          ...state.requests,
          getProfilesPage: successfulRequest,
        },
      }
    case creatorsActions.GET_CREATORS_PAGE_REJECTED:
      return {
        ...state,
        requests: {
          ...state.requests,
          getProfilesPage: rejectedRequest,
        },
      }
    case creatorsActions.SET_CREATOR_STATUS_PENDING:
      return {
        ...state,
        requests: {
          ...state.requests,
          setStatus: loadingRequest,
        },
      }
    case creatorsActions.SET_CREATOR_STATUS_FULFILLED:
      return {
        ...state,
        items: state.items.map(_creator =>
          _creator._id === payload.body.creator._id ? payload.body.creator : _creator
        ),
        requests: {
          ...state.requests,
          setStatus: successfulRequest,
        },
      }
    case creatorsActions.SET_CREATOR_STATUS_REJECTED:
      return {
        ...state,
        requests: {
          ...state.requests,
          setStatus: rejectedRequest,
        },
      }
    default:
      return state
  }
}

export default displayReducer
