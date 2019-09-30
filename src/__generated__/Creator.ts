/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Creator
// ====================================================

export interface Creator_creator_youtube_videos {
  __typename: "YoutubeVideo";
  title: string;
  /**
   * Unique Youtube ID (not Mongoose-related)
   */
  videoId: string;
}

export interface Creator_creator_youtube_audience_ageGroups {
  __typename: "AudienceMetric";
  name: string;
  /**
   * Between 0 and 100
   */
  percentage: number;
}

export interface Creator_creator_youtube_audience_countries {
  __typename: "AudienceMetric";
  name: string;
  /**
   * Between 0 and 100
   */
  percentage: number;
}

export interface Creator_creator_youtube_audience {
  __typename: "YoutubeAudience";
  ageGroups: Creator_creator_youtube_audience_ageGroups[];
  /**
   * ISO 3166-1-alpha-2 codes of countries and their percentage
   */
  countries: Creator_creator_youtube_audience_countries[];
}

export interface Creator_creator_youtube {
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
  videos: Creator_creator_youtube_videos[];
  audience: Creator_creator_youtube_audience;
}

export interface Creator_creator {
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
  youtube: Creator_creator_youtube | null;
}

export interface Creator {
  /**
   * Get specific creator by ID or email
   */
  creator: Creator_creator | null;
}

export interface CreatorVariables {
  creatorId: string;
}
