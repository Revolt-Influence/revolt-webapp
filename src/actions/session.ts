import IAction from '../models/Action'
import { IUser } from '../models/User'
import { request, backendURL } from '../utils/request'
import { ICreator } from '../models/Creator'

const sessionActions = {
  // Retrieve user
  RETRIEVE_USER: 'RETRIEVE_USER',
  RETRIEVE_USER_PENDING: 'RETRIEVE_USER_PENDING',
  RETRIEVE_USER_FULFILLED: 'RETRIEVE_USER_FULFILLED',
  RETRIEVE_USER_REJECTED: 'RETRIEVE_USER_REJECTED',
  // Signup
  USER_SIGNUP: 'USER_SIGNUP',
  USER_SIGNUP_PENDING: 'USER_SIGNUP_PENDING',
  USER_SIGNUP_FULFILLED: 'USER_SIGNUP_FULFILLED',
  USER_SIGNUP_REJECTED: 'USER_SIGNUP_REJECTED',
  // Login
  LOGIN: 'LOGIN',
  LOGIN_PENDING: 'LOGIN_PENDING',
  LOGIN_FULFILLED: 'LOGIN_FULFILLED',
  LOGIN_REJECTED: 'LOGIN_REJECTED',
  // Logout
  LOGOUT: 'LOGOUT',
  LOGOUT_PENDING: 'LOGOUT_PENDING',
  LOGOUT_FULFILLED: 'LOGOUT_FULFILLED',
  LOGOUT_REJECTED: 'LOGOUT_REJECTED',
  // Edit info
  USER_EDIT_INFO: 'USER_EDIT_INFO',
  USER_EDIT_INFO_PENDING: 'USER_EDIT_INFO_PENDING',
  USER_EDIT_INFO_FULFILLED: 'USER_EDIT_INFO_FULFILLED',
  USER_EDIT_INFO_REJECTED: 'USER_EDIT_INFO_REJECTED',
  // Change password
  USER_CHANGE_PASSWORD: 'USER_CHANGE_PASSWORD',
  USER_CHANGE_PASSWORD_PENDING: 'USER_CHANGE_PASSWORD_PENDING',
  USER_CHANGE_PASSWORD_FULFILLED: 'USER_CHANGE_PASSWORD_FULFILLED',
  USER_CHANGE_PASSWORD_REJECTED: 'USER_CHANGE_PASSWORD_REJECTED',
  // Send reset password link
  SEND_RESET_PASSWORD_LINK: 'SEND_RESET_PASSWORD_LINK',
  SEND_RESET_PASSWORD_LINK_PENDING: 'SEND_RESET_PASSWORD_LINK_PENDING',
  SEND_RESET_PASSWORD_LINK_FULFILLED: 'SEND_RESET_PASSWORD_LINK_FULFILLED',
  SEND_RESET_PASSWORD_LINK_REJECTED: 'SEND_RESET_PASSWORD_LINK_REJECTED',
  // Check reset password link
  CHECK_RESET_PASSWORD_LINK: 'CHECK_RESET_PASSWORD_LINK',
  CHECK_RESET_PASSWORD_LINK_PENDING: 'CHECK_RESET_PASSWORD_LINK_PENDING',
  CHECK_RESET_PASSWORD_LINK_FULFILLED: 'CHECK_RESET_PASSWORD_LINK_FULFILLED',
  CHECK_RESET_PASSWORD_LINK_REJECTED: 'CHECK_RESET_PASSWORD_LINK_REJECTED',
  // Switch to premium
  SWITCH_TO_PREMIUM: 'SWITCH_TO_PREMIUM',
  SWITCH_TO_PREMIUM_PENDING: 'SWITCH_TO_PREMIUM_PENDING',
  SWITCH_TO_PREMIUM_FULFILLED: 'SWITCH_TO_PREMIUM_FULFILLED',
  SWITCH_TO_PREMIUM_REJECTED: 'SWITCH_TO_PREMIUM_REJECTED',
  // Cancel premium
  CANCEL_PREMIUM: 'CANCEL_PREMIUM',
  CANCEL_PREMIUM_PENDING: 'CANCEL_PREMIUM_PENDING',
  CANCEL_PREMIUM_FULFILLED: 'CANCEL_PREMIUM_FULFILLED',
  CANCEL_PREMIUM_REJECTED: 'CANCEL_PREMIUM_REJECTED',
  // Cancel premium
  UPDATE_CREDIT_CARD: 'UPDATE_CREDIT_CARD',
  UPDATE_CREDIT_CARD_PENDING: 'UPDATE_CREDIT_CARD_PENDING',
  UPDATE_CREDIT_CARD_FULFILLED: 'UPDATE_CREDIT_CARD_FULFILLED',
  UPDATE_CREDIT_CARD_REJECTED: 'UPDATE_CREDIT_CARD_REJECTED',
  // Send verify email link
  SEND_VERIFY_EMAIL_LINK: 'SEND_VERIFY_EMAIL_LINK',
  SEND_VERIFY_EMAIL_LINK_PENDING: 'SEND_VERIFY_EMAIL_LINK_PENDING',
  SEND_VERIFY_EMAIL_LINK_FULFILLED: 'SEND_VERIFY_EMAIL_LINK_FULFILLED',
  SEND_VERIFY_EMAIL_LINK_REJECTED: 'SEND_VERIFY_EMAIL_LINK_REJECTED',
  // Check verify email link
  CHECK_VERIFY_EMAIL_LINK: 'CHECK_VERIFY_EMAIL_LINK',
  CHECK_VERIFY_EMAIL_LINK_PENDING: 'CHECK_VERIFY_EMAIL_LINK_PENDING',
  CHECK_VERIFY_EMAIL_LINK_FULFILLED: 'CHECK_VERIFY_EMAIL_LINK_FULFILLED',
  CHECK_VERIFY_EMAIL_LINK_REJECTED: 'CHECK_VERIFY_EMAIL_LINK_REJECTED',
  // Signup creator
  CREATOR_SIGNUP: 'CREATOR_SIGNUP',
  CREATOR_SIGNUP_PENDING: 'CREATOR_SIGNUP_PENDING',
  CREATOR_SIGNUP_FULFILLED: 'CREATOR_SIGNUP_FULFILLED',
  CREATOR_SIGNUP_REJECTED: 'CREATOR_SIGNUP_REJECTED',
}

