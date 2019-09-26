import { request, backendURL } from '../utils/request'
import IAction from '../models/Action'
import { ICampaign } from '../models/Campaign'

const campaignsActions = {
  // Get campaign
  GET_CAMPAIGN: 'GET_CAMPAIGN',
  GET_CAMPAIGN_PENDING: 'GET_CAMPAIGN_PENDING',
  GET_CAMPAIGN_FULFILLED: 'GET_CAMPAIGN_FULFILLED',
  GET_CAMPAIGN_REJECTED: 'GET_CAMPAIGN_REJECTED',
  // Get experiences page
  GET_CAMPAIGNS_PAGE: 'GET_CAMPAIGNS_PAGE',
  GET_CAMPAIGNS_PAGE_PENDING: 'GET_CAMPAIGNS_PAGE_PENDING',
  GET_CAMPAIGNS_PAGE_FULFILLED: 'GET_CAMPAIGNS_PAGE_FULFILLED',
  GET_CAMPAIGNS_PAGE_REJECTED: 'GET_CAMPAIGNS_PAGE_REJECTED',
  // Create campaign
  CREATE_CAMPAIGN: 'CREATE_CAMPAIGN',
  CREATE_CAMPAIGN_PENDING: 'CREATE_CAMPAIGN_PENDING',
  CREATE_CAMPAIGN_FULFILLED: 'CREATE_CAMPAIGN_FULFILLED',
  CREATE_CAMPAIGN_REJECTED: 'CREATE_CAMPAIGN_REJECTED',
  // Save campaign brief
  SAVE_CAMPAIGN_SETTINGS: 'SAVE_CAMPAIGN_SETTINGS',
  SAVE_CAMPAIGN_SETTINGS_PENDING: 'SAVE_CAMPAIGN_SETTINGS_PENDING',
  SAVE_CAMPAIGN_SETTINGS_FULFILLED: 'SAVE_CAMPAIGN_SETTINGS_FULFILLED',
  SAVE_CAMPAIGN_SETTINGS_REJECTED: 'SAVE_CAMPAIGN_SETTINGS_REJECTED',
  // Archive campaign
  TOGGLE_ARCHIVE_CAMPAIGN: 'TOGGLE_ARCHIVE_CAMPAIGN',
  TOGGLE_ARCHIVE_CAMPAIGN_PENDING: 'TOGGLE_ARCHIVE_CAMPAIGN_PENDING',
  TOGGLE_ARCHIVE_CAMPAIGN_FULFILLED: 'TOGGLE_ARCHIVE_CAMPAIGN_FULFILLED',
  TOGGLE_ARCHIVE_CAMPAIGN_REJECTED: 'TOGGLE_ARCHIVE_CAMPAIGN_REJECTED',
  // Delete campaign
  DELETE_CAMPAIGN: 'DELETE_CAMPAIGN',
  DELETE_CAMPAIGN_PENDING: 'DELETE_CAMPAIGN_PENDING',
  DELETE_CAMPAIGN_FULFILLED: 'DELETE_CAMPAIGN_FULFILLED',
  DELETE_CAMPAIGN_REJECTED: 'DELETE_CAMPAIGN_REJECTED',
  // Review campaign (for admins)
  REVIEW_CAMPAIGN: 'REVIEW_CAMPAIGN',
  REVIEW_CAMPAIGN_PENDING: 'REVIEW_CAMPAIGN_PENDING',
  REVIEW_CAMPAIGN_FULFILLED: 'REVIEW_CAMPAIGN_FULFILLED',
  REVIEW_CAMPAIGN_REJECTED: 'REVIEW_CAMPAIGN_REJECTED',
}

function getCampaign(campaignId: string): IAction {
  return {
    payload: request.get(`${backendURL}/campaigns/${campaignId}`).withCredentials(),
    type: campaignsActions.GET_CAMPAIGN,
  }
}

function createCampaign(): IAction {
  return {
    payload: request.post(`${backendURL}/campaigns`).withCredentials(),
    type: campaignsActions.CREATE_CAMPAIGN,
  }
}

interface ICampaignSettingsPayload {
  campaignId: string
  newCampaign: ICampaign
}

function saveCampaignBrief(payload: ICampaignSettingsPayload): IAction {
  const { campaignId, newCampaign } = payload
  return {
    payload: request
      .post(`${backendURL}/campaigns/${campaignId}/settings`)
      .send({ newCampaign })
      .withCredentials(),
    type: campaignsActions.SAVE_CAMPAIGN_SETTINGS,
  }
}

function getCampaignsPage(page: number): IAction {
  return {
    payload: request.get(`${backendURL}/campaigns?page=${page}`).withCredentials(),
    type: campaignsActions.GET_CAMPAIGNS_PAGE,
  }
}

function toggleArchiveCampaign(campaignId: string): IAction {
  return {
    payload: request.post(`${backendURL}/campaigns/${campaignId}/toggleArchive`).withCredentials(),
    type: campaignsActions.TOGGLE_ARCHIVE_CAMPAIGN,
  }
}

function deleteCampaign(campaignId: string): IAction {
  return {
    payload: request.delete(`${backendURL}/campaigns/${campaignId}/`).withCredentials(),
    type: campaignsActions.DELETE_CAMPAIGN,
  }
}

function reviewCampaign(campaignId: string): IAction {
  return {
    payload: request.post(`${backendURL}/campaigns/${campaignId}/review`).withCredentials(),
    type: campaignsActions.REVIEW_CAMPAIGN,
  }
}

export {
  campaignsActions,
  createCampaign,
  saveCampaignBrief,
  toggleArchiveCampaign,
  getCampaignsPage,
  getCampaign,
  deleteCampaign,
  reviewCampaign,
}
