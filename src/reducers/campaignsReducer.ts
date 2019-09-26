import IAction from '../models/Action'
import { defaultCampaignState, ICampaignState } from '../models/Campaign'
import { sessionActions } from '../actions/session'
import { campaignsActions } from '../actions/campaigns'
import { loadingRequest, successfulRequest, rejectedRequest } from '../utils/request'
import { creatorsActions } from '../actions/creators'

function campaignsReducer(
  state: ICampaignState = defaultCampaignState,
  action: IAction
): ICampaignState {
  const { type, payload } = action
  switch (type) {
    case campaignsActions.CREATE_CAMPAIGN_PENDING:
      return {
        ...state,
        requests: {
          ...state.requests,
          createCampaign: loadingRequest,
        },
      }
    case campaignsActions.CREATE_CAMPAIGN_FULFILLED:
      return {
        ...state,
        items: [...state.items, payload.body.campaign],
        requests: {
          ...state.requests,
          createCampaign: successfulRequest,
        },
      }
    case campaignsActions.CREATE_CAMPAIGN_REJECTED:
      return {
        ...state,
        requests: {
          ...state.requests,
          createCampaign: rejectedRequest,
        },
      }
    case sessionActions.RETRIEVE_USER_FULFILLED:
      return {
        ...state,
        totalPages: payload.body.totalPages,
        currentPage: 1,
        items: payload.body.campaigns,
      }
    case sessionActions.USER_SIGNUP_FULFILLED:
      return {
        ...state,
        totalPages: 1,
        currentPage: 1,
        items: [],
      }
    case sessionActions.LOGIN_FULFILLED:
      return {
        ...state,
        totalPages: payload.body.totalPages,
        currentPage: 1,
        items: payload.body.campaigns,
      }
    case sessionActions.LOGOUT_FULFILLED:
      return {
        ...state,
        items: [],
      }
    case campaignsActions.SAVE_CAMPAIGN_SETTINGS_PENDING:
      return {
        ...state,
        requests: {
          ...state.requests,
          saveSettings: loadingRequest,
        },
      }
    case campaignsActions.SAVE_CAMPAIGN_SETTINGS_REJECTED:
      return {
        ...state,
        requests: {
          ...state.requests,
          saveSettings: rejectedRequest,
        },
      }
    case campaignsActions.SAVE_CAMPAIGN_SETTINGS_FULFILLED:
      return {
        ...state,
        items: state.items.map(_campaign =>
          _campaign._id === payload.body.campaign._id ? payload.body.campaign : _campaign
        ),
        requests: {
          ...state.requests,
          saveSettings: successfulRequest,
        },
      }
    case campaignsActions.TOGGLE_ARCHIVE_CAMPAIGN_PENDING:
      return {
        ...state,
        requests: {
          ...state.requests,
          toggleArchiveCampaign: loadingRequest,
        },
      }
    case campaignsActions.TOGGLE_ARCHIVE_CAMPAIGN_REJECTED:
      return {
        ...state,
        requests: {
          ...state.requests,
          toggleArchiveCampaign: rejectedRequest,
        },
      }
    case campaignsActions.TOGGLE_ARCHIVE_CAMPAIGN_FULFILLED:
      return {
        ...state,
        // Replace the right item without changing the order
        items: state.items.map(_item =>
          _item._id === payload.body.campaign._id ? payload.body.campaign : _item
        ),
        requests: {
          ...state.requests,
          toggleArchiveCampaign: successfulRequest,
        },
      }
    case creatorsActions.CHECK_INSTAGRAM_TOKEN_FULFILLED:
      return {
        ...state,
        totalPages: payload.body.totalPages,
        items: payload.body.experiences,
      }
    case creatorsActions.LINK_YOUTUBE_CHANNEL_FULFILLED:
      return {
        ...state,
        totalPages: payload.body.totalPages,
        items: payload.body.experiences,
      }
    case campaignsActions.GET_CAMPAIGN_PENDING:
      return {
        ...state,
        requests: {
          ...state.requests,
          getCampaign: loadingRequest,
        },
      }
    case campaignsActions.GET_CAMPAIGN_REJECTED:
      return {
        ...state,
        requests: {
          ...state.requests,
          getCampaign: rejectedRequest,
        },
      }
    case campaignsActions.GET_CAMPAIGN_FULFILLED:
      return {
        ...state,
        // Make sure the campaign isn't added twice
        items: [
          ...state.items.filter(_campaign => _campaign._id !== payload.body.campaign._id),
          payload.body.campaign,
        ],
        currentPage: -1,
        requests: {
          ...state.requests,
          getCampaign: successfulRequest,
        },
      }
    case campaignsActions.GET_CAMPAIGNS_PAGE_PENDING:
      return {
        ...state,
        requests: {
          ...state.requests,
          getPage: loadingRequest,
        },
      }
    case campaignsActions.GET_CAMPAIGNS_PAGE_REJECTED:
      return {
        ...state,
        requests: {
          ...state.requests,
          getPage: rejectedRequest,
        },
      }
    case campaignsActions.GET_CAMPAIGNS_PAGE_FULFILLED:
      return {
        ...state,
        items: payload.body.campaigns,
        currentPage: payload.body.currentPage,
        requests: {
          ...state.requests,
          getPage: successfulRequest,
        },
      }
    case campaignsActions.REVIEW_CAMPAIGN_PENDING:
      return {
        ...state,
        requests: {
          ...state.requests,
          reviewCampaign: loadingRequest,
        },
      }
    case campaignsActions.REVIEW_CAMPAIGN_REJECTED:
      return {
        ...state,
        requests: {
          ...state.requests,
          reviewCampaign: rejectedRequest,
        },
      }
    case campaignsActions.REVIEW_CAMPAIGN_FULFILLED:
      return {
        ...state,
        items: state.items.map(_campaign =>
          _campaign._id === payload.body.campaign._id ? payload.body.campaign : _campaign
        ),
        requests: {
          ...state.requests,
          reviewCampaign: successfulRequest,
        },
      }
    case campaignsActions.DELETE_CAMPAIGN_PENDING:
      return {
        ...state,
        requests: {
          ...state.requests,
          deleteCampaign: loadingRequest,
        },
      }
    case campaignsActions.DELETE_CAMPAIGN_REJECTED:
      return {
        ...state,
        requests: {
          ...state.requests,
          deleteCampaign: rejectedRequest,
        },
      }
    case campaignsActions.DELETE_CAMPAIGN_FULFILLED:
      return {
        ...state,
        items: state.items.filter(_campaign => _campaign._id !== payload.body.campaignId),
        requests: {
          ...state.requests,
          deleteCampaign: successfulRequest,
        },
      }
    default:
      return state
  }
}

export default campaignsReducer
