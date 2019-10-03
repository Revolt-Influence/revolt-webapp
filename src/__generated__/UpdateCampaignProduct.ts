/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CampaignProductInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateCampaignProduct
// ====================================================

export interface UpdateCampaignProduct_updateCampaignProduct_product {
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
   * Cloudinary URLs of promo images of the product
   */
  pictures: string[];
  /**
   * Link of a YouTube video that presents the product
   */
  youtubeLink: string | null;
}

export interface UpdateCampaignProduct_updateCampaignProduct {
  __typename: "Campaign";
  /**
   * Mongoose generated ID
   */
  _id: string;
  /**
   * What the creator will receive
   */
  product: UpdateCampaignProduct_updateCampaignProduct_product;
}

export interface UpdateCampaignProduct {
  /**
   * Edit the product that the campaign promotes
   */
  updateCampaignProduct: UpdateCampaignProduct_updateCampaignProduct;
}

export interface UpdateCampaignProductVariables {
  campaignProduct: CampaignProductInput;
  campaignId: string;
}
