import IAction from '../models/Action'
import { conversationActions } from '../actions/conversations'
import { IConversationsState, defaultConversationsState } from '../models/Conversation'
import { loadingRequest, successfulRequest, rejectedRequest } from '../utils/request'
import { sessionActions } from '../actions/session'

function conversationsReducer(
  state: IConversationsState = defaultConversationsState,
  action: IAction
): IConversationsState {
  const { type, payload } = action
  switch (type) {
    case conversationActions.GET_CONVERSATIONS_PAGE_PENDING:
      return {
        ...state,
        requests: {
          ...state.requests,
          getConversationsPage: loadingRequest,
        },
      }
    case conversationActions.GET_CONVERSATIONS_PAGE_FULFILLED:
      return {
        ...state,
        items: payload.body.conversations,
        currentPage: payload.body.currentPage,
        totalPages: payload.body.totalPages,
        requests: {
          ...state.requests,
          getConversationsPage: successfulRequest,
        },
      }
    case conversationActions.GET_CONVERSATIONS_PAGE_REJECTED:
      return {
        ...state,
        requests: {
          ...state.requests,
          getConversationsPage: rejectedRequest,
        },
      }
    case conversationActions.GET_CONVERSATION_PENDING:
      return {
        ...state,
        requests: {
          ...state.requests,
          getConversation: loadingRequest,
        },
      }
    case conversationActions.GET_CONVERSATION_FULFILLED:
      return {
        ...state,
        items: [...state.items, payload.body.conversation],
        requests: {
          ...state.requests,
          getConversation: successfulRequest,
        },
      }
    case conversationActions.GET_CONVERSATION_REJECTED:
      return {
        ...state,
        requests: {
          ...state.requests,
          getConversation: rejectedRequest,
        },
      }
    case conversationActions.SEND_MESSAGE_PENDING:
      return {
        ...state,
        requests: {
          ...state.requests,
          sendMessage: loadingRequest,
        },
      }
    case conversationActions.SEND_MESSAGE_FULFILLED:
      return {
        ...state,
        requests: {
          ...state.requests,
          sendMessage: successfulRequest,
        },
      }
    case conversationActions.SEND_MESSAGE_REJECTED:
      return {
        ...state,
        requests: {
          ...state.requests,
          sendMessage: rejectedRequest,
        },
      }
    case conversationActions.RECEIVE_MESSAGE:
      return {
        ...state,
        items: [
          ...state.items.map(_conv => {
            // Only change message conversation
            if (_conv._id === payload.message.conversation) {
              return {
                ..._conv,
                messages: [..._conv.messages, payload.message],
              }
            }
            // Nothing to change
            return _conv
          }),
        ],
      }
    case sessionActions.LOGOUT_FULFILLED:
      return {
        ...state,
        items: [],
        currentPage: 1,
        totalPages: 1,
      }
    default:
      return state
  }
}

export default conversationsReducer
