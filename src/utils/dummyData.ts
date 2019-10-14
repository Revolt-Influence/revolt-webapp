import {
  GetCampaignRequestedCollabs_campaign_collabs,
  GetCampaignRequestedCollabs_campaign_collabs_creator,
  GetCampaignRequestedCollabs_campaign_collabs_creator_youtube,
} from '../__generated__/GetCampaignRequestedCollabs'
import { CollabStatus, Language, ReviewFormat } from '../__generated__/globalTypes'
import { GetCampaignCollabs_campaign_collabs } from '../__generated__/GetCampaignCollabs'
import { GetCampaignReviews_campaign_reviews } from '../__generated__/GetCampaignReviews'

export const dummyYoutuber: GetCampaignRequestedCollabs_campaign_collabs_creator_youtube = {
  __typename: 'Youtuber',
  _id: 'DUMMY_YOUTUBER_1',
  videoCount: 12,
  name: 'Dummy YouTube Channel',
  picture:
    'https://res.cloudinary.com/revolt/image/upload/v1570798076/creator_pictures/arfcvup1uhfctcmvuuhf.svg',
  subscriberCount: 324579,
  videos: [
    {
      __typename: 'YoutubeVideo',
      videoId: 'YbJOTdZBX1g',
      title: 'Rewind 2018',
    },
    {
      __typename: 'YoutubeVideo',
      videoId: 'FlsCjmMhFmw',
      title: 'Rewind 2017',
    },
  ],
  audience: {
    __typename: 'YoutubeAudience',
    ageGroups: [
      { __typename: 'AudienceMetric', name: 'age13-17', percentage: 2.6 },
      { __typename: 'AudienceMetric', name: 'age18-24', percentage: 31.8 },
      { __typename: 'AudienceMetric', name: 'age25-34', percentage: 43.6 },
      { __typename: 'AudienceMetric', name: 'age35-44', percentage: 16.2 },
      { __typename: 'AudienceMetric', name: 'age45-54', percentage: 5 },
      { __typename: 'AudienceMetric', name: 'age55-64', percentage: 0.4 },
      { __typename: 'AudienceMetric', name: 'age65-', percentage: 0.5 },
    ],
    countries: [
      { __typename: 'AudienceMetric', name: 'AU', percentage: 1.8957609338763217 },
      { __typename: 'AudienceMetric', name: 'BR', percentage: 2.6999369111620326 },
      { __typename: 'AudienceMetric', name: 'CA', percentage: 4.670093064208131 },
      { __typename: 'AudienceMetric', name: 'DE', percentage: 4.0796807600964735 },
      { __typename: 'AudienceMetric', name: 'FR', percentage: 1.4184893559458394 },
      { __typename: 'AudienceMetric', name: 'GB', percentage: 7.10069582315743 },
      { __typename: 'AudienceMetric', name: 'GE', percentage: 0.04286041445578522 },
      { __typename: 'AudienceMetric', name: 'US', percentage: 46.75627037864648 },
    ],
    malePercentage: 65.4,
    femalePercentage: 34.6,
  },
}

export const dummyCreator: GetCampaignRequestedCollabs_campaign_collabs_creator = {
  __typename: 'Creator',
  _id: 'DUMMY_CREATOR_1',
  birthYear: 1989,
  language: Language.ENGLISH,
  name: 'Dummy Influencer',
  picture:
    'https://res.cloudinary.com/revolt/image/upload/v1570798076/creator_pictures/arfcvup1uhfctcmvuuhf.svg',
  youtube: dummyYoutuber,
}

export const dummyCollabRequest: GetCampaignRequestedCollabs_campaign_collabs = {
  __typename: 'Collab',
  _id: 'DUMMY_COLLAB_REQUEST',
  conversation: null,
  createdAt: Date.now(),
  message:
    "Hi! I'm a dummy YouTuber. This is what a collab request from a real influencer will look like.",
  status: CollabStatus.REQUEST,
  creator: dummyCreator,
}

export const dummyDoneCollab: GetCampaignCollabs_campaign_collabs = {
  __typename: 'Collab',
  _id: 'DUMMY_DONE_COLLAB',
  conversation: null,
  creator: {
    ...dummyCreator,
    youtube: {
      ...dummyYoutuber,
      __typename: 'Youtuber',
      _id: 'DUMMY_YOUTUBER_2',
      subscriberCount: 53029,
      videoCount: 421,
      viewCount: 4984853,
    },
  },
  message: "Here is what a collab will look like once it's completed",
  status: CollabStatus.DONE,
  updatedAt: Date.now(),
}

export const dummyReview: GetCampaignReviews_campaign_reviews = {
  __typename: 'Review',
  _id: 'DUMMY_REVIEW',
  commentCount: 924,
  createdAt: Date.now(),
  creator: dummyCreator,
  format: ReviewFormat.YOUTUBE_VIDEO,
  likeCount: 12043,
  link: 'https://www.youtube.com/watch?v=mLyOj_QD4a4',
}
