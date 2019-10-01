/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CollabStatus, AgeGroup, Gender } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetCampaigns
// ====================================================

export interface GetCampaigns_campaigns_items_brand {
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

export interface GetCampaigns_campaigns_items_product {
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
}

export interface GetCampaigns_campaigns_items_collabs {
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

export interface GetCampaigns_campaigns_items_targetAudience {
  __typename: "TargetAudience";
  /**
   * Groups of age
   */
  ageGroups: AgeGroup[];
  /**
   * ISO 3166-1-alpha-2 codes of countries
   */
  countries: string[];
  /**
   * Men, women or both
   */
  gender: Gender;
}

export interface GetCampaigns_campaigns_items {
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
  brand: GetCampaigns_campaigns_items_brand | null;
  /**
   * What the creator will receive
   */
  product: GetCampaigns_campaigns_items_product;
  /**
   * Rules that creators must respect to receive the gift
   */
  rules: string[];
  createdAt: any;
  /**
   * All collabs linked to the campaign
   */
  collabs: GetCampaigns_campaigns_items_collabs[];
  /**
   * Total amount of money that will be given to creators
   */
  estimatedBudget: number;
  /**
   * The ideal audience the brand wants to reach
   */
  targetAudience: GetCampaigns_campaigns_items_targetAudience;
  /**
   * Whether the brand is willing to publish the campaign
   */
  isArchived: boolean;
  /**
   * Whether an admin allowed the campaign to be published
   */
  isReviewed: boolean;
}

export interface GetCampaigns_campaigns {
  __typename: "PaginatedCampaignResponse";
  currentPage: number;
  totalPages: number;
  items: GetCampaigns_campaigns_items[];
}

export interface GetCampaigns {
  /**
   * Get page of campaigns or experiences depending on whether the session is a brand or a user
   */
  campaigns: GetCampaigns_campaigns;
}
