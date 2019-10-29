/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CollabStatus, GameCategory } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetCreatorCollab
// ====================================================

export interface GetCreatorCollab_collab_campaign_brand {
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

export interface GetCreatorCollab_collab_campaign_product {
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
   * Game lauch date, defined only if future
   */
  launchedAt: any | null;
}

export interface GetCreatorCollab_collab_campaign {
  __typename: "Campaign";
  /**
   * Mongoose generated ID
   */
  _id: string;
  /**
   * The brand that published the campaign
   */
  brand: GetCreatorCollab_collab_campaign_brand | null;
  /**
   * What the creator will receive
   */
  product: GetCreatorCollab_collab_campaign_product;
  /**
   * Rules that creators must respect to receive the gift
   */
  rules: string[];
  createdAt: any;
}

export interface GetCreatorCollab_collab {
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
  campaign: GetCreatorCollab_collab_campaign;
}

export interface GetCreatorCollab {
  /**
   * Get collab by ID
   */
  collab: GetCreatorCollab_collab;
}

export interface GetCreatorCollabVariables {
  collabId: string;
}
