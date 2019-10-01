/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CreatorStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetCreatorStatusAndExperience
// ====================================================

export interface GetCreatorStatusAndExperience_session_creator {
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

export interface GetCreatorStatusAndExperience_session {
  __typename: "Session";
  /**
   * The creator that _may_ be logged in
   */
  creator: GetCreatorStatusAndExperience_session_creator | null;
}

export interface GetCreatorStatusAndExperience_campaign_brand {
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

export interface GetCreatorStatusAndExperience_campaign_product {
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

export interface GetCreatorStatusAndExperience_campaign {
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
  brand: GetCreatorStatusAndExperience_campaign_brand | null;
  /**
   * What the creator will receive
   */
  product: GetCreatorStatusAndExperience_campaign_product;
  /**
   * Rules that creators must respect to receive the gift
   */
  rules: string[];
  createdAt: any;
}

export interface GetCreatorStatusAndExperience {
  /**
   * Check if a session exists, could be a creator or a brand user
   */
  session: GetCreatorStatusAndExperience_session;
  /**
   * Get campaign by ID
   */
  campaign: GetCreatorStatusAndExperience_campaign;
}

export interface GetCreatorStatusAndExperienceVariables {
  campaignId: string;
}
