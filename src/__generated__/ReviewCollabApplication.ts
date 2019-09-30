/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ReviewCollabDecision, CollabStatus } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: ReviewCollabApplication
// ====================================================

export interface ReviewCollabApplication_reviewCollabApplication {
  __typename: "Collab";
  updatedAt: any;
  /**
   * Advancement of the collab
   */
  status: CollabStatus;
}

export interface ReviewCollabApplication {
  /**
   * Brand user accepts or denies a collab application
   */
  reviewCollabApplication: ReviewCollabApplication_reviewCollabApplication;
}

export interface ReviewCollabApplicationVariables {
  decision: ReviewCollabDecision;
  collabId: string;
}
