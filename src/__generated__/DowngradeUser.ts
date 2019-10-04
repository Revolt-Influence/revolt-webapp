/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { Plan } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: DowngradeUser
// ====================================================

export interface DowngradeUser_downgradeUser {
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

export interface DowngradeUser {
  /**
   * Cancel user Premium plan to go back to free
   */
  downgradeUser: DowngradeUser_downgradeUser;
}
