import { IUser } from './User'
import { IRequestStatus, defaultRequestStatus, loadingRequest } from '../utils/request'
import { ICreator } from './Creator'

export type SessionType = 'brand' | 'creator'

export interface AmbassadorStatus {
  signups: number
  activeSignups: number
}
const defaultAmbassadorStatus: AmbassadorStatus = {
  signups: 0,
  activeSignups: 0,
}

export interface ISession {
  isLoggedIn: boolean
  type: SessionType
  user: IUser
  creator: ICreator
  ambassadorStatus: AmbassadorStatus
  requests: {
    login: IRequestStatus
    signup: IRequestStatus
    editInfo: IRequestStatus
    logout: IRequestStatus
    changePassword: IRequestStatus
    sendResetPasswordLink: IRequestStatus
    resetPasswordViaEmail: IRequestStatus
    switchToPremium: IRequestStatus
    cancelPremium: IRequestStatus
    updateCreditCard: IRequestStatus
    retrieveUser: IRequestStatus
    reviewInfluencer: IRequestStatus
    saveCreatorProfile: IRequestStatus
    linkYoutubeChannel: IRequestStatus
    updateCreatorContact: IRequestStatus
  }
}

const defaultSession: ISession = {
  isLoggedIn: false,
  type: null,
  user: null,
  creator: null,
  ambassadorStatus: defaultAmbassadorStatus,
  requests: {
    login: defaultRequestStatus,
    signup: defaultRequestStatus,
    editInfo: defaultRequestStatus,
    logout: defaultRequestStatus,
    changePassword: defaultRequestStatus,
    sendResetPasswordLink: defaultRequestStatus,
    resetPasswordViaEmail: defaultRequestStatus,
    switchToPremium: defaultRequestStatus,
    cancelPremium: defaultRequestStatus,
    updateCreditCard: defaultRequestStatus,
    retrieveUser: loadingRequest,
    reviewInfluencer: defaultRequestStatus,
    saveCreatorProfile: defaultRequestStatus,
    linkYoutubeChannel: defaultRequestStatus,
    updateCreatorContact: defaultRequestStatus,
  },
}

export type Plan = 'free' | 'premium' | 'admin'

export { defaultSession }
