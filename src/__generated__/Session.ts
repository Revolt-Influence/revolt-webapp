/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { SessionType, Plan } from "./globalTypes";

// ====================================================
// GraphQL query operation: Session
// ====================================================

export interface Session_session_user {
  __typename: "User";
  _id: string;
  /**
   * Whether the user has paid
   */
  plan: Plan;
}

export interface Session_session_creator_youtube {
  __typename: "Youtuber";
  /**
   * Mongoose generated ID
   */
  _id: string;
}

export interface Session_session_creator {
  __typename: "Creator";
  /**
   * Mongoose generated ID
   */
  _id: string;
  /**
   * Youtube account linked to the creator
   */
  youtube: Session_session_creator_youtube | null;
}

export interface Session_session {
  __typename: "Session";
  /**
   * Whether a session was found
   */
  isLoggedIn: boolean;
  /**
   * UUID used to uniquely identify the session from the GQL client
   */
  sessionId: string;
  sessionType: SessionType | null;
  /**
   * The user that _may_ be logged in
   */
  user: Session_session_user | null;
  /**
   * The creator that _may_ be logged in
   */
  creator: Session_session_creator | null;
}

export interface Session {
  /**
   * Check if a session exists, could be a creator or a brand user
   */
  session: Session_session;
}
