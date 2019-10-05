/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateCreatorProfile
// ====================================================

export interface UpdateCreatorProfile_updateCreatorProfile {
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
}

export interface UpdateCreatorProfile {
  /**
   * Set new creator username and/or profile picture
   */
  updateCreatorProfile: UpdateCreatorProfile_updateCreatorProfile;
}

export interface UpdateCreatorProfileVariables {
  name: string;
  picture: string;
}
