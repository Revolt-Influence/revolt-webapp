/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { TrackingProvider, PublishingPlatform, GameCategory, Gender, AgeGroup } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetCampaign
// ====================================================

export interface GetCampaign_campaign_product {
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
   * Link to more info about the product
   */
  website: string;
  /**
   * Cloudinary URLs of promo images of the product
   */
  pictures: string[];
  /**
   * Link of a YouTube video that presents the product
   */
  youtubeLink: string | null;
  /**
   * Game categories that best describe the game
   */
  categories: GameCategory[];
  /**
   * Game lauch date, can be past or future
   */
  launchedAt: any;
}

export interface GetCampaign_campaign_brand {
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

export interface GetCampaign_campaign_targetAudience {
  __typename: "TargetAudience";
  /**
   * Men, women or both
   */
  gender: Gender;
  /**
   * ISO 3166-1-alpha-2 codes of countries
   */
  countries: string[];
  /**
   * Groups of age
   */
  ageGroups: AgeGroup[];
}

export interface GetCampaign_campaign_owner {
  __typename: "User";
  _id: string;
  /**
   * Used for login and notification and marketing emails
   */
  email: string;
}

export interface GetCampaign_campaign {
  __typename: "Campaign";
  /**
   * Mongoose generated ID
   */
  _id: string;
  /**
   * Total amount of money that will be given to creators
   */
  estimatedBudget: number | null;
  /**
   * Solution used to provide game analytics
   */
  trackingProvider: TrackingProvider;
  /**
   * Where the game can be downloaded
   */
  publishingPlatforms: PublishingPlatform[];
  /**
   * What the creator will receive
   */
  product: GetCampaign_campaign_product;
  /**
   * The brand that published the campaign
   */
  brand: GetCampaign_campaign_brand | null;
  /**
   * The ideal audience the brand wants to reach
   */
  targetAudience: GetCampaign_campaign_targetAudience;
  /**
   * Rules that creators must respect to receive the gift
   */
  rules: string[];
  /**
   * Whether the brand is willing to publish the campaign
   */
  isArchived: boolean;
  /**
   * Whether an admin allowed the campaign to be published
   */
  isReviewed: boolean;
  /**
   * The user who created the campaign
   */
  owner: GetCampaign_campaign_owner;
}

export interface GetCampaign {
  /**
   * Get campaign by ID
   */
  campaign: GetCampaign_campaign;
}

export interface GetCampaignVariables {
  campaignId: string;
}
