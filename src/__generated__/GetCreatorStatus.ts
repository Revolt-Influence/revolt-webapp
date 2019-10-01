/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CreatorStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetCreatorStatus
// ====================================================

export interface GetCreatorStatus_session_creator {
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

export interface GetCreatorStatus_session {
  __typename: "Session";
  /**
   * The creator that _may_ be logged in
   */
  creator: GetCreatorStatus_session_creator | null;
}

export interface GetCreatorStatus {
  /**
   * Check if a session exists, could be a creator or a brand user
   */
  session: GetCreatorStatus_session;
}
