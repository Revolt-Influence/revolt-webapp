/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: YoutuberProfileFragment
// ====================================================

export interface YoutuberProfileFragment_videos {
  __typename: "YoutubeVideo";
  title: string;
  /**
   * Unique Youtube ID (not Mongoose-related)
   */
  videoId: string;
}

export interface YoutuberProfileFragment_audience_ageGroups {
  __typename: "AudienceMetric";
  name: string;
  /**
   * Between 0 and 100
   */
  percentage: number;
}

export interface YoutuberProfileFragment_audience_countries {
  __typename: "AudienceMetric";
  name: string;
  /**
   * Between 0 and 100
   */
  percentage: number;
}

export interface YoutuberProfileFragment_audience {
  __typename: "YoutubeAudience";
  ageGroups: YoutuberProfileFragment_audience_ageGroups[];
  /**
   * ISO 3166-1-alpha-2 codes of countries and their percentage
   */
  countries: YoutuberProfileFragment_audience_countries[];
}

export interface YoutuberProfileFragment {
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
  videos: YoutuberProfileFragment_videos[];
  audience: YoutuberProfileFragment_audience;
}