function retrieveUser(): IAction {
  return {
    payload: request.get(`${backendURL}/session`).withCredentials(),
    type: sessionActions.RETRIEVE_USER,
  }
}

interface ISignupPayload {
  user: IUser
  plainPassword: string
}

function signupUser(payload: ISignupPayload): IAction {
  return {
    payload: request
      .post(`${backendURL}/user`)
      .send(payload)
      .withCredentials(),
    type: sessionActions.USER_SIGNUP,
  }
}

interface ILoginPayload {
  email: string
  plainPassword: string
}

function loginUser(payload: ILoginPayload): IAction {
  return {
    payload: request
      .post(`${backendURL}/session`)
      .send(payload)
      .withCredentials(),
    type: sessionActions.LOGIN,
  }
}

function logoutUser(): IAction {
  return {
    payload: request.delete(`${backendURL}/session`).withCredentials(),
    type: sessionActions.LOGOUT,
  }
}

interface IUpdateUserInfoPayload {
  currentEmail: string
  newEmail: string
  newPhone: string
}

function updateUserInfo(payload: IUpdateUserInfoPayload): IAction {
  return {
    payload: request
      .post(`${backendURL}/user/contactInfo`)
      .send({ email: payload.newEmail, phone: payload.newPhone })
      .withCredentials(),
    type: sessionActions.USER_EDIT_INFO,
  }
}

interface IChangePasswordPayload {
  email: string
  currentPassword: string
  newPassword: string
}

function changePassword(payload: IChangePasswordPayload): IAction {
  const { currentPassword, newPassword } = payload
  return {
    payload: request
      .post(`${backendURL}/user/password`)
      .send({ currentPassword, newPassword })
      .withCredentials(),
    type: sessionActions.USER_CHANGE_PASSWORD,
  }
}

function sendResetPasswordLink(payload: string): IAction {
  const email = payload
  return {
    payload: request.post(`${backendURL}/user/sendResetPasswordLink`).send({ email }),
    type: sessionActions.SEND_RESET_PASSWORD_LINK,
  }
}

function resetPasswordViaEmail(payload: { token: string; newPassword: string }): IAction {
  return {
    payload: request.post(`${backendURL}/user/resetPasswordViaEmail`).send(payload),
    type: sessionActions.CHECK_RESET_PASSWORD_LINK,
  }
}

interface ISwitchToPremiumPayload {
  token: string
  firstName: string
  lastName: string
}

function switchToPremium(payload: ISwitchToPremiumPayload): IAction {
  return {
    payload: request
      .post(`${backendURL}/user/switchToPremium`)
      .send(payload)
      .withCredentials(),
    type: sessionActions.SWITCH_TO_PREMIUM,
  }
}

function cancelPremium(): IAction {
  return {
    payload: request.post(`${backendURL}/user/cancelPremium`).withCredentials(),
    type: sessionActions.CANCEL_PREMIUM,
  }
}

function updateCreditCard(payload: { token: string }): IAction {
  return {
    payload: request
      .post(`${backendURL}/user/updateCreditCard`)
      .send(payload)
      .withCredentials(),
    type: sessionActions.UPDATE_CREDIT_CARD,
  }
}

function signupInfluencer(payload: { creator: Partial<ICreator>; plainPassword: string }): IAction {
  return {
    type: sessionActions.CREATOR_SIGNUP,
    payload: request
      .post(`${backendURL}/creators`)
      .send(payload)
      .withCredentials(),
  }
}

export {
  sessionActions,
  signupUser,
  loginUser,
  logoutUser,
  updateUserInfo,
  changePassword,
  resetPasswordViaEmail,
  sendResetPasswordLink,
  switchToPremium,
  cancelPremium,
  updateCreditCard,
  retrieveUser,
  signupInfluencer,
}
