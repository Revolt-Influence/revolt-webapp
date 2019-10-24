/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCreatorReferredBrandEmails
// ====================================================

export interface GetCreatorReferredBrandEmails_session_creator {
  __typename: "Creator";
  /**
   * Mongoose generated ID
   */
  _id: string;
  /**
   * Email of brands that the influencer referred
   */
  referredBrandEmails: string[];
}

export interface GetCreatorReferredBrandEmails_session {
  __typename: "Session";
  /**
   * The creator that _may_ be logged in
   */
  creator: GetCreatorReferredBrandEmails_session_creator | null;
}

export interface GetCreatorReferredBrandEmails {
  /**
   * Check if a session exists, could be a creator or a brand user
   */
  session: GetCreatorReferredBrandEmails_session;
}
