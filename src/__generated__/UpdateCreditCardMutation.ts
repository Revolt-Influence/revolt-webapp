/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { Plan } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateCreditCardMutation
// ====================================================

export interface UpdateCreditCardMutation_updateCreditCard {
  __typename: "User";
  _id: string;
  /**
   * Got from Stripe, used to tell what card the user used
   */
  creditCardLast4: string | null;
  /**
   * Whether the user has paid
   */
  plan: Plan;
}

export interface UpdateCreditCardMutation {
  /**
   * Change the card that Stripe charges for Premium
   */
  updateCreditCard: UpdateCreditCardMutation_updateCreditCard;
}

export interface UpdateCreditCardMutationVariables {
  newPaymentToken: string;
}
