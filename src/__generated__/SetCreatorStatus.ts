/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CreatorStatus } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: SetCreatorStatus
// ====================================================

export interface SetCreatorStatus_setCreatorStatus {
  __typename: "Creator";
  /**
   * Mongoose generated ID
   */
  _id: string;
  /**
   * Whether the influencer was validated by an admin
   */
  status: CreatorStatus;
}

export interface SetCreatorStatus {
  /**
   * Admin marks creator as verified or blocked
   */
  setCreatorStatus: SetCreatorStatus_setCreatorStatus;
}

export interface SetCreatorStatusVariables {
  creatorId: string;
  newStatus: CreatorStatus;
}
