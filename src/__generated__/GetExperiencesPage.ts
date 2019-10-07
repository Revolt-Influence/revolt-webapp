/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { GameCategory } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetExperiencesPage
// ====================================================

export interface GetExperiencesPage_campaigns_items_brand {
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

export interface GetExperiencesPage_campaigns_items_product {
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

export interface GetExperiencesPage_campaigns_items {
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
  brand: GetExperiencesPage_campaigns_items_brand | null;
  /**
   * What the creator will receive
   */
  product: GetExperiencesPage_campaigns_items_product;
  /**
   * Rules that creators must respect to receive the gift
   */
  rules: string[];
  createdAt: any;
}

export interface GetExperiencesPage_campaigns {
  __typename: "PaginatedCampaignResponse";
  currentPage: number;
  totalPages: number;
  items: GetExperiencesPage_campaigns_items[];
}

export interface GetExperiencesPage {
  /**
   * Get page of campaigns or experiences depending on whether the session is a brand or a user
   */
  campaigns: GetExperiencesPage_campaigns;
}

export interface GetExperiencesPageVariables {
  page?: number | null;
}
