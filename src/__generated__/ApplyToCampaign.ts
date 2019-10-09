/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CollabStatus, GameCategory } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: ApplyToCampaign
// ====================================================

export interface ApplyToCampaign_applyToCampaign_campaign_brand {
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
}

export interface ApplyToCampaign_applyToCampaign_campaign_product {
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

export interface ApplyToCampaign_applyToCampaign_campaign {
  __typename: "Campaign";
  /**
   * Mongoose generated ID
   */
  _id: string;
  /**
   * The brand that published the campaign
   */
  brand: ApplyToCampaign_applyToCampaign_campaign_brand | null;
  /**
   * What the creator will receive
   */
  product: ApplyToCampaign_applyToCampaign_campaign_product;
  /**
   * Rules that creators must respect to receive the gift
   */
  rules: string[];
  createdAt: any;
}

export interface ApplyToCampaign_applyToCampaign {
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
  campaign: ApplyToCampaign_applyToCampaign_campaign;
}

export interface ApplyToCampaign {
  /**
   * Creates a collab request
   */
  applyToCampaign: ApplyToCampaign_applyToCampaign;
}

export interface ApplyToCampaignVariables {
  message: string;
  campaignId: string;
}
