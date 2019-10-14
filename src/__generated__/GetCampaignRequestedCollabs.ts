/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CollabStatus, Language } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetCampaignRequestedCollabs
// ====================================================

export interface GetCampaignRequestedCollabs_campaign_collabs_conversation {
  __typename: "Conversation";
  /**
   * Mongoose generated ID
   */
  _id: string;
}

export interface GetCampaignRequestedCollabs_campaign_collabs_creator_youtube_videos {
  __typename: "YoutubeVideo";
  title: string;
  /**
   * Unique Youtube ID (not Mongoose-related)
   */
  videoId: string;
}

export interface GetCampaignRequestedCollabs_campaign_collabs_creator_youtube_audience_ageGroups {
  __typename: "AudienceMetric";
  name: string;
  /**
   * Between 0 and 100
   */
  percentage: number;
}

export interface GetCampaignRequestedCollabs_campaign_collabs_creator_youtube_audience_countries {
  __typename: "AudienceMetric";
  name: string;
  /**
   * Between 0 and 100
   */
  percentage: number;
}

export interface GetCampaignRequestedCollabs_campaign_collabs_creator_youtube_audience {
  __typename: "YoutubeAudience";
  ageGroups: GetCampaignRequestedCollabs_campaign_collabs_creator_youtube_audience_ageGroups[];
  /**
   * ISO 3166-1-alpha-2 codes of countries and their percentage
   */
  countries: GetCampaignRequestedCollabs_campaign_collabs_creator_youtube_audience_countries[];
  /**
   * Percentage of male subscribers, between 0 and 100
   */
  malePercentage: number;
  /**
   * Percentage of female subscribers, between 0 and 100
   */
  femalePercentage: number;
}

export interface GetCampaignRequestedCollabs_campaign_collabs_creator_youtube {
  __typename: "Youtuber";
  /**
   * Mongoose generated ID
   */
  _id: string;
  /**
   * Channel title
   */
  name: string;
  /**
   * URL of image on Youtube CDN, not Cloudinary
   */
  picture: string;
  videoCount: number;
  subscriberCount: number;
  videos: GetCampaignRequestedCollabs_campaign_collabs_creator_youtube_videos[];
  audience: GetCampaignRequestedCollabs_campaign_collabs_creator_youtube_audience;
}

export interface GetCampaignRequestedCollabs_campaign_collabs_creator {
  __typename: "Creator";
  /**
   * Mongoose generated ID
   */
  _id: string;
  /**
   * Creator display name, can be a full name or a pseudo
   */
  name: string | null;
  /**
   * Cloudinary URL of a picture got from user upload or a social network
   */
  picture: string | null;
  /**
   * Year of birth, used to get age approximation and ensure he is 13+
   */
  birthYear: number;
  /**
   * What language creator's content is in
   */
  language: Language;
  /**
   * Youtube account linked to the creator
   */
  youtube: GetCampaignRequestedCollabs_campaign_collabs_creator_youtube | null;
}

export interface GetCampaignRequestedCollabs_campaign_collabs {
  __typename: "Collab";
  /**
   * Mongoose generated ID
   */
  _id: string;
  /**
   * Advancement of the collab
   */
  status: CollabStatus;
  createdAt: any;
  /**
   * The creator's motivation message for the brand
   */
  message: string;
  /**
   * Conv where collab brand and creator can chat
   */
  conversation: GetCampaignRequestedCollabs_campaign_collabs_conversation;
  /**
   * The creator working on the collab
   */
  creator: GetCampaignRequestedCollabs_campaign_collabs_creator;
}

export interface GetCampaignRequestedCollabs_campaign {
  __typename: "Campaign";
  /**
   * Mongoose generated ID
   */
  _id: string;
  /**
   * All collabs linked to the campaign
   */
  collabs: GetCampaignRequestedCollabs_campaign_collabs[];
}

export interface GetCampaignRequestedCollabs {
  /**
   * Get campaign by ID
   */
  campaign: GetCampaignRequestedCollabs_campaign;
}

export interface GetCampaignRequestedCollabsVariables {
  campaignId: string;
}
