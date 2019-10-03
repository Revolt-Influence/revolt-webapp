/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CampaignBriefInput } from "./globalTypes";

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
   * The campaign name that is promoted to the creators
   */
  name: string;
  /**
   * More info about the campaign and its goals
   */
  description: string;
  /**
   * Rules that creators must respect to receive the gift
   */
  rules: string[];
  /**
   * Total amount of money that will be given to creators
   */
  estimatedBudget: number | null;
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
