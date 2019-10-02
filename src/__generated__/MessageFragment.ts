/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MessageFragment
// ====================================================

export interface MessageFragment_brandAuthor {
  __typename: "Brand";
  /**
   * Mongoose generated ID
   */
  _id: string;
}

export interface MessageFragment_creatorAuthor {
  __typename: "Creator";
  /**
   * Mongoose generated ID
   */
  _id: string;
}

export interface MessageFragment_conversation {
  __typename: "Conversation";
  /**
   * Mongoose generated ID
   */
  _id: string;
}

export interface MessageFragment {
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
  brandAuthor: MessageFragment_brandAuthor | null;
  /**
   * Potential creator author
   */
  creatorAuthor: MessageFragment_creatorAuthor | null;
  /**
   * Whether the message was sent by an admin or is a notification
   */
  isAdminAuthor: boolean;
  createdAt: any;
  /**
   * The conversation the message is a part of
   */
  conversation: MessageFragment_conversation;
}
