import { combineReducers } from 'redux'
import sessionReducer from './sessionReducer'
import creatorsReducer from './creatorsReducer'
import displayReducer from './displayReducer'
import campaignsReducer from './campaignsReducer'
import collabsReducer from './collabsReducer'
import conversationsReducer from './conversationsReducer'

const rootReducer = combineReducers({
  session: sessionReducer,
  creators: creatorsReducer,
  campaigns: campaignsReducer,
  collabs: collabsReducer,
  display: displayReducer,
  conversations: conversationsReducer,
})

export default rootReducer
