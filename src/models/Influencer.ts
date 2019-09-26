import { IAudience } from './Audience'
import { IBrand } from './Brand'
import { IInstagramPost } from './InstagramPost'

export type Gender = 'male' | 'female'

export interface IInfluencer {
  // Whether the influencer is opt-in
  isSignedUp: boolean
  // Instagram data
  engagement_rate: number // Between 0 and 1
  score: number
  is_reviewed: boolean
  reach: number
  follow: number
  bio: string
  bio_lang: string
  top_20_hashtags: { [key: string]: number }
  category: string[]
  comments: number
  contact_email: string
  followers: number
  likes: number
  location: string[]
  picture_url: string
  post_count: number
  phone: string
  username: string
  website: string
  posts_lang: string // ISO A2 Code (fr, en...)
  mentionedBrands: IBrand[] | string[]
  sponsored_engagement_rate: number // Between 0 and 1
  sponsored_percentage: number // Between 0 and 100
  audience: IAudience
  posts: IInstagramPost[]
  lastPostsScraping: number // timestamp
}
