/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CreatorStatus, GameCategory, CollabStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetCreatorCampaignPage
// ====================================================

export interface GetCreatorCampaignPage_session_creator {
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

export interface GetCreatorCampaignPage_session {
  __typename: "Session";
  /**
   * The creator that _may_ be logged in
   */
  creator: GetCreatorCampaignPage_session_creator | null;
}

export interface GetCreatorCampaignPage_campaign_brand {
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

export interface GetCreatorCampaignPage_campaign_product {
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

export interface GetCreatorCampaignPage_campaign {
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
  brand: GetCreatorCampaignPage_campaign_brand | null;
  /**
   * What the creator will receive
   */
  product: GetCreatorCampaignPage_campaign_product;
  /**
   * Rules that creators must respect to receive the gift
   */
  rules: string[];
  createdAt: any;
}

export interface GetCreatorCampaignPage_collabs_campaign {
  __typename: "Campaign";
  /**
   * Mongoose generated ID
   */
  _id: string;
}

export interface GetCreatorCampaignPage_collabs {
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
   * The campaign the collab is a part of
   */
  campaign: GetCreatorCampaignPage_collabs_campaign;
}

export interface GetCreatorCampaignPage {
  /**
   * Check if a session exists, could be a creator or a brand user
   */
  session: GetCreatorCampaignPage_session;
  /**
   * Get campaign by ID
   */
  campaign: GetCreatorCampaignPage_campaign;
  /**
   * Get list of creator collabs
   */
  collabs: GetCreatorCampaignPage_collabs[];
}

export interface GetCreatorCampaignPageVariables {
  campaignId: string;
}
