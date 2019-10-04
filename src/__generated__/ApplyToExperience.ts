/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CollabStatus } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: ApplyToExperience
// ====================================================

export interface ApplyToExperience_applyToExperience {
  __typename: "Collab";
  /**
   * Mongoose generated ID
   */
  _id: string;
  /**
   * Advancement of the collab
   */
  status: CollabStatus;
}

export interface ApplyToExperience {
  /**
   * Creates a collab
   */
  applyToExperience: ApplyToExperience_applyToExperience;
}

export interface ApplyToExperienceVariables {
  message: string;
  experienceId: string;
}
