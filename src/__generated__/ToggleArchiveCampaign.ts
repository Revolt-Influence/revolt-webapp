/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ToggleArchiveCampaign
// ====================================================

export interface ToggleArchiveCampaign_toggleArchiveCampaign {
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

export interface ToggleArchiveCampaign {
  /**
   * Switch isArchived status
   */
  toggleArchiveCampaign: ToggleArchiveCampaign_toggleArchiveCampaign;
}

export interface ToggleArchiveCampaignVariables {
  campaignId: string;
}
