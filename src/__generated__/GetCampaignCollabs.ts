/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CollabStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetCampaignCollabs
// ====================================================

export interface GetCampaignCollabs_campaign_collabs_conversation {
  __typename: "Conversation";
  /**
   * Mongoose generated ID
   */
  _id: string;
  createdAt: any;
}

export interface GetCampaignCollabs_campaign_collabs_creator_youtube {
  __typename: "Youtuber";
  viewCount: number;
  subscriberCount: number;
  videoCount: number;
}

export interface GetCampaignCollabs_campaign_collabs_creator {
  __typename: "Creator";
  /**
   * Creator display name, can be a full name or a pseudo
   */
  name: string;
  /**
   * Cloudinary URL of a picture got from user upload or a social network
   */
  picture: string;
  /**
   * Youtube account linked to the creator
   */
  youtube: GetCampaignCollabs_campaign_collabs_creator_youtube | null;
}

export interface GetCampaignCollabs_campaign_collabs {
  __typename: "Collab";
  /**
   * Mongoose generated ID
   */
  _id: string;
  /**
   * Conv where collab brand and creator can chat
   */
  conversation: GetCampaignCollabs_campaign_collabs_conversation;
  /**
   * Advancement of the collab
   */
  status: CollabStatus;
  /**
   * The creator's motivation message for the brand
   */
  message: string;
  updatedAt: any;
  /**
   * The creator working on the collab
   */
  creator: GetCampaignCollabs_campaign_collabs_creator;
}

export interface GetCampaignCollabs_campaign {
  __typename: "Campaign";
  /**
   * Mongoose generated ID
   */
  _id: string;
  /**
   * All collabs linked to the campaign
   */
  collabs: GetCampaignCollabs_campaign_collabs[];
}

export interface GetCampaignCollabs {
  /**
   * Get campaign by ID
   */
  campaign: GetCampaignCollabs_campaign;
}

export interface GetCampaignCollabsVariables {
  campaignId: string;
}
