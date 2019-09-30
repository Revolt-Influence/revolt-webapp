/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: YoutuberProfile
// ====================================================

export interface YoutuberProfile_videos {
  __typename: "YoutubeVideo";
  title: string;
  /**
   * Unique Youtube ID (not Mongoose-related)
   */
  videoId: string;
}

export interface YoutuberProfile_audience_ageGroups {
  __typename: "AudienceMetric";
  name: string;
  /**
   * Between 0 and 100
   */
  percentage: number;
}

export interface YoutuberProfile_audience_countries {
  __typename: "AudienceMetric";
  name: string;
  /**
   * Between 0 and 100
   */
  percentage: number;
}

export interface YoutuberProfile_audience {
  __typename: "YoutubeAudience";
  ageGroups: YoutuberProfile_audience_ageGroups[];
  /**
   * ISO 3166-1-alpha-2 codes of countries and their percentage
   */
  countries: YoutuberProfile_audience_countries[];
}

export interface YoutuberProfile {
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
  videos: YoutuberProfile_videos[];
  audience: YoutuberProfile_audience;
}
