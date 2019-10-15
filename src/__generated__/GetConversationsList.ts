/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CollabStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetConversationsList
// ====================================================

export interface GetConversationsList_conversations_items_messages_brandAuthor {
  __typename: "Brand";
  /**
   * Mongoose generated ID
   */
  _id: string;
}

export interface GetConversationsList_conversations_items_messages_creatorAuthor {
  __typename: "Creator";
  /**
   * Mongoose generated ID
   */
  _id: string;
}

export interface GetConversationsList_conversations_items_messages_conversation {
  __typename: "Conversation";
  /**
   * Mongoose generated ID
   */
  _id: string;
}

export interface GetConversationsList_conversations_items_messages {
  __typename: "Message";
  /**
   * Mongoose generated ID
   */
  _id: string;
  /**
   * The content of the message
   */
  text: string;
  /**
   * Potential brand author
   */
  brandAuthor: GetConversationsList_conversations_items_messages_brandAuthor | null;
  /**
   * Potential creator author
   */
  creatorAuthor: GetConversationsList_conversations_items_messages_creatorAuthor | null;
  /**
   * Whether the message was sent by an admin or is a notification
   */
  isAdminAuthor: boolean;
  createdAt: any;
  /**
   * The conversation the message is a part of
   */
  conversation: GetConversationsList_conversations_items_messages_conversation;
}

export interface GetConversationsList_conversations_items_creator {
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
}

export interface GetConversationsList_conversations_items_brand {
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

export interface GetConversationsList_conversations_items_collabs_campaign {
  __typename: "Campaign";
  /**
   * Mongoose generated ID
   */
  _id: string;
}

export interface GetConversationsList_conversations_items_collabs {
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
   * How much the influencer wants to be paid in USD
   */
  quote: number;
  /**
   * The campaign the collab is a part of
   */
  campaign: GetConversationsList_conversations_items_collabs_campaign;
}

export interface GetConversationsList_conversations_items {
  __typename: "Conversation";
  /**
   * Mongoose generated ID
   */
  _id: string;
  createdAt: any;
  /**
   * Conversation messages from old to new
   */
  messages: GetConversationsList_conversations_items_messages[];
  /**
   * Creator that talks to a brand
   */
  creator: GetConversationsList_conversations_items_creator;
  /**
   * Brand that talks to a creator
   */
  brand: GetConversationsList_conversations_items_brand;
  collabs: GetConversationsList_conversations_items_collabs[];
}

export interface GetConversationsList_conversations {
  __typename: "PaginatedConversationResponse";
  totalPages: number;
  currentPage: number;
  items: GetConversationsList_conversations_items[];
}

export interface GetConversationsList {
  /**
   * Get conversations page
   */
  conversations: GetConversationsList_conversations;
}

export interface GetConversationsListVariables {
  page?: number | null;
}
