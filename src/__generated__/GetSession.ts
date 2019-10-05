/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { SessionType, Plan, CreatorStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetSession
// ====================================================

export interface GetSession_session_user {
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

export interface GetSession_session_creator_youtube {
  __typename: "Youtuber";
  /**
   * Mongoose generated ID
   */
  _id: string;
}

export interface GetSession_session_creator {
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
  youtube: GetSession_session_creator_youtube | null;
}

export interface GetSession_session {
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
  user: GetSession_session_user | null;
  /**
   * The creator that _may_ be logged in
   */
  creator: GetSession_session_creator | null;
}

export interface GetSession {
  /**
   * Check if a session exists, could be a creator or a brand user
   */
  session: GetSession_session;
}
