/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CollabStatus } from "./globalTypes";

// ====================================================
// GraphQL fragment: ConversationFragment
// ====================================================

export interface ConversationFragment_messages_brandAuthor {
  __typename: "Brand";
  /**
   * Mongoose generated ID
   */
  _id: string;
}

export interface ConversationFragment_messages_creatorAuthor {
  __typename: "Creator";
  /**
   * Mongoose generated ID
   */
  _id: string;
}

export interface ConversationFragment_messages_conversation {
  __typename: "Conversation";
  /**
   * Mongoose generated ID
   */
  _id: string;
}

export interface ConversationFragment_messages {
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
  brandAuthor: ConversationFragment_messages_brandAuthor | null;
  /**
   * Potential creator author
   */
  creatorAuthor: ConversationFragment_messages_creatorAuthor | null;
  /**
   * Whether the message was sent by an admin or is a notification
   */
  isAdminAuthor: boolean;
  createdAt: any;
  /**
   * The conversation the message is a part of
   */
  conversation: ConversationFragment_messages_conversation;
}

export interface ConversationFragment_creator {
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

export interface ConversationFragment_brand {
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

export interface ConversationFragment_collabs_campaign {
  __typename: "Campaign";
  /**
   * Mongoose generated ID
   */
  _id: string;
}

export interface ConversationFragment_collabs {
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
  campaign: ConversationFragment_collabs_campaign;
}

export interface ConversationFragment {
  __typename: "Conversation";
  /**
   * Mongoose generated ID
   */
  _id: string;
  createdAt: any;
  /**
   * Conversation messages from old to new
   */
  messages: ConversationFragment_messages[];
  /**
   * Creator that talks to a brand
   */
  creator: ConversationFragment_creator;
  /**
   * Brand that talks to a creator
   */
  brand: ConversationFragment_brand;
  collabs: ConversationFragment_collabs[];
}
