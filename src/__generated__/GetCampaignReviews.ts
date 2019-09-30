/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ReviewFormat } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetCampaignReviews
// ====================================================

export interface GetCampaignReviews_campaign_reviews_creator {
  __typename: "Creator";
  /**
   * Creator-defined named, can be a full name or a pseudo
   */
  name: string;
}

export interface GetCampaignReviews_campaign_reviews {
  __typename: "Review";
  /**
   * Platform of the review
   */
  format: ReviewFormat;
  commentCount: number;
  createdAt: any;
  likeCount: number;
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
   * All collabs linked to the campaign
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
