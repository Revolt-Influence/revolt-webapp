/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: OpenCreatorPanel
// ====================================================

export interface OpenCreatorPanel_openCreatorPanel {
  __typename: "CreatorPanel";
  id: string;
  isOpen: boolean;
  creatorId: string | null;
  collabId: string | null;
}

export interface OpenCreatorPanel {
  openCreatorPanel: OpenCreatorPanel_openCreatorPanel | null;
}

export interface OpenCreatorPanelVariables {
  creatorId: string;
  collabId?: string | null;
}
