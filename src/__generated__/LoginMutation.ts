/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { SessionType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: LoginMutation
// ====================================================

export interface LoginMutation_login_user {
  __typename: "User";
  /**
   * Used for login and notification and marketing emails
   */
  email: string;
}

export interface LoginMutation_login_creator {
  __typename: "Creator";
  /**
   * The email is used for login and notifications
   */
  email: string;
}

export interface LoginMutation_login {
  __typename: "Session";
  /**
   * Whether a session was found
   */
  isLoggedIn: boolean;
  /**
   * ID used to uniquely identify the session from the GQL client, null if logged out
   */
  sessionId: string | null;
  sessionType: SessionType | null;
  /**
   * The user that _may_ be logged in
   */
  user: LoginMutation_login_user | null;
  /**
   * The creator that _may_ be logged in
   */
  creator: LoginMutation_login_creator | null;
}

export interface LoginMutation {
  /**
   * Login a user or a creator
   */
  login: LoginMutation_login;
}

export interface LoginMutationVariables {
  email: string;
  password: string;
}
