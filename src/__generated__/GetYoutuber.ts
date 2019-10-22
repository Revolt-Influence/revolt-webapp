/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetYoutuber
// ====================================================

export interface GetYoutuber_youtuber_videos {
  __typename: "YoutubeVideo";
  title: string;
  /**
   * Unique Youtube ID (not Mongoose-related)
   */
  videoId: string;
}

export interface GetYoutuber_youtuber_audience_ageGroups {
  __typename: "AudienceMetric";
  name: string;
  /**
   * Between 0 and 100
   */
  percentage: number;
}

export interface GetYoutuber_youtuber_audience_countries {
  __typename: "AudienceMetric";
  name: string;
  /**
   * Between 0 and 100
   */
  percentage: number;
}

export interface GetYoutuber_youtuber_audience {
  __typename: "YoutubeAudience";
  ageGroups: GetYoutuber_youtuber_audience_ageGroups[];
  /**
   * ISO 3166-1-alpha-2 codes of countries and their percentage
   */
  countries: GetYoutuber_youtuber_audience_countries[];
  /**
   * Percentage of male subscribers, between 0 and 100
   */
  malePercentage: number;
  /**
   * Percentage of female subscribers, between 0 and 100
   */
  femalePercentage: number;
}

export interface GetYoutuber_youtuber {
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
  videos: GetYoutuber_youtuber_videos[];
  audience: GetYoutuber_youtuber_audience;
}

export interface GetYoutuber {
  /**
   * Get Youtuber by ID
   */
  youtuber: GetYoutuber_youtuber;
}

export interface GetYoutuberVariables {
  youtuberId: string;
}
