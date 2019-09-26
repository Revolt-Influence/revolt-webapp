import IAction from '../models/Action'
import { request, backendURL } from '../utils/request'
import { IPostalAddress, CreatorStatus } from '../models/Creator'

const creatorsActions = {
  // Request creator profile with Youtube and Instagram data
  GET_FULL_PROFILE: 'GET_FULL_PROFILE',
  GET_FULL_PROFILE_PENDING: 'GET_FULL_PROFILE_PENDING',
  GET_FULL_PROFILE_FULFILLED: 'GET_FULL_PROFILE_FULFILLED',
  GET_FULL_PROFILE_REJECTED: 'GET_FULL_PROFILE_REJECTED',
  // Check Instagram token
  CHECK_INSTAGRAM_TOKEN: 'CHECK_INSTAGRAM_TOKEN',
  CHECK_INSTAGRAM_TOKEN_PENDING: 'CHECK_INSTAGRAM_TOKEN_PENDING',
  CHECK_INSTAGRAM_TOKEN_FULFILLED: 'CHECK_INSTAGRAM_TOKEN_FULFILLED',
  CHECK_INSTAGRAM_TOKEN_REJECTED: 'CHECK_INSTAGRAM_TOKEN_REJECTED',
  // Save postal address
  SAVE_POSTAL_ADDRESS: 'SAVE_POSTAL_ADDRESS',
  SAVE_POSTAL_ADDRESS_PENDING: 'SAVE_POSTAL_ADDRESS_PENDING',
  SAVE_POSTAL_ADDRESS_FULFILLED: 'SAVE_POSTAL_ADDRESS_FULFILLED',
  SAVE_POSTAL_ADDRESS_REJECTED: 'SAVE_POSTAL_ADDRESS_REJECTED',
  // Save profile
  SAVE_CREATOR_PROFILE: 'SAVE_CREATOR_PROFILE',
  SAVE_CREATOR_PROFILE_PENDING: 'SAVE_CREATOR_PROFILE_PENDING',
  SAVE_CREATOR_PROFILE_FULFILLED: 'SAVE_CREATOR_PROFILE_FULFILLED',
  SAVE_CREATOR_PROFILE_REJECTED: 'SAVE_CREATOR_PROFILE_REJECTED',
  // Connect Instagram to creator
  LINK_INSTAGRAM_ACCOUNT: 'LINK_INSTAGRAM_ACCOUNT',
  LINK_INSTAGRAM_ACCOUNT_PENDING: 'LINK_INSTAGRAM_ACCOUNT_PENDING',
  LINK_INSTAGRAM_ACCOUNT_FULFILLED: 'LINK_INSTAGRAM_ACCOUNT_FULFILLED',
  LINK_INSTAGRAM_ACCOUNT_REJECTED: 'LINK_INSTAGRAM_ACCOUNT_REJECTED',
  // Check your Youtube token
  LINK_YOUTUBE_CHANNEL: 'LINK_YOUTUBE_CHANNEL',
  LINK_YOUTUBE_CHANNEL_PENDING: 'LINK_YOUTUBE_CHANNEL_PENDING',
  LINK_YOUTUBE_CHANNEL_FULFILLED: 'LINK_YOUTUBE_CHANNEL_FULFILLED',
  LINK_YOUTUBE_CHANNEL_REJECTED: 'LINK_YOUTUBE_CHANNEL_REJECTED',
  // Check your Youtube token
  UPDATE_CREATOR_CONTACT: 'UPDATE_CREATOR_CONTACT',
  UPDATE_CREATOR_CONTACT_PENDING: 'UPDATE_CREATOR_CONTACT_PENDING',
  UPDATE_CREATOR_CONTACT_FULFILLED: 'UPDATE_CREATOR_CONTACT_FULFILLED',
  UPDATE_CREATOR_CONTACT_REJECTED: 'UPDATE_CREATOR_CONTACT_REJECTED',
  // Save instagram posts
  SAVE_INSTAGRAM_POSTS: 'SAVE_INSTAGRAM_POSTS',
  SAVE_INSTAGRAM_POSTS_PENDING: 'SAVE_INSTAGRAM_POSTS_PENDING',
  SAVE_INSTAGRAM_POSTS_FULFILLED: 'SAVE_INSTAGRAM_POSTS_FULFILLED',
  SAVE_INSTAGRAM_POSTS_REJECTED: 'SAVE_INSTAGRAM_POSTS_REJECTED',
  // Save instagram posts
  GET_CREATORS_PAGE: 'GET_CREATORS_PAGE',
  GET_CREATORS_PAGE_PENDING: 'GET_CREATORS_PAGE_PENDING',
  GET_CREATORS_PAGE_FULFILLED: 'GET_CREATORS_PAGE_FULFILLED',
  GET_CREATORS_PAGE_REJECTED: 'GET_CREATORS_PAGE_REJECTED',
  // Set creator status
  SET_CREATOR_STATUS: 'SET_CREATOR_STATUS',
  SET_CREATOR_STATUS_PENDING: 'SET_CREATOR_STATUS_PENDING',
  SET_CREATOR_STATUS_FULFILLED: 'SET_CREATOR_STATUS_FULFILLED',
  SET_CREATOR_STATUS_REJECTED: 'SET_CREATOR_STATUS_REJECTED',
}

