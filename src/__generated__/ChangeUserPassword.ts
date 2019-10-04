/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ChangeUserPassword
// ====================================================

export interface ChangeUserPassword_changeUserPassword {
  __typename: "User";
  _id: string;
}

export interface ChangeUserPassword {
  /**
   * Change user password
   */
  changeUserPassword: ChangeUserPassword_changeUserPassword;
}

export interface ChangeUserPasswordVariables {
  newPassword: string;
  currentPassword: string;
}
