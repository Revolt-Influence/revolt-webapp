import { TaskFormatType } from './Campaign'
import { IRequestStatus, defaultRequestStatus } from '../utils/request'
import { ICreator, IPostalAddress } from './Creator'
import { IReview } from './Review'

export type DashboardAction = 'accept' | 'refuse' | 'markAsSent'

export interface ICollabProposition extends IPostalAddress {
  formats: TaskFormatType[]
  message: string
}

export type CollabStatus = 'invited' | 'proposed' | 'accepted' | 'sent' | 'refused' | 'done'

export interface ICollab {
  _id: string
  status: CollabStatus
  invitedUsername?: string
  creator: ICreator | string
  campaign: string // just the id
  deadline: number // Timestamp
  proposition: ICollabProposition
  creationDate: number
  acceptedDate?: number
  refusedDate?: number
  sentDate?: number
  doneDate?: number
  reviews: IReview[]
  conversation: string // id
}

// Redux store state
export interface ICollabState {
  items: ICollab[]
  usernamesUpdating: string[]
  requests: {
    reviewProposition: IRequestStatus
    applyToExperience: IRequestStatus
    submitCreatorReviews: IRequestStatus
  }
}

const defaultCollabState: ICollabState = {
  items: [],
  usernamesUpdating: [],
  requests: {
    reviewProposition: defaultRequestStatus,
    applyToExperience: defaultRequestStatus,
    submitCreatorReviews: defaultRequestStatus,
  },
}

export { defaultCollabState }
