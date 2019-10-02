/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * Age groups based formatted to match YouTube API data
 */
export enum AgeGroup {
  AGE_13_17 = "AGE_13_17",
  AGE_18_24 = "AGE_18_24",
  AGE_25_34 = "AGE_25_34",
  AGE_35_44 = "AGE_35_44",
  AGE_45_54 = "AGE_45_54",
  AGE_55_64 = "AGE_55_64",
  AGE_65_PLUS = "AGE_65_PLUS",
}

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
 * Male female or don't care
 */
export enum Gender {
  ANY = "ANY",
  FEMALE = "FEMALE",
  MALE = "MALE",
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

export interface SignupCreatorInput {
  email: string;
  password: string;
  birthYear: number;
  country: string;
  language: string;
  ambassador?: string | null;
}

export interface SignupUserInput {
  email: string;
  password: string;
  company: string;
  ambassador?: string | null;
}

export interface SubmitCollabReviewInput {
  link: string;
  format: ReviewFormat;
}

export interface UpdateBrandInput {
  logo: string;
  name: string;
  website: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
