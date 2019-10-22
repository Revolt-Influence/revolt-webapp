/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUserPaymentInfo
// ====================================================

export interface GetUserPaymentInfo_session_user {
  __typename: "User";
  _id: string;
  /**
   * Whether the user has entered a payment method
   */
  hasPaymentMethod: boolean;
  /**
   * Last digits of the saved credit card
   */
  creditCardLast4: string | null;
}

export interface GetUserPaymentInfo_session {
  __typename: "Session";
  /**
   * ID used to uniquely identify the session from the GQL client, null if logged out
   */
  sessionId: string | null;
  /**
   * The user that _may_ be logged in
   */
  user: GetUserPaymentInfo_session_user | null;
}

export interface GetUserPaymentInfo {
  /**
   * Check if a session exists, could be a creator or a brand user
   */
  session: GetUserPaymentInfo_session;
}
