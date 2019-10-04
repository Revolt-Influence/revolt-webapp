/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { TrackingProvider } from "./globalTypes";

// ====================================================
// GraphQL fragment: CampaignBriefFragment
// ====================================================

export interface CampaignBriefFragment {
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
  /**
   * Solution used to provide game analytics
   */
  trackingProvider: TrackingProvider;
}
