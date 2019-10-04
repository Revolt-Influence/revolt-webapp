/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ResetPasswordMutation
// ====================================================

export interface ResetPasswordMutation {
  /**
   * Reset password from forgot password email link
   */
  resetPasswordViaEmail: string;
}

export interface ResetPasswordMutationVariables {
  newPassword: string;
  token: string;
}
