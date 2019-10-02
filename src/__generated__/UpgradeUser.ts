/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { Plan } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpgradeUser
// ====================================================

export interface UpgradeUser_upgradeUser {
  __typename: "User";
  _id: string;
  /**
   * Whether the user has paid
   */
  plan: Plan;
  /**
   * Got from Stripe, used to tell what card the user used
   */
  creditCardLast4: string | null;
}

export interface UpgradeUser {
  /**
   * Switch user to Premium plan
   */
  upgradeUser: UpgradeUser_upgradeUser;
}

export interface UpgradeUserVariables {
  firstName: string;
  lastName: string;
  paymentToken: string;
}
