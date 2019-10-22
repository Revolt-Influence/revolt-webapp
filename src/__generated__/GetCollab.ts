/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CollabStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetCollab
// ====================================================

export interface GetCollab_collab_creator_youtube {
  __typename: "Youtuber";
  /**
   * Mongoose generated ID
   */
  _id: string;
  estimatedCpm: number;
  medianViews: number;
}

export interface GetCollab_collab_creator {
  __typename: "Creator";
  /**
   * Mongoose generated ID
   */
  _id: string;
  /**
   * Youtube account linked to the creator
   */
  youtube: GetCollab_collab_creator_youtube | null;
}

export interface GetCollab_collab_conversation {
  __typename: "Conversation";
  /**
   * Mongoose generated ID
   */
  _id: string;
}

export interface GetCollab_collab {
  __typename: "Collab";
  /**
   * Mongoose generated ID
   */
  _id: string;
  /**
   * Advancement of the collab
   */
  status: CollabStatus;
  /**
   * The creator's motivation message for the brand
   */
  message: string;
  updatedAt: any;
  /**
   * How much the influencer wants to be paid in USD
   */
  quote: number;
  /**
   * The creator working on the collab
   */
  creator: GetCollab_collab_creator;
  /**
   * Conv where collab brand and creator can chat
   */
  conversation: GetCollab_collab_conversation;
}

export interface GetCollab {
  /**
   * Get collab by ID
   */
  collab: GetCollab_collab;
}

export interface GetCollabVariables {
  collabId: string;
}
