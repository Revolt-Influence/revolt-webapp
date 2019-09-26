import { IInfluencer, Gender } from './Influencer'
import { IRequestStatus, defaultRequestStatus } from '../utils/request'
import { IBrand } from './Brand'

export type FilterCampaignInfluencer = 'alreadyContacted' | 'notContacted'

export interface ICampaign {
  _id: string
  name: string
  owner: string
  creationDate: number
  settings?: ICampaignSettings
  isArchived: boolean // whether the brand removed it
  isReviewed: boolean // whether an admin has accepted it
}

export interface ICampaignBrief {
  description: string
}

export type CurrencyType = 'Euro' | 'US Dollar' | 'Pound Sterling'

export interface ICampaignGift {
  name: string
  valueIsShown?: boolean
  addressIsNeeded: boolean
  value?: number
  link?: string
  details?: string
  picture: string
  currency?: CurrencyType
}

export interface ICampaignTarget {
  gender: Gender
  country: string
  city: string
}

export type TaskFormatType = 'Instagram story' | 'Instagram post' | 'Youtube video'
export interface ICampaignTask {
  formats: TaskFormatType[]
  including: string
  daysToReview: number
  rules: string[]
}

export interface ICampaignSettings {
  brand: IBrand
  brief: ICampaignBrief
  gift: ICampaignGift
  target: ICampaignTarget
  task: ICampaignTask
}

export interface ICampaignInvite {
  token: string
  campaignSettings: ICampaignSettings
  campaignName: string
  influencer: IInfluencer
}

const defaultTask: ICampaignTask = {
  formats: ['Instagram post'],
  including: '',
  daysToReview: 15,
  rules: [],
}

// Redux store state
export interface ICampaignState {
  items: ICampaign[]
  totalPages: number
  currentPage: number
  requests: {
    getPage: IRequestStatus
    getCampaign: IRequestStatus
    createCampaign: IRequestStatus
    saveSettings: IRequestStatus
    toggleArchiveCampaign: IRequestStatus
    deleteCampaign: IRequestStatus
    reviewCampaign: IRequestStatus
  }
}

export interface ICampaignStatus {
  name: 'Non publié' | 'En ligne' | 'En attente de modération' | 'Incomplet'
  description: string
  color: string
}

const defaultCampaignState: ICampaignState = {
  items: [],
  totalPages: 1,
  currentPage: 1,
  requests: {
    getPage: defaultRequestStatus,
    getCampaign: defaultRequestStatus,
    createCampaign: defaultRequestStatus,
    saveSettings: defaultRequestStatus,
    toggleArchiveCampaign: defaultRequestStatus,
    deleteCampaign: defaultRequestStatus,
    reviewCampaign: defaultRequestStatus,
  },
}

export { defaultTask, defaultCampaignState }
