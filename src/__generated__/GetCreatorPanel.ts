/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCreatorPanel
// ====================================================

export interface GetCreatorPanel_creatorPanel {
  __typename: "CreatorPanel";
  id: string;
  isOpen: boolean;
  creatorId: string | null;
  collabId: string | null;
  isDummy: boolean | null;
}

export interface GetCreatorPanel {
  creatorPanel: GetCreatorPanel_creatorPanel | null;
}
