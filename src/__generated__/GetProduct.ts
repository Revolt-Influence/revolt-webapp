/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ProductCategory } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetProduct
// ====================================================

export interface GetProduct_campaign_brand {
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

export interface GetProduct_campaign_product {
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

export interface GetProduct_campaign {
  __typename: "Campaign";
  /**
   * Mongoose generated ID
   */
  _id: string;
  /**
   * The brand that published the campaign
   */
  brand: GetProduct_campaign_brand | null;
  /**
   * What the creator will receive
   */
  product: GetProduct_campaign_product;
  /**
   * Rules that creators must respect to receive the gift
   */
  rules: string[];
  createdAt: any;
}

export interface GetProduct {
  /**
   * Get campaign by ID
   */
  campaign: GetProduct_campaign;
}

export interface GetProductVariables {
  campaignId: string;
}
