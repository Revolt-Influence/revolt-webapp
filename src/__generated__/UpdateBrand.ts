/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UpdateBrandInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateBrand
// ====================================================

export interface UpdateBrand_updateBrand {
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

export interface UpdateBrand {
  /**
   * Update brand attributes
   */
  updateBrand: UpdateBrand_updateBrand;
}

export interface UpdateBrandVariables {
  updatedBrand: UpdateBrandInput;
  id: string;
}
