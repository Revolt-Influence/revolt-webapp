/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { Language, CreatorStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetCreator
// ====================================================

export interface GetCreator_creator_youtube_videos {
  __typename: "YoutubeVideo";
  title: string;
  /**
   * Unique Youtube ID (not Mongoose-related)
   */
  videoId: string;
}

export interface GetCreator_creator_youtube_audience_ageGroups {
  __typename: "AudienceMetric";
  name: string;
  /**
   * Between 0 and 100
   */
  percentage: number;
}

export interface GetCreator_creator_youtube_audience_countries {
  __typename: "AudienceMetric";
  name: string;
  /**
   * Between 0 and 100
   */
  percentage: number;
}

export interface GetCreator_creator_youtube_audience {
  __typename: "YoutubeAudience";
  ageGroups: GetCreator_creator_youtube_audience_ageGroups[];
  /**
   * ISO 3166-1-alpha-2 codes of countries and their percentage
   */
  countries: GetCreator_creator_youtube_audience_countries[];
  /**
   * Percentage of male subscribers, between 0 and 100
   */
  malePercentage: number;
  /**
   * Percentage of female subscribers, between 0 and 100
   */
  femalePercentage: number;
}

export interface GetCreator_creator_youtube {
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
  medianViews: number;
  subscriberCount: number;
  videos: GetCreator_creator_youtube_videos[];
  audience: GetCreator_creator_youtube_audience;
}

export interface GetCreator_creator {
  __typename: "Creator";
  /**
   * Mongoose generated ID
   */
  _id: string;
  /**
   * Creator display name, can be a full name or a pseudo
   */
  name: string | null;
  /**
   * Cloudinary URL of a picture got from user upload or a social network
   */
  picture: string | null;
  /**
   * Year of birth, used to get age approximation and ensure he is 13+
   */
  birthYear: number | null;
  /**
   * What language creator's content is in
   */
  language: Language | null;
  /**
   * Youtube account linked to the creator
   */
  youtube: GetCreator_creator_youtube | null;
  /**
   * Whether the influencer was validated by an admin
   */
  status: CreatorStatus;
}

export interface GetCreator {
  /**
   * Get specific creator by ID or email
   */
  creator: GetCreator_creator | null;
}

export interface GetCreatorVariables {
  creatorId: string;
}
