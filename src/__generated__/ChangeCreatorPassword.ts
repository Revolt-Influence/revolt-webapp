/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ChangeCreatorPassword
// ====================================================

export interface ChangeCreatorPassword_changeCreatorPassword {
  __typename: "Creator";
  /**
   * Mongoose generated ID
   */
  _id: string;
}

export interface ChangeCreatorPassword {
  /**
   * Change creator password
   */
  changeCreatorPassword: ChangeCreatorPassword_changeCreatorPassword;
}

export interface ChangeCreatorPasswordVariables {
  newPassword: string;
  currentPassword: string;
}
