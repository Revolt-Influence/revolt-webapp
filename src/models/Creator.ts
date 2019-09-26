import { IInfluencer } from './Influencer'
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
  instagram?: IInfluencer
  youtube?: IYoutuber
  instagramToken?: string
  instagramUsername?: string
  instagramIsVerified: boolean
  postalAddress?: IPostalAddress
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
    updateInstagramPhoto: IRequestStatus
    checkInstagramToken: IRequestStatus
    saveInstagramPosts: IRequestStatus
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
    updateInstagramPhoto: defaultRequestStatus,
    checkInstagramToken: defaultRequestStatus,
    saveInstagramPosts: defaultRequestStatus,
    getProfilesPage: defaultRequestStatus,
    setStatus: defaultRequestStatus,
  },
}

export interface IPostalAddress {
  firstName: string
  lastName: string
  address?: string
  addressLine2?: string
  postalCode?: string
  city?: string
  country?: string
}

export { defaultCreatorState }
