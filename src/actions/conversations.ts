import IAction from '../models/Action'
import { request, backendURL } from '../utils/request'
import { IMessage } from '../models/Conversation'

const conversationActions = {
  // Fetch all conversations
  GET_CONVERSATIONS_PAGE: 'GET_CONVERSATIONS_PAGE',
  GET_CONVERSATIONS_PAGE_PENDING: 'GET_CONVERSATIONS_PAGE_PENDING',
  GET_CONVERSATIONS_PAGE_FULFILLED: 'GET_CONVERSATIONS_PAGE_FULFILLED',
  GET_CONVERSATIONS_PAGE_REJECTED: 'GET_CONVERSATIONS_PAGE_REJECTED',
  // Fetch specific conversation
  GET_CONVERSATION: 'GET_CONVERSATION',
  GET_CONVERSATION_PENDING: 'GET_CONVERSATION_PENDING',
  GET_CONVERSATION_FULFILLED: 'GET_CONVERSATION_FULFILLED',
  GET_CONVERSATION_REJECTED: 'GET_CONVERSATION_REJECTED',
  // Send message to conversation
  SEND_MESSAGE: 'SEND_MESSAGE',
  SEND_MESSAGE_PENDING: 'SEND_MESSAGE_PENDING',
  SEND_MESSAGE_FULFILLED: 'SEND_MESSAGE_FULFILLED',
  SEND_MESSAGE_REJECTED: 'SEND_MESSAGE_REJECTED',
  // Receive message (message comes from socket)
  RECEIVE_MESSAGE: 'RECEIVE_MESSAGE',
}

function fetchConversationsPage(page: number): IAction {
  return {
    type: conversationActions.GET_CONVERSATIONS_PAGE,
    payload: request.get(`${backendURL}/conversations?page=${page}`).withCredentials(),
  }
}

function fetchConversation(conversationId: string): IAction {
  return {
    type: conversationActions.GET_CONVERSATION,
    payload: request.get(`${backendURL}/conversations/${conversationId}`).withCredentials(),
  }
}

function sendMessage({ text, conversationId }: { text: string; conversationId: string }): IAction {
  return {
    type: conversationActions.SEND_MESSAGE,
    payload: request
      .post(`${backendURL}/conversations/${conversationId}/message`)
      .send({ text })
      .withCredentials(),
  }
}

function receiveMessage(message: IMessage): IAction {
  return {
    type: conversationActions.RECEIVE_MESSAGE,
    payload: { message },
  }
}

export {
  conversationActions,
  fetchConversationsPage,
  sendMessage,
  receiveMessage,
  fetchConversation,
}
