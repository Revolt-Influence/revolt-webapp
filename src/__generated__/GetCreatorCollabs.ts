/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CollabStatus, GameCategory } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetCreatorCollabs
// ====================================================

export interface GetCreatorCollabs_collabs_campaign_brand {
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

export interface GetCreatorCollabs_collabs_campaign_product {
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

export interface GetCreatorCollabs_collabs_campaign {
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
  brand: GetCreatorCollabs_collabs_campaign_brand | null;
  /**
   * What the creator will receive
   */
  product: GetCreatorCollabs_collabs_campaign_product;
  /**
   * Rules that creators must respect to receive the gift
   */
  rules: string[];
  createdAt: any;
}

export interface GetCreatorCollabs_collabs {
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
  campaign: GetCreatorCollabs_collabs_campaign;
}

export interface GetCreatorCollabs {
  /**
   * Get list of creator collabs
   */
  collabs: GetCreatorCollabs_collabs[];
}
