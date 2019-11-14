/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCreatorStripeLogin
// ====================================================

export interface GetCreatorStripeLogin_session_creator_youtube {
  __typename: "Youtuber";
  /**
   * Mongoose generated ID
   */
  _id: string;
  /**
   * Link of Youtube channel
   */
  url: string;
}

export interface GetCreatorStripeLogin_session_creator {
  __typename: "Creator";
  /**
   * Mongoose generated ID
   */
  _id: string;
  /**
   * The email is used for login and notifications
   */
  email: string;
  /**
   * Youtube account linked to the creator
   */
  youtube: GetCreatorStripeLogin_session_creator_youtube | null;
  /**
   * Temporary link used to access the Stripe dashboard
   */
  stripeLoginLink: string | null;
  /**
   * Whether the creator has a Stripe connect account
   */
  hasConnectedStripe: boolean;
}

export interface GetCreatorStripeLogin_session {
  __typename: "Session";
  /**
   * The creator that _may_ be logged in
   */
  creator: GetCreatorStripeLogin_session_creator | null;
}

export interface GetCreatorStripeLogin {
  /**
   * Check if a session exists, could be a creator or a brand user
   */
  session: GetCreatorStripeLogin_session;
}
