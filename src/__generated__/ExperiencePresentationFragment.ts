/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ExperiencePresentationFragment
// ====================================================

export interface ExperiencePresentationFragment_brand {
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

export interface ExperiencePresentationFragment_product {
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

export interface ExperiencePresentationFragment {
  __typename: "Campaign";
  /**
   * Mongoose generated ID
   */
  _id: string;
  /**
   * The campaign name that is promoted to the creators
   */
  name: string;
  /**
   * More info about the campaign and its goals
   */
  description: string;
  /**
   * The brand that published the campaign
   */
  brand: ExperiencePresentationFragment_brand | null;
  /**
   * What the creator will receive
   */
  product: ExperiencePresentationFragment_product;
  /**
   * Rules that creators must respect to receive the gift
   */
  rules: string[];
  createdAt: any;
}
