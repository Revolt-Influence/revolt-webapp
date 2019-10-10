/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { GameCategory } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetCreatorCampaignsPage
// ====================================================

export interface GetCreatorCampaignsPage_campaigns_items_brand {
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

export interface GetCreatorCampaignsPage_campaigns_items_product {
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

export interface GetCreatorCampaignsPage_campaigns_items {
  __typename: "Campaign";
  /**
   * Mongoose generated ID
   */
  _id: string;
  /**
   * The brand that published the campaign
   */
  brand: GetCreatorCampaignsPage_campaigns_items_brand | null;
  /**
   * What the creator will receive
   */
  product: GetCreatorCampaignsPage_campaigns_items_product;
  /**
   * Rules that creators must respect to receive the gift
   */
  rules: string[];
  createdAt: any;
}

export interface GetCreatorCampaignsPage_campaigns {
  __typename: "PaginatedCampaignResponse";
  currentPage: number;
  totalPages: number;
  items: GetCreatorCampaignsPage_campaigns_items[];
}

export interface GetCreatorCampaignsPage {
  /**
   * Get page of campaigns, different if brand or a user
   */
  campaigns: GetCreatorCampaignsPage_campaigns;
}

export interface GetCreatorCampaignsPageVariables {
  page?: number | null;
}
