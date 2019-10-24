/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddReferredBrandEmail
// ====================================================

export interface AddReferredBrandEmail_addReferredBrandEmail {
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

export interface AddReferredBrandEmail {
  /**
   * Add a referred brand email
   */
  addReferredBrandEmail: AddReferredBrandEmail_addReferredBrandEmail;
}

export interface AddReferredBrandEmailVariables {
  brandEmail: string;
}
