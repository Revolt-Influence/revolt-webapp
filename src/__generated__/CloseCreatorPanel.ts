/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CloseCreatorPanel
// ====================================================

export interface CloseCreatorPanel_closeCreatorPanel {
  __typename: "CreatorPanel";
  id: string;
  isOpen: boolean;
  creatorId: string | null;
  collabId: string | null;
  isDummy: boolean | null;
}

export interface CloseCreatorPanel {
  closeCreatorPanel: CloseCreatorPanel_closeCreatorPanel;
}
