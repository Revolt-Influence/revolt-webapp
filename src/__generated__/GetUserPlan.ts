/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { Plan } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetUserPlan
// ====================================================

export interface GetUserPlan_session_user {
  __typename: "User";
  /**
   * Whether the user has paid
   */
  plan: Plan;
  /**
   * Got from Stripe, used to tell what card the user used
   */
  creditCardLast4: string | null;
}

export interface GetUserPlan_session {
  __typename: "Session";
  /**
   * The user that _may_ be logged in
   */
  user: GetUserPlan_session_user | null;
}

export interface GetUserPlan {
  /**
   * Check if a session exists, could be a creator or a brand user
   */
  session: GetUserPlan_session;
}
