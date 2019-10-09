/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CampaignBriefInput, TrackingProvider, PublishingPlatform } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateCampaignBrief
// ====================================================

export interface UpdateCampaignBrief_updateCampaignBrief {
  __typename: "Campaign";
  /**
   * Mongoose generated ID
   */
  _id: string;
  /**
   * Rules that creators must respect to receive the gift
   */
  rules: string[];
  /**
   * Total amount of money that will be given to creators
   */
  estimatedBudget: number | null;
  /**
   * Solution used to provide game analytics
   */
  trackingProvider: TrackingProvider;
  /**
   * Where the game can be downloaded
   */
  publishingPlatforms: PublishingPlatform[];
}

export interface UpdateCampaignBrief {
  /**
   * Update existing campaign name, description or rules
   */
  updateCampaignBrief: UpdateCampaignBrief_updateCampaignBrief;
}

export interface UpdateCampaignBriefVariables {
  campaignBrief: CampaignBriefInput;
  campaignId: string;
}
