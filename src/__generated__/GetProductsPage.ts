/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ProductCategory } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetProductsPage
// ====================================================

export interface GetProductsPage_campaigns_items_brand {
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

export interface GetProductsPage_campaigns_items_product {
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

export interface GetProductsPage_campaigns_items {
  __typename: "Campaign";
  /**
   * Mongoose generated ID
   */
  _id: string;
  /**
   * The brand that published the campaign
   */
  brand: GetProductsPage_campaigns_items_brand | null;
  /**
   * What the creator will receive
   */
  product: GetProductsPage_campaigns_items_product;
  /**
   * Rules that creators must respect to receive the gift
   */
  rules: string[];
  createdAt: any;
}

export interface GetProductsPage_campaigns {
  __typename: "PaginatedCampaignResponse";
  currentPage: number;
  totalPages: number;
  items: GetProductsPage_campaigns_items[];
}

export interface GetProductsPage {
  /**
   * Get page of campaigns, different if brand or a user
   */
  campaigns: GetProductsPage_campaigns;
}

export interface GetProductsPageVariables {
  page?: number | null;
}
