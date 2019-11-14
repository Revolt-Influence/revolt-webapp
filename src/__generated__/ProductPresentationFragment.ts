/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { GameCategory } from "./globalTypes";

// ====================================================
// GraphQL fragment: ProductPresentationFragment
// ====================================================

export interface ProductPresentationFragment_brand {
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

export interface ProductPresentationFragment_product {
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
   * Game lauch date, defined only if future
   */
  launchedAt: any | null;
}

export interface ProductPresentationFragment {
  __typename: "Campaign";
  /**
   * Mongoose generated ID
   */
  _id: string;
  /**
   * The brand that published the campaign
   */
  brand: ProductPresentationFragment_brand | null;
  /**
   * What the creator will receive
   */
  product: ProductPresentationFragment_product;
  /**
   * Rules that creators must respect to receive the gift
   */
  rules: string[];
  createdAt: any;
}
