import { IRequestStatus, defaultRequestStatus } from '../utils/request'
import { IYoutuber } from './Youtuber'

export type Gender = 'male' | 'female'
export type CreatorStatus = 'unverified' | 'verified' | 'blocked'

export interface ICreator {
  _id?: string
  email: string
  phone: string
  picture: string
  name: string // display name
  gender: Gender
  country: string
  language: string
  birthYear: number // 2002
  passwordHash?: string
  youtube?: IYoutuber
  ambassador?: string // _id
  signupDate?: number
  status: CreatorStatus
}

export interface ICreatorState {
  items: ICreator[]
  currentPage: number
  totalPages: number
  requests: {
    getFullProfile: IRequestStatus
    getProfilesPage: IRequestStatus
    setStatus: IRequestStatus
  }
}

const defaultCreatorState: ICreatorState = {
  items: [],
  totalPages: 1,
  currentPage: 1,
  requests: {
    getFullProfile: defaultRequestStatus,
    getProfilesPage: defaultRequestStatus,
    setStatus: defaultRequestStatus,
  },
}

export { defaultCreatorState }
