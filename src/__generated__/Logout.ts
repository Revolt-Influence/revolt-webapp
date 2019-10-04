/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Logout
// ====================================================

export interface Logout_logout {
  __typename: "Session";
  /**
   * ID used to uniquely identify the session from the GQL client, null if logged out
   */
  sessionId: string | null;
}

export interface Logout {
  /**
   * Destroy session for creator or user
   */
  logout: Logout_logout;
}