function getFullCreatorProfile(creatorId: string): IAction {
  return {
    type: creatorsActions.GET_FULL_PROFILE,
    payload: request
      .get(`${backendURL}/creators/${creatorId}/`)
      .timeout({
        response: 30000,
        deadline: 60000, // but allow 1 minute for the response to finish loading
      })
      .withCredentials(),
  }
}

function getCreatorsPage(page: number, status: CreatorStatus): IAction {
  return {
    type: creatorsActions.GET_CREATORS_PAGE,
    payload: request.get(`${backendURL}/creators?page=${page}&status=${status}`).withCredentials(),
  }
}

function checkInstagramToken(influencerData: any): IAction {
  return {
    type: creatorsActions.CHECK_INSTAGRAM_TOKEN,
    payload: request
      .post(`${backendURL}/creators/checkInstagramToken`)
      .send({ influencerData })
      .withCredentials(),
  }
}

function savePostalAddress(postalAddress: IPostalAddress): IAction {
  return {
    type: creatorsActions.SAVE_POSTAL_ADDRESS,
    payload: request
      .post(`${backendURL}/creators/postalAddress`)
      .send({ postalAddress })
      .withCredentials(),
  }
}

function saveCreatorProfile(profile: { name: string; picture: string }): IAction {
  const { name, picture } = profile
  return {
    type: creatorsActions.SAVE_CREATOR_PROFILE,
    payload: request
      .post(`${backendURL}/creators/profile`)
      .send({ name, picture })
      .withCredentials(),
  }
}

function linkInstagram(username: string): IAction {
  return {
    type: creatorsActions.LINK_INSTAGRAM_ACCOUNT,
    payload: request
      .post(`${backendURL}/creators/linkInstagram`)
      .send({ username })
      .withCredentials(),
  }
}

function linkYoutubeChannel(code: string): IAction {
  return {
    type: creatorsActions.LINK_YOUTUBE_CHANNEL,
    payload: request
      .post(`${backendURL}/creators/linkYoutubeChannel`)
      .send({ code })
      .withCredentials(),
  }
}

interface ICreatorContactInfo {
  phone: string
  email: string
}
function updateCreatorContactInfo(contactInfo: ICreatorContactInfo): IAction {
  return {
    type: creatorsActions.UPDATE_CREATOR_CONTACT,
    payload: request
      .post(`${backendURL}/creators/contactInfo`)
      .send(contactInfo)
      .withCredentials(),
  }
}

interface ISaveInstagramPostsPayload {
  username: string
  influencerData: any
}
function saveInstagramPosts({ username, influencerData }: ISaveInstagramPostsPayload): IAction {
  return {
    type: creatorsActions.SAVE_INSTAGRAM_POSTS,
    payload: request
      .post(`${backendURL}/influencer/${username}/posts`)
      .send({ influencerData })
      .withCredentials(),
  }
}

interface CreatorStatusPayload {
  creatorId: string
  newStatus: CreatorStatus
}
function setCreatorStatus({ creatorId, newStatus }: CreatorStatusPayload): IAction {
  return {
    type: creatorsActions.SET_CREATOR_STATUS,
    payload: request
      .patch(`${backendURL}/creators/${creatorId}/status`)
      .send({ status: newStatus })
      .withCredentials(),
  }
}

export {
  creatorsActions,
  getFullCreatorProfile,
  checkInstagramToken,
  savePostalAddress,
  saveCreatorProfile,
  linkYoutubeChannel,
  linkInstagram,
  updateCreatorContactInfo,
  saveInstagramPosts,
  getCreatorsPage,
  setCreatorStatus,
}
