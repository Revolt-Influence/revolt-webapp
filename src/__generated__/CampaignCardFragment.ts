/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { GameCategory, CollabStatus, TrackingProvider, PublishingPlatform, AgeGroup, Gender } from "./globalTypes";

// ====================================================
// GraphQL fragment: CampaignCardFragment
// ====================================================

export interface CampaignCardFragment_brand {
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

export interface CampaignCardFragment_product {
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

export interface CampaignCardFragment_collabs {
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

export interface CampaignCardFragment_targetAudience {
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

export interface CampaignCardFragment_owner {
  __typename: "User";
  _id: string;
  /**
   * Used for login and notification and marketing emails
   */
  email: string;
}

export interface CampaignCardFragment {
  __typename: "Campaign";
  /**
   * Mongoose generated ID
   */
  _id: string;
  /**
   * The brand that published the campaign
   */
  brand: CampaignCardFragment_brand | null;
  /**
   * What the creator will receive
   */
  product: CampaignCardFragment_product;
  /**
   * Rules that creators must respect to receive the gift
   */
  rules: string[];
  createdAt: any;
  /**
   * All collabs linked to the campaign
   */
  collabs: CampaignCardFragment_collabs[];
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
   * The ideal audience the brand wants to reach
   */
  targetAudience: CampaignCardFragment_targetAudience;
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
  owner: CampaignCardFragment_owner;
}
