import IAction from '../models/Action'
import { IProfilePanel } from '../models/Display'

const displayActions = {
  SHOW_LIMIT_POPUP: 'SHOW_LIMIT_POPUP',
  CLOSE_LIMIT_POPUP: 'CLOSE_LIMIT_POPUP',
  SHOW_PROFILE_PANEL: 'SHOW_PROFILE_PANEL',
  HIDE_PROFILE_PANEL: 'HIDE_PROFILE_PANEL',
}

function closeLimitPopup(): IAction {
  return {
    type: displayActions.CLOSE_LIMIT_POPUP,
  }
}

function showLimitPopup(): IAction {
  return {
    type: displayActions.SHOW_LIMIT_POPUP,
  }
}

function showProfilePanel(creator: IProfilePanel): IAction {
  return {
    type: displayActions.SHOW_PROFILE_PANEL,
    payload: creator,
  }
}

function hideProfilePanel(): IAction {
  return {
    type: displayActions.HIDE_PROFILE_PANEL,
  }
}

export { showLimitPopup, displayActions, closeLimitPopup, showProfilePanel, hideProfilePanel }
