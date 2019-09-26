import { IBrand } from './Brand'
import { ICreator } from './Creator'
import { IRequestStatus, defaultRequestStatus } from '../utils/request'

export interface IMessage {
  _id: string
  text: string
  brandAuthor: string // id
  creatorAuthor: string // id
  isAdminAuthor: boolean
  sentAt: number
  conversation: string // id
}

export interface IConversation {
  _id: string
  brand: IBrand | string
  creator: ICreator | string
  creationDate?: number
  messages: IMessage[]
  messagesCount: number
}

export interface IConversationsState {
  items: IConversation[]
  currentPage: number
  totalPages: number
  requests: {
    getConversationsPage: IRequestStatus
    getConversation: IRequestStatus
    sendMessage: IRequestStatus
  }
}

export const defaultConversationsState: IConversationsState = {
  items: [],
  currentPage: 1,
  totalPages: 1,
  requests: {
    getConversationsPage: defaultRequestStatus,
    getConversation: defaultRequestStatus,
    sendMessage: defaultRequestStatus,
  },
}

export interface IMessageDetailed {
  _id: string
  text: string
  sentAt: number
  isFromMe: boolean
  authorName: string
  authorPicture: string
}
