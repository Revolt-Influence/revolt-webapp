import IAction from '../models/Action'
import IDisplay, { defaultDisplay } from '../models/Display'
import { displayActions } from '../actions/display'
import { sessionActions } from '../actions/session'

function displayReducer(state: IDisplay = defaultDisplay, action: IAction): IDisplay {
  switch (action.type) {
    case sessionActions.LOGIN_FULFILLED:
      return {
        ...state,
        planLimitPopupIsShown: false,
      }
    case sessionActions.USER_SIGNUP_FULFILLED:
      return {
        ...state,
        planLimitPopupIsShown: false,
      }
    case sessionActions.LOGOUT_FULFILLED:
      return {
        ...state,
        planLimitPopupIsShown: false,
      }
    case displayActions.SHOW_LIMIT_POPUP: {
      return {
        ...state,
        planLimitPopupIsShown: true,
      }
    }
    case displayActions.CLOSE_LIMIT_POPUP:
      return {
        ...state,
        planLimitPopupIsShown: false,
      }
    case displayActions.SHOW_PROFILE_PANEL:
      return {
        ...state,
        profilePanel: action.payload,
      }
    case displayActions.HIDE_PROFILE_PANEL:
      return {
        ...state,
        profilePanel: null,
      }
    default:
      return state
  }
}

export default displayReducer
