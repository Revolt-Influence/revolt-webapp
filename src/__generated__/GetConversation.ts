/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CollabStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetConversation
// ====================================================

export interface GetConversation_conversation_messages_brandAuthor {
  __typename: "Brand";
  /**
   * Mongoose generated ID
   */
  _id: string;
}

export interface GetConversation_conversation_messages_creatorAuthor {
  __typename: "Creator";
  /**
   * Mongoose generated ID
   */
  _id: string;
}

export interface GetConversation_conversation_messages_conversation {
  __typename: "Conversation";
  /**
   * Mongoose generated ID
   */
  _id: string;
}

export interface GetConversation_conversation_messages {
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
  brandAuthor: GetConversation_conversation_messages_brandAuthor | null;
  /**
   * Potential creator author
   */
  creatorAuthor: GetConversation_conversation_messages_creatorAuthor | null;
  /**
   * Whether the message was sent by an admin or is a notification
   */
  isAdminAuthor: boolean;
  createdAt: any;
  /**
   * The conversation the message is a part of
   */
  conversation: GetConversation_conversation_messages_conversation;
}

export interface GetConversation_conversation_creator {
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

export interface GetConversation_conversation_brand {
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

export interface GetConversation_conversation_collabs_campaign {
  __typename: "Campaign";
  /**
   * Mongoose generated ID
   */
  _id: string;
}

export interface GetConversation_conversation_collabs {
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
  campaign: GetConversation_conversation_collabs_campaign;
}

export interface GetConversation_conversation {
  __typename: "Conversation";
  /**
   * Mongoose generated ID
   */
  _id: string;
  createdAt: any;
  /**
   * Conversation messages from old to new
   */
  messages: GetConversation_conversation_messages[];
  /**
   * Creator that talks to a brand
   */
  creator: GetConversation_conversation_creator;
  /**
   * Brand that talks to a creator
   */
  brand: GetConversation_conversation_brand;
  collabs: GetConversation_conversation_collabs[];
}

export interface GetConversation {
  /**
   * Get conversation by ID
   */
  conversation: GetConversation_conversation;
}

export interface GetConversationVariables {
  conversationId: string;
}
