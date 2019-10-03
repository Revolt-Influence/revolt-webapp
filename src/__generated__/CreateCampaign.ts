/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CollabStatus } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateCampaign
// ====================================================

export interface CreateCampaign_createCampaign_brand {
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

export interface CreateCampaign_createCampaign_product {
  __typename: "CampaignProduct";
  /**
   * Name of the product
   */
  name: string;
  /**
   * Paragraph of info about the product
   */
  description: string;
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

export interface CreateCampaign_createCampaign_collabs {
  __typename: "Collab";
  /**
   * Mongoose generated ID
   */
  _id: string;
  /**
   * Advancement of the collab
   */
  status: CollabStatus;
}

export interface CreateCampaign_createCampaign {
  __typename: "Campaign";
  /**
   * Mongoose generated ID
   */
  _id: string;
  /**
   * The campaign name that is promoted to the creators
   */
  name: string;
  /**
   * More info about the campaign and its goals
   */
  description: string;
  /**
   * The brand that published the campaign
   */
  brand: CreateCampaign_createCampaign_brand | null;
  /**
   * What the creator will receive
   */
  product: CreateCampaign_createCampaign_product;
  /**
   * Rules that creators must respect to receive the gift
   */
  rules: string[];
  createdAt: any;
  /**
   * All collabs linked to the campaign
   */
  collabs: CreateCampaign_createCampaign_collabs[];
}

export interface CreateCampaign {
  /**
   * Create blank campaign
   */
  createCampaign: CreateCampaign_createCampaign;
}
