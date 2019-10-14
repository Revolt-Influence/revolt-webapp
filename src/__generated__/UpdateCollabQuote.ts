/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CollabStatus } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateCollabQuote
// ====================================================

export interface UpdateCollabQuote_updateCollabQuote {
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
   * How much the influencer wants to be paid in USD
   */
  quote: number;
}

export interface UpdateCollabQuote {
  /**
   * Update collab quote after negotiation
   */
  updateCollabQuote: UpdateCollabQuote_updateCollabQuote;
}

export interface UpdateCollabQuoteVariables {
  collabId: string;
  newQuote: number;
}
