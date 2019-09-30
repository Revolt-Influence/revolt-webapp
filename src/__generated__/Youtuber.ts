/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Youtuber
// ====================================================

export interface Youtuber_youtuber_videos {
  __typename: "YoutubeVideo";
  title: string;
  /**
   * Unique Youtube ID (not Mongoose-related)
   */
  videoId: string;
}

export interface Youtuber_youtuber_audience_ageGroups {
  __typename: "AudienceMetric";
  name: string;
  /**
   * Between 0 and 100
   */
  percentage: number;
}

export interface Youtuber_youtuber_audience_countries {
  __typename: "AudienceMetric";
  name: string;
  /**
   * Between 0 and 100
   */
  percentage: number;
}

export interface Youtuber_youtuber_audience {
  __typename: "YoutubeAudience";
  ageGroups: Youtuber_youtuber_audience_ageGroups[];
  /**
   * ISO 3166-1-alpha-2 codes of countries and their percentage
   */
  countries: Youtuber_youtuber_audience_countries[];
}

export interface Youtuber_youtuber {
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
  videos: Youtuber_youtuber_videos[];
  audience: Youtuber_youtuber_audience;
}

export interface Youtuber {
  /**
   * Get Youtuber by ID
   */
  youtuber: Youtuber_youtuber;
}

export interface YoutuberVariables {
  youtuberId: string;
}
