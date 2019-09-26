import IAction from '../models/Action'
import { ISession, defaultSession } from '../models/Session'
import { sessionActions } from '../actions/session'
import { loadingRequest, successfulRequest, rejectedRequest } from '../utils/request'
import { creatorsActions } from '../actions/creators'

function sessionReducer(state: ISession = defaultSession, action: IAction): ISession {
  const { type, payload } = action
  switch (type) {
    case sessionActions.RETRIEVE_USER_PENDING:
      return {
        ...state,
        isLoggedIn: false,
        requests: {
          ...state.requests,
          retrieveUser: loadingRequest,
        },
      }
    case sessionActions.RETRIEVE_USER_FULFILLED:
      return {
        ...state,
        isLoggedIn: true,
        type: payload.body.sessionType,
        user: payload.body.sessionType === 'brand' ? payload.body.user : null,
        creator: payload.body.sessionType === 'creator' ? payload.body.user : null,
        ambassadorStatus:
          payload.body.sessionType === 'creator' ? payload.body.ambassadorStatus : null,
        requests: {
          ...state.requests,
          retrieveUser: successfulRequest,
        },
      }
    case sessionActions.RETRIEVE_USER_REJECTED:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        requests: {
          ...state.requests,
          retrieveUser: rejectedRequest,
        },
      }
    case sessionActions.USER_SIGNUP_PENDING:
      return {
        ...state,
        isLoggedIn: false,
        requests: {
          ...state.requests,
          signup: loadingRequest,
        },
      }
    case sessionActions.USER_SIGNUP_FULFILLED:
      return {
        ...state,
        isLoggedIn: true,
        type: 'brand',
        creator: null,
        user: payload.body.user,
        requests: {
          ...state.requests,
          signup: successfulRequest,
        },
      }
    case sessionActions.USER_SIGNUP_REJECTED:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        requests: {
          ...state.requests,
          signup: rejectedRequest,
        },
      }
    case sessionActions.CREATOR_SIGNUP_PENDING:
      return {
        ...state,
        isLoggedIn: false,
        requests: {
          ...state.requests,
          signup: loadingRequest,
        },
      }
    case sessionActions.CREATOR_SIGNUP_FULFILLED:
      return {
        ...state,
        isLoggedIn: true,
        type: 'creator',
        creator: payload.body.creator,
        user: null,
        ambassadorStatus: {
          signups: 0,
          activeSignups: 0,
        },
        requests: {
          ...state.requests,
          signup: successfulRequest,
        },
      }
    case sessionActions.CREATOR_SIGNUP_REJECTED:
      return {
        ...state,
        isLoggedIn: false,
        creator: null,
        requests: {
          ...state.requests,
          signup: rejectedRequest,
        },
      }
    case sessionActions.LOGIN_PENDING:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        requests: {
          ...state.requests,
          login: loadingRequest,
        },
      }
    case sessionActions.LOGIN_FULFILLED:
      return {
        ...state,
        isLoggedIn: true,
        type: payload.body.sessionType,
        user: payload.body.sessionType === 'brand' ? payload.body.user : null,
        creator: payload.body.sessionType === 'creator' ? payload.body.user : null,
        requests: {
          ...state.requests,
          login: successfulRequest,
        },
        ambassadorStatus:
          payload.body.sessionType === 'creator' ? payload.body.ambassadorStatus : null,
      }
    case sessionActions.LOGIN_REJECTED:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        requests: {
          ...state.requests,
          login: rejectedRequest,
        },
      }
    case sessionActions.LOGOUT_PENDING:
      return {
        ...state,
        requests: {
          ...state.requests,
          logout: loadingRequest,
        },
      }
    case sessionActions.LOGOUT_FULFILLED:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        type: null,
        requests: {
          ...state.requests,
          logout: successfulRequest,
        },
      }
    case sessionActions.LOGOUT_REJECTED:
      return {
        ...state,
        requests: {
          ...state.requests,
          logout: rejectedRequest,
        },
      }
    case sessionActions.USER_EDIT_INFO_PENDING:
      return {
        ...state,
        requests: {
          ...state.requests,
          editInfo: loadingRequest,
        },
      }
    case sessionActions.USER_EDIT_INFO_FULFILLED:
      return {
        ...state,
        user: payload.body,
        requests: {
          ...state.requests,
          editInfo: successfulRequest,
        },
      }
    case sessionActions.USER_EDIT_INFO_REJECTED:
      return {
        ...state,
        requests: {
          ...state.requests,
          editInfo: rejectedRequest,
        },
      }
    case sessionActions.USER_CHANGE_PASSWORD_PENDING:
      return {
        ...state,
        requests: {
          ...state.requests,
          changePassword: loadingRequest,
        },
      }
    case sessionActions.USER_CHANGE_PASSWORD_FULFILLED:
      return {
        ...state,
        user: payload.body.user,
        creator: payload.body.creator,
        requests: {
          ...state.requests,
          changePassword: successfulRequest,
        },
      }
    case sessionActions.USER_CHANGE_PASSWORD_REJECTED:
      return {
        ...state,
        requests: {
          ...state.requests,
          changePassword: rejectedRequest,
        },
      }
    case sessionActions.SEND_RESET_PASSWORD_LINK_PENDING:
      return {
        ...state,
        requests: {
          ...state.requests,
          sendResetPasswordLink: loadingRequest,
        },
      }
    case sessionActions.SEND_RESET_PASSWORD_LINK_FULFILLED:
      return {
        ...state,
        user: payload.body,
        requests: {
          ...state.requests,
          sendResetPasswordLink: successfulRequest,
        },
      }
    case sessionActions.SEND_RESET_PASSWORD_LINK_REJECTED:
      return {
        ...state,
        requests: {
          ...state.requests,
          sendResetPasswordLink: rejectedRequest,
        },
      }
    case sessionActions.CHECK_RESET_PASSWORD_LINK_PENDING:
      return {
        ...state,
        requests: {
          ...state.requests,
          resetPasswordViaEmail: loadingRequest,
        },
      }
    case sessionActions.CHECK_RESET_PASSWORD_LINK_FULFILLED:
      return {
        ...state,
        user: payload.body,
        requests: {
          ...state.requests,
          resetPasswordViaEmail: successfulRequest,
        },
      }
    case sessionActions.CHECK_RESET_PASSWORD_LINK_REJECTED:
      return {
        ...state,
        requests: {
          ...state.requests,
          resetPasswordViaEmail: rejectedRequest,
        },
      }
    case sessionActions.SWITCH_TO_PREMIUM_PENDING:
      return {
        ...state,
        requests: {
          ...state.requests,
          switchToPremium: loadingRequest,
        },
      }
    case sessionActions.SWITCH_TO_PREMIUM_FULFILLED:
      return {
        ...state,
        user: payload.body,
        requests: {
          ...state.requests,
          switchToPremium: successfulRequest,
        },
      }
    case sessionActions.SWITCH_TO_PREMIUM_REJECTED:
      return {
        ...state,
        requests: {
          ...state.requests,
          switchToPremium: rejectedRequest,
        },
      }
    case sessionActions.CANCEL_PREMIUM_PENDING:
      return {
        ...state,
        requests: {
          ...state.requests,
          cancelPremium: loadingRequest,
        },
      }
    case sessionActions.CANCEL_PREMIUM_FULFILLED:
      return {
        ...state,
        user: payload.body,
        requests: {
          ...state.requests,
          cancelPremium: successfulRequest,
        },
      }
    case sessionActions.CANCEL_PREMIUM_REJECTED:
      return {
        ...state,
        requests: {
          ...state.requests,
          cancelPremium: rejectedRequest,
        },
      }
    case sessionActions.UPDATE_CREDIT_CARD_PENDING:
      return {
        ...state,
        requests: {
          ...state.requests,
          updateCreditCard: loadingRequest,
        },
      }
    case sessionActions.UPDATE_CREDIT_CARD_FULFILLED:
      return {
        ...state,
        user: payload.body,
        requests: {
          ...state.requests,
          updateCreditCard: successfulRequest,
        },
      }
    case sessionActions.UPDATE_CREDIT_CARD_REJECTED:
      return {
        ...state,
        requests: {
          ...state.requests,
          updateCreditCard: rejectedRequest,
        },
      }
    case creatorsActions.LINK_INSTAGRAM_ACCOUNT_PENDING:
      return {
        ...state,
        requests: {
          ...state.requests,
          linkInstagramAccount: loadingRequest,
        },
      }
    case creatorsActions.LINK_INSTAGRAM_ACCOUNT_FULFILLED:
      return {
        ...state,
        creator: payload.body.creator,
        requests: {
          ...state.requests,
          linkInstagramAccount: successfulRequest,
        },
      }
    case creatorsActions.LINK_INSTAGRAM_ACCOUNT_REJECTED:
      return {
        ...state,
        requests: {
          ...state.requests,
          linkInstagramAccount: rejectedRequest,
        },
      }
    case creatorsActions.CHECK_INSTAGRAM_TOKEN_FULFILLED:
      return {
        ...state,
        creator: payload.body.creator,
      }
    case creatorsActions.SAVE_POSTAL_ADDRESS_PENDING:
      return {
        ...state,
        requests: {
          ...state.requests,
          savePostalAddress: loadingRequest,
        },
      }
    case creatorsActions.SAVE_POSTAL_ADDRESS_FULFILLED:
      return {
        ...state,
        requests: {
          ...state.requests,
          savePostalAddress: successfulRequest,
        },
      }
    case creatorsActions.SAVE_POSTAL_ADDRESS_REJECTED:
      return {
        ...state,
        creator: payload.body.creator,
        requests: {
          ...state.requests,
          savePostalAddress: rejectedRequest,
        },
      }
    case creatorsActions.SAVE_CREATOR_PROFILE_PENDING:
      return {
        ...state,
        requests: {
          ...state.requests,
          saveCreatorProfile: loadingRequest,
        },
      }
    case creatorsActions.SAVE_CREATOR_PROFILE_FULFILLED:
      return {
        ...state,
        creator: payload.body.creator,
        requests: {
          ...state.requests,
          saveCreatorProfile: successfulRequest,
        },
      }
    case creatorsActions.SAVE_CREATOR_PROFILE_REJECTED:
      return {
        ...state,
        requests: {
          ...state.requests,
          saveCreatorProfile: rejectedRequest,
        },
      }
    case creatorsActions.LINK_YOUTUBE_CHANNEL_PENDING:
      return {
        ...state,
        requests: {
          ...state.requests,
          linkYoutubeChannel: loadingRequest,
        },
      }
    case creatorsActions.LINK_YOUTUBE_CHANNEL_FULFILLED:
      return {
        ...state,
        creator: payload.body.creator,
        requests: {
          ...state.requests,
          linkYoutubeChannel: successfulRequest,
        },
      }
    case creatorsActions.LINK_YOUTUBE_CHANNEL_REJECTED:
      return {
        ...state,
        requests: {
          ...state.requests,
          linkYoutubeChannel: {
            ...rejectedRequest,
            hasFailed: payload.response.text,
          },
        },
      }
    case creatorsActions.UPDATE_CREATOR_CONTACT_PENDING:
      return {
        ...state,
        requests: {
          ...state.requests,
          updateCreatorContact: loadingRequest,
        },
      }
    case creatorsActions.UPDATE_CREATOR_CONTACT_FULFILLED:
      return {
        ...state,
        creator: payload.body.creator,
        requests: {
          ...state.requests,
          updateCreatorContact: successfulRequest,
        },
      }
    case creatorsActions.UPDATE_CREATOR_CONTACT_REJECTED:
      return {
        ...state,
        requests: {
          ...state.requests,
          updateCreatorContact: rejectedRequest,
        },
      }
    default:
      return state
  }
}

export default sessionReducer
