/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CollabStatus, ReviewFormat } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetCampaignReviews
// ====================================================

export interface GetCampaignReviews_campaign_collabs_review {
  __typename: "Review";
  /**
   * Mongoose generated ID
   */
  _id: string;
}

export interface GetCampaignReviews_campaign_collabs {
  __typename: "Collab";
  /**
   * Mongoose generated ID
   */
  _id: string;
  /**
   * Advancement of the collab
   */
  status: CollabStatus;
  /**
   * How much the influencer wants to be paid in USD
   */
  quote: number;
  /**
   * Social media post made for the campaign
   */
  review: GetCampaignReviews_campaign_collabs_review | null;
}

export interface GetCampaignReviews_campaign_reviews_stats {
  __typename: "ReviewStats";
  /**
   * Mongoose generated ID
   */
  _id: string;
  createdAt: any;
  commentCount: number;
  likeCount: number;
  viewCount: number;
  /**
   * How many times the collab-specific link was clicked
   */
  linkClicksCount: number;
}

export interface GetCampaignReviews_campaign_reviews_creator {
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
}

export interface GetCampaignReviews_campaign_reviews {
  __typename: "Review";
  /**
   * Mongoose generated ID
   */
  _id: string;
  /**
   * Platform of the review
   */
  format: ReviewFormat;
  /**
   * ID specific to the platform the review is hosted on (not Mongoose related).  e.g.: youtube video ID
   */
  platformId: string;
  /**
   * History of the reviews stats since they were added
   */
  stats: GetCampaignReviews_campaign_reviews_stats[];
  createdAt: any;
  /**
   * Link to view the review
   */
  link: string;
  /**
   * Creator who made the review
   */
  creator: GetCampaignReviews_campaign_reviews_creator;
}

export interface GetCampaignReviews_campaign {
  __typename: "Campaign";
  /**
   * Mongoose generated ID
   */
  _id: string;
  /**
   * All collabs linked to the campaign
   */
  collabs: GetCampaignReviews_campaign_collabs[];
  /**
   * All reviews made for the campaign
   */
  reviews: GetCampaignReviews_campaign_reviews[];
}

export interface GetCampaignReviews {
  /**
   * Get campaign by ID
   */
  campaign: GetCampaignReviews_campaign;
}

export interface GetCampaignReviewsVariables {
  campaignId: string;
}
