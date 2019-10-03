/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { SignupUserInput, SessionType, Plan, CreatorStatus } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: SignupUserMutation
// ====================================================

export interface SignupUserMutation_signupUser_user {
  __typename: "User";
  _id: string;
  /**
   * Used for login and notification and marketing emails
   */
  email: string;
  /**
   * Whether the user has paid
   */
  plan: Plan;
  /**
   * Whether he works for Revolt
   */
  isAdmin: boolean;
}

export interface SignupUserMutation_signupUser_creator_youtube {
  __typename: "Youtuber";
  /**
   * Mongoose generated ID
   */
  _id: string;
}

export interface SignupUserMutation_signupUser_creator {
  __typename: "Creator";
  /**
   * Mongoose generated ID
   */
  _id: string;
  /**
   * Creator-defined named, can be a full name or a pseudo
   */
  name: string;
  /**
   * Cloudinary URL of a picture got from user upload or a social network
   */
  picture: string;
  /**
   * The email is used for login and notifications
   */
  email: string;
  /**
   * Whether the influencer was validated by an admin
   */
  status: CreatorStatus;
  /**
   * Youtube account linked to the creator
   */
  youtube: SignupUserMutation_signupUser_creator_youtube | null;
}

export interface SignupUserMutation_signupUser {
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
  user: SignupUserMutation_signupUser_user | null;
  /**
   * The creator that _may_ be logged in
   */
  creator: SignupUserMutation_signupUser_creator | null;
}

export interface SignupUserMutation {
  /**
   * Signup a brand user and start a session
   */
  signupUser: SignupUserMutation_signupUser;
}

export interface SignupUserMutationVariables {
  user: SignupUserInput;
}
