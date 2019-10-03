/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CampaignAudienceInput, Gender, AgeGroup } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateCampaignTargetAudience
// ====================================================

export interface UpdateCampaignTargetAudience_updateCampaignTargetAudience_targetAudience {
  __typename: "TargetAudience";
  /**
   * Men, women or both
   */
  gender: Gender;
  /**
   * ISO 3166-1-alpha-2 codes of countries
   */
  countries: string[];
  /**
   * Groups of age
   */
  ageGroups: AgeGroup[];
}

export interface UpdateCampaignTargetAudience_updateCampaignTargetAudience {
  __typename: "Campaign";
  /**
   * Mongoose generated ID
   */
  _id: string;
  /**
   * The ideal audience the brand wants to reach
   */
  targetAudience: UpdateCampaignTargetAudience_updateCampaignTargetAudience_targetAudience;
}

export interface UpdateCampaignTargetAudience {
  /**
   * Change the audience that a campaign should reach
   */
  updateCampaignTargetAudience: UpdateCampaignTargetAudience_updateCampaignTargetAudience;
}

export interface UpdateCampaignTargetAudienceVariables {
  targetAudience: CampaignAudienceInput;
  campaignId: string;
}
