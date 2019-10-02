/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ReviewCampaign
// ====================================================

export interface ReviewCampaign_reviewCampaign {
  __typename: "Campaign";
  /**
   * Mongoose generated ID
   */
  _id: string;
  /**
   * Whether the brand is willing to publish the campaign
   */
  isArchived: boolean;
  /**
   * Whether an admin allowed the campaign to be published
   */
  isReviewed: boolean;
}

export interface ReviewCampaign {
  /**
   * Admin only, allows campaign publication
   */
  reviewCampaign: ReviewCampaign_reviewCampaign;
}

export interface ReviewCampaignVariables {
  campaignId: string;
}
