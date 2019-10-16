/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCreatorExpectedViews
// ====================================================

export interface GetCreatorExpectedViews_session_creator_youtube {
  __typename: "Youtuber";
  /**
   * Mongoose generated ID
   */
  _id: string;
  medianViews: number;
  estimatedCpm: number;
}

export interface GetCreatorExpectedViews_session_creator {
  __typename: "Creator";
  /**
   * Mongoose generated ID
   */
  _id: string;
  /**
   * Youtube account linked to the creator
   */
  youtube: GetCreatorExpectedViews_session_creator_youtube | null;
}

export interface GetCreatorExpectedViews_session {
  __typename: "Session";
  /**
   * The creator that _may_ be logged in
   */
  creator: GetCreatorExpectedViews_session_creator | null;
}

export interface GetCreatorExpectedViews {
  /**
   * Check if a session exists, could be a creator or a brand user
   */
  session: GetCreatorExpectedViews_session;
}
