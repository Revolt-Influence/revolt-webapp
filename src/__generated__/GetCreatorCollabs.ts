/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CollabStatus, ProductCategory } from "./globalTypes";

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
   * Categories that best describe the product
   */
  categories: ProductCategory[];
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
   * Game lauch date, defined only if future
   */
  launchedAt: any | null;
}

export interface GetCreatorCollabs_collabs_campaign {
  __typename: "Campaign";
  /**
   * Mongoose generated ID
   */
  _id: string;
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
  /**
   * How much the influencer wants to be paid in USD
   */
  quote: number;
  updatedAt: any;
  /**
   * Bitly link to track the campaign performance
   */
  trackedLink: string;
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
