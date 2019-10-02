/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateCreatorEmail
// ====================================================

export interface UpdateCreatorEmail_updateCreatorEmail {
  __typename: "Creator";
  /**
   * Mongoose generated ID
   */
  _id: string;
  /**
   * The email is used for login and notifications
   */
  email: string;
}

export interface UpdateCreatorEmail {
  /**
   * Change creator email
   */
  updateCreatorEmail: UpdateCreatorEmail_updateCreatorEmail;
}

export interface UpdateCreatorEmailVariables {
  newEmail: string;
}
