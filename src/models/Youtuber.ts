import { IYoutubeVideo } from './YoutubeVideo'
import { IAudienceMetric } from './Audience'

export interface IYoutubeAudience {
  topAges: IAudienceMetric[]
  topCountries: IAudienceMetric[]
  malePercentage: number // 60
  femalePercentage: number // 40
}

export interface IYoutuber {
  name: string // channel title
  subscriberCount: number
  viewCount: number
  videoCount: number
  channelId: string
  picture: string
  country: string
  language: string
  url: string
  audience: IYoutubeAudience
  videos: IYoutubeVideo[]
  uploadsPlaylistId: string
  lastScrapingDate: number // timestamp
  creationDate?: number // timestamp
}
