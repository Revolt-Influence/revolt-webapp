export type InstagramPostFormat = 'photo' | 'video'

export interface IInstagramPost {
  format: InstagramPostFormat
  imageLink: string
  postLink: string
  likes: number
  views: number
  comments: number
}
