/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ResetPassword
// ====================================================

export interface ResetPassword {
  /**
   * Reset password from forgot password email link
   */
  resetPasswordViaEmail: string;
}

export interface ResetPasswordVariables {
  newPassword: string;
  token: string;
}
