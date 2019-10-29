/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { SubmitCollabReviewInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: SubmitCollabReview
// ====================================================

export interface SubmitCollabReview_submitCollabReview_review {
  __typename: "Review";
  /**
   * Mongoose generated ID
   */
  _id: string;
}

export interface SubmitCollabReview_submitCollabReview {
  __typename: "Collab";
  /**
   * Mongoose generated ID
   */
  _id: string;
  /**
   * Social media post made for the campaign
   */
  review: SubmitCollabReview_submitCollabReview_review | null;
}

export interface SubmitCollabReview {
  /**
   * End a collab by submitting the sponsored content
   */
  submitCollabReview: SubmitCollabReview_submitCollabReview;
}

export interface SubmitCollabReviewVariables {
  review: SubmitCollabReviewInput;
  collabId: string;
}
