/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CreatorStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetCreatorsPage
// ====================================================

export interface GetCreatorsPage_creators_items_youtube_videos {
  __typename: "YoutubeVideo";
  title: string;
  /**
   * Unique Youtube ID (not Mongoose-related)
   */
  videoId: string;
}

export interface GetCreatorsPage_creators_items_youtube_audience_ageGroups {
  __typename: "AudienceMetric";
  name: string;
  /**
   * Between 0 and 100
   */
  percentage: number;
}

export interface GetCreatorsPage_creators_items_youtube_audience_countries {
  __typename: "AudienceMetric";
  name: string;
  /**
   * Between 0 and 100
   */
  percentage: number;
}

export interface GetCreatorsPage_creators_items_youtube_audience {
  __typename: "YoutubeAudience";
  ageGroups: GetCreatorsPage_creators_items_youtube_audience_ageGroups[];
  /**
   * ISO 3166-1-alpha-2 codes of countries and their percentage
   */
  countries: GetCreatorsPage_creators_items_youtube_audience_countries[];
}

export interface GetCreatorsPage_creators_items_youtube {
  __typename: "Youtuber";
  /**
   * Mongoose generated ID
   */
  _id: string;
  /**
   * Channel title
   */
  name: string;
  /**
   * URL of image on Youtube CDN, not Cloudinary
   */
  picture: string;
  videoCount: number;
  subscriberCount: number;
  videos: GetCreatorsPage_creators_items_youtube_videos[];
  audience: GetCreatorsPage_creators_items_youtube_audience;
}

export interface GetCreatorsPage_creators_items {
  __typename: "Creator";
  /**
   * Mongoose generated ID
   */
  _id: string;
  /**
   * Creator-defined named, can be a full name or a pseudo
   */
  name: string;
  /**
   * Cloudinary URL of a picture got from user upload or a social network
   */
  picture: string;
  /**
   * Where the creator comes from
   */
  country: string;
  /**
   * Year of birth, used to get age approximation and ensure he is 13+
   */
  birthYear: number;
  /**
   * Youtube account linked to the creator
   */
  youtube: GetCreatorsPage_creators_items_youtube | null;
  /**
   * Whether the influencer was validated by an admin
   */
  status: CreatorStatus;
  createdAt: any;
}

export interface GetCreatorsPage_creators {
  __typename: "PaginatedCreatorResponse";
  currentPage: number;
  totalPages: number;
  items: GetCreatorsPage_creators_items[];
}

export interface GetCreatorsPage {
  /**
   * Get page of all signed up creators who linked a social network
   */
  creators: GetCreatorsPage_creators;
}

export interface GetCreatorsPageVariables {
  page: number;
  status: CreatorStatus;
}
