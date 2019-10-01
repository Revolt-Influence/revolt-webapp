/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * The advancement of the campaign
 */
export enum CollabStatus {
  ACCEPTED = "ACCEPTED",
  APPLIED = "APPLIED",
  DENIED = "DENIED",
  DONE = "DONE",
  SENT = "SENT",
}

/**
 * Whether a creator was allowed to access the platform
 */
export enum CreatorStatus {
  BLOCKED = "BLOCKED",
  UNVERIFIED = "UNVERIFIED",
  VERIFIED = "VERIFIED",
}

/**
 * Whether the user has paid or not
 */
export enum Plan {
  FREE = "FREE",
  PREMIUM = "PREMIUM",
}

/**
 * Whether a brand accepts a collab
 */
export enum ReviewCollabDecision {
  ACCEPT = "ACCEPT",
  DENY = "DENY",
  MARK_AS_SENT = "MARK_AS_SENT",
}

/**
 * What platform the creator will use to promote the game
 */
export enum ReviewFormat {
  YOUTUBE_VIDEO = "YOUTUBE_VIDEO",
}

/**
 * Whether the logged in user is a creator
 */
export enum SessionType {
  BRAND = "BRAND",
  CREATOR = "CREATOR",
}

export interface SubmitCollabReviewInput {
  link: string;
  format: ReviewFormat;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
