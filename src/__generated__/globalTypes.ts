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
  ANY = "ANY",
}

/**
 * The advancement of the campaign
 */
export enum CollabStatus {
  ACCEPTED = "ACCEPTED",
  DENIED = "DENIED",
  DONE = "DONE",
  REQUEST = "REQUEST",
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
 * Family of games
 */
export enum GameCategory {
  ACTION = "ACTION",
  ADVENTURE = "ADVENTURE",
  ARCADE = "ARCADE",
  AR_VR = "AR_VR",
  HORROR = "HORROR",
  INDIE = "INDIE",
  MMO = "MMO",
  PARTY_GAME = "PARTY_GAME",
  PLATFORMER = "PLATFORMER",
  PUZZLE = "PUZZLE",
  RETRO = "RETRO",
  ROGUELIKE = "ROGUELIKE",
  RPG = "RPG",
  SHOOTER = "SHOOTER",
  SIMULATION = "SIMULATION",
  SPORTS = "SPORTS",
  STRATEGY = "STRATEGY",
  SURVIVAL = "SURVIVAL",
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
 * Spoken language or dialect
 */
export enum Language {
  ARABIC = "ARABIC",
  ENGLISH = "ENGLISH",
  FRENCH = "FRENCH",
  GERMAN = "GERMAN",
  HINDI = "HINDI",
  INDONESIAN = "INDONESIAN",
  ITALIAN = "ITALIAN",
  JAPANESE = "JAPANESE",
  MANDARIN = "MANDARIN",
  NORWEGIAN = "NORWEGIAN",
  OTHER = "OTHER",
  PORTUGUESE = "PORTUGUESE",
  RUSSIAN = "RUSSIAN",
  SPANISH = "SPANISH",
  SWEDISH = "SWEDISH",
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

/**
 * Platforms that provide analytics for game
 */
export enum TrackingProvider {
  ADJUST = "ADJUST",
  APPSFLYER = "APPSFLYER",
  BUFFPANEL = "BUFFPANEL",
  CUSTOM_LINK = "CUSTOM_LINK",
  GAME_ANALYTICS = "GAME_ANALYTICS",
  GOOGLE_ANALYTICS = "GOOGLE_ANALYTICS",
  KOCHAVA = "KOCHAVA",
  NONE = "NONE",
  OTHER = "OTHER",
  SINGULAR = "SINGULAR",
  TENJIN = "TENJIN",
  TUNE = "TUNE",
  UNITY_ANALYTICS = "UNITY_ANALYTICS",
}

export interface CampaignAudienceInput {
  gender: Gender;
  countries: string[];
  ageGroups: AgeGroup[];
}

export interface CampaignBriefInput {
  goal: string;
  rules: string[];
  estimatedBudget?: number | null;
  trackingProvider: TrackingProvider;
}

export interface CampaignProductInput {
  name: string;
  pitch: string;
  website: string;
  pictures: string[];
  launchedAt: any;
  categories: GameCategory[];
  youtubeLink?: string | null;
}

export interface SignupCreatorInput {
  email: string;
  password: string;
  birthYear: number;
  language: Language;
  categories: GameCategory[];
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
