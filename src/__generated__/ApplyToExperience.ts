/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CollabStatus, GameCategory } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: ApplyToExperience
// ====================================================

export interface ApplyToExperience_applyToExperience_campaign_brand {
  __typename: "Brand";
  /**
   * Mongoose generated ID
   */
  _id: string;
  name: string;
  /**
   * Cloudinary URL of brand logo
   */
  logo: string;
  /**
   * URL of the brand's website
   */
  website: string;
}

export interface ApplyToExperience_applyToExperience_campaign_product {
  __typename: "CampaignProduct";
  /**
   * Name of the product
   */
  name: string;
  /**
   * Marketing description of the game
   */
  pitch: string;
  /**
   * Game categories that best describe the game
   */
  categories: GameCategory[];
  /**
   * Link to more info about the product
   */
  website: string;
  /**
   * Link of a YouTube video that presents the product
   */
  youtubeLink: string | null;
  /**
   * Cloudinary URLs of promo images of the product
   */
  pictures: string[];
  /**
   * Game lauch date, can be past or future
   */
  launchedAt: any;
}

export interface ApplyToExperience_applyToExperience_campaign {
  __typename: "Campaign";
  /**
   * Mongoose generated ID
   */
  _id: string;
  /**
   * More info about the campaign and its goals
   */
  goal: string;
  /**
   * The brand that published the campaign
   */
  brand: ApplyToExperience_applyToExperience_campaign_brand | null;
  /**
   * What the creator will receive
   */
  product: ApplyToExperience_applyToExperience_campaign_product;
  /**
   * Rules that creators must respect to receive the gift
   */
  rules: string[];
  createdAt: any;
}

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
  updatedAt: any;
  /**
   * The campaign the collab is a part of
   */
  campaign: ApplyToExperience_applyToExperience_campaign;
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
