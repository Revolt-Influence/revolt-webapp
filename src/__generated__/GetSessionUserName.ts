/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSessionUserName
// ====================================================

export interface GetSessionUserName_session_user {
  __typename: "User";
  /**
   * Only created for Premium users
   */
  firstName: string | null;
  /**
   * Only created for Premium users
   */
  lastName: string | null;
}

export interface GetSessionUserName_session {
  __typename: "Session";
  /**
   * The user that _may_ be logged in
   */
  user: GetSessionUserName_session_user | null;
}

export interface GetSessionUserName {
  /**
   * Check if a session exists, could be a creator or a brand user
   */
  session: GetSessionUserName_session;
}
