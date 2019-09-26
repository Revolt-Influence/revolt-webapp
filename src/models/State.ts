import { ISession, defaultSession } from './Session'
import IDisplay, { defaultDisplay } from './Display'
import { ICampaignState, defaultCampaignState } from './Campaign'
import { ICollabState, defaultCollabState } from './Collab'
import { defaultCreatorState, ICreatorState } from './Creator'
import { IConversationsState, defaultConversationsState } from './Conversation'

export default interface IState {
  session: ISession
  creators: ICreatorState
  display: IDisplay
  campaigns: ICampaignState
  collabs: ICollabState
  conversations: IConversationsState
}

const defaultState: IState = {
  session: defaultSession,
  creators: defaultCreatorState,
  display: defaultDisplay,
  campaigns: defaultCampaignState,
  collabs: defaultCollabState,
  conversations: defaultConversationsState,
}

export { defaultState }
