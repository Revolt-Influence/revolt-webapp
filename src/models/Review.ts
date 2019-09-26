import { TaskFormatType } from './Campaign'
import { ICreator } from './Creator'

export interface IReview {
  _id: string
  format: TaskFormatType
  medias: string[]
  link: string
  likes: number
  comments: number
  creator: string | ICreator
  postDate: number
  lastUpdateDate: number
  submitDate: number
}

export interface IBaseReview {
  link: string
  format: TaskFormatType
  creatorId: string
}
