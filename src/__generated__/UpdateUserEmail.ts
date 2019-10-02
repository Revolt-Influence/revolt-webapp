/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateUserEmail
// ====================================================

export interface UpdateUserEmail_updateUserEmail {
  __typename: "User";
  _id: string;
  /**
   * Used for login and notification and marketing emails
   */
  email: string;
}

export interface UpdateUserEmail {
  /**
   * Change user email
   */
  updateUserEmail: UpdateUserEmail_updateUserEmail;
}

export interface UpdateUserEmailVariables {
  newEmail: string;
}
