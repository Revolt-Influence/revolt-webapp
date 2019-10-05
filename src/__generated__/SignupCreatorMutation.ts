/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { SignupCreatorInput, SessionType, Plan, CreatorStatus } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: SignupCreatorMutation
// ====================================================

export interface SignupCreatorMutation_signupCreator_user {
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

export interface SignupCreatorMutation_signupCreator_creator_youtube {
  __typename: "Youtuber";
  /**
   * Mongoose generated ID
   */
  _id: string;
}

export interface SignupCreatorMutation_signupCreator_creator {
  __typename: "Creator";
  /**
   * Mongoose generated ID
   */
  _id: string;
  /**
   * Creator display name, can be a full name or a pseudo
   */
  name: string | null;
  /**
   * Cloudinary URL of a picture got from user upload or a social network
   */
  picture: string | null;
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
  youtube: SignupCreatorMutation_signupCreator_creator_youtube | null;
}

export interface SignupCreatorMutation_signupCreator {
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
  user: SignupCreatorMutation_signupCreator_user | null;
  /**
   * The creator that _may_ be logged in
   */
  creator: SignupCreatorMutation_signupCreator_creator | null;
}

export interface SignupCreatorMutation {
  /**
   * Signup a creator and start a session
   */
  signupCreator: SignupCreatorMutation_signupCreator;
}

export interface SignupCreatorMutationVariables {
  creator: SignupCreatorInput;
}
