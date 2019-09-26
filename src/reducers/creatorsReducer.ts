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
    case creatorsActions.CHECK_INSTAGRAM_TOKEN_PENDING:
      return {
        ...state,
        requests: {
          ...state.requests,
          checkInstagramToken: loadingRequest,
        },
      }
    case creatorsActions.CHECK_INSTAGRAM_TOKEN_FULFILLED:
      return {
        ...state,
        requests: {
          ...state.requests,
          checkInstagramToken: successfulRequest,
        },
      }
    case creatorsActions.CHECK_INSTAGRAM_TOKEN_REJECTED:
      return {
        ...state,
        requests: {
          ...state.requests,
          checkInstagramToken: {
            ...rejectedRequest,
            hasFailed: payload.response.text,
          },
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
    case creatorsActions.SAVE_INSTAGRAM_POSTS_PENDING:
      return {
        ...state,
        requests: {
          ...state.requests,
          saveInstagramPosts: loadingRequest,
        },
      }
    case creatorsActions.SAVE_INSTAGRAM_POSTS_FULFILLED:
      return {
        ...state,
        items: state.items.map(_creator => {
          if (
            _creator.instagram != null &&
            _creator.instagram.username === payload.body.influencer.username
          ) {
            return {
              ..._creator,
              instagram: payload.body.influencer,
            }
          }
          return _creator
        }),
        requests: {
          ...state.requests,
          saveInstagramPosts: successfulRequest,
        },
      }
    case creatorsActions.SAVE_INSTAGRAM_POSTS_REJECTED:
      return {
        ...state,
        requests: {
          ...state.requests,
          saveInstagramPosts: rejectedRequest,
        },
      }
    default:
      return state
  }
}

export default displayReducer
