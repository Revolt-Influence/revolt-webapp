/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateStripeConnectedAccount
// ====================================================

export interface CreateStripeConnectedAccount_createStripeConnectedAccount {
  __typename: "Creator";
  /**
   * Mongoose generated ID
   */
  _id: string;
}

export interface CreateStripeConnectedAccount {
  /**
   * Create Stripe connected account from code
   */
  createStripeConnectedAccount: CreateStripeConnectedAccount_createStripeConnectedAccount;
}

export interface CreateStripeConnectedAccountVariables {
  code: string;
}
