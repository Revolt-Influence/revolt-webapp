/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CollabStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: Collab
// ====================================================

export interface Collab_collab_conversation {
  __typename: "Conversation";
  /**
   * Mongoose generated ID
   */
  _id: string;
}

export interface Collab_collab {
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
   * Conv where collab brand and creator can chat
   */
  conversation: Collab_collab_conversation;
}

export interface Collab {
  /**
   * Get collab by ID
   */
  collab: Collab_collab;
}

export interface CollabVariables {
  collabId: string;
}
