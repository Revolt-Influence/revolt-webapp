/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SaveUserPaymentMethod
// ====================================================

export interface SaveUserPaymentMethod_saveUserPaymentMethod {
  __typename: "User";
  _id: string;
  /**
   * Whether the user has entered a payment method
   */
  hasPaymentMethod: boolean;
}

export interface SaveUserPaymentMethod {
  /**
   * Save payment method and link it to a Stripe customer
   */
  saveUserPaymentMethod: SaveUserPaymentMethod_saveUserPaymentMethod;
}

export interface SaveUserPaymentMethodVariables {
  token: string;
}
