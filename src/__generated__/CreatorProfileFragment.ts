/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { Language } from "./globalTypes";

// ====================================================
// GraphQL fragment: CreatorProfileFragment
// ====================================================

export interface CreatorProfileFragment_youtube_videos {
  __typename: "YoutubeVideo";
  title: string;
  /**
   * Unique Youtube ID (not Mongoose-related)
   */
  videoId: string;
}

export interface CreatorProfileFragment_youtube_audience_ageGroups {
  __typename: "AudienceMetric";
  name: string;
  /**
   * Between 0 and 100
   */
  percentage: number;
}

export interface CreatorProfileFragment_youtube_audience_countries {
  __typename: "AudienceMetric";
  name: string;
  /**
   * Between 0 and 100
   */
  percentage: number;
}

export interface CreatorProfileFragment_youtube_audience {
  __typename: "YoutubeAudience";
  ageGroups: CreatorProfileFragment_youtube_audience_ageGroups[];
  /**
   * ISO 3166-1-alpha-2 codes of countries and their percentage
   */
  countries: CreatorProfileFragment_youtube_audience_countries[];
  /**
   * Percentage of male subscribers, between 0 and 100
   */
  malePercentage: number;
  /**
   * Percentage of female subscribers, between 0 and 100
   */
  femalePercentage: number;
}

export interface CreatorProfileFragment_youtube {
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
  videos: CreatorProfileFragment_youtube_videos[];
  audience: CreatorProfileFragment_youtube_audience;
}

export interface CreatorProfileFragment {
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
  birthYear: number;
  /**
   * What language creator's content is in
   */
  language: Language;
  /**
   * Youtube account linked to the creator
   */
  youtube: CreatorProfileFragment_youtube | null;
}
