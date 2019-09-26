import superagent from 'superagent'

const request = superagent.agent()

export interface IRequestStatus {
  isLoading: boolean
  hasFailed: boolean | string
  hasSucceeded: boolean
}

const defaultRequestStatus = {
  isLoading: false,
  hasFailed: false,
  hasSucceeded: false,
}

const loadingRequest: IRequestStatus = { isLoading: true, hasFailed: false, hasSucceeded: false }
const successfulRequest: IRequestStatus = { isLoading: false, hasFailed: false, hasSucceeded: true }
const rejectedRequest: IRequestStatus = { isLoading: false, hasFailed: true, hasSucceeded: false }

const backendURL = process.env.REACT_APP_BACKEND_URL

export {
  request,
  defaultRequestStatus,
  loadingRequest,
  successfulRequest,
  rejectedRequest,
  backendURL,
}
