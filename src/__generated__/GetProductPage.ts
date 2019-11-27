/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CreatorStatus, ProductCategory, CollabStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetProductPage
// ====================================================

export interface GetProductPage_session_creator {
  __typename: "Creator";
  /**
   * Mongoose generated ID
   */
  _id: string;
  /**
   * Whether the influencer was validated by an admin
   */
  status: CreatorStatus;
}

export interface GetProductPage_session {
  __typename: "Session";
  /**
   * The creator that _may_ be logged in
   */
  creator: GetProductPage_session_creator | null;
}

export interface GetProductPage_campaign_brand {
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

export interface GetProductPage_campaign_product {
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

export interface GetProductPage_campaign {
  __typename: "Campaign";
  /**
   * Mongoose generated ID
   */
  _id: string;
  /**
   * The brand that published the campaign
   */
  brand: GetProductPage_campaign_brand | null;
  /**
   * What the creator will receive
   */
  product: GetProductPage_campaign_product;
  /**
   * Rules that creators must respect to receive the gift
   */
  rules: string[];
  createdAt: any;
}

export interface GetProductPage_collabs_campaign {
  __typename: "Campaign";
  /**
   * Mongoose generated ID
   */
  _id: string;
}

export interface GetProductPage_collabs {
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
  /**
   * The campaign the collab is a part of
   */
  campaign: GetProductPage_collabs_campaign;
}

export interface GetProductPage {
  /**
   * Check if a session exists, could be a creator or a brand user
   */
  session: GetProductPage_session;
  /**
   * Get campaign by ID
   */
  campaign: GetProductPage_campaign;
  /**
   * Get list of creator collabs
   */
  collabs: GetProductPage_collabs[];
}

export interface GetProductPageVariables {
  campaignId: string;
}
