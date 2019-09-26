import { TaskFormatType } from './Campaign'

export type DeviceType = 'mobile' | 'tablet' | 'desktop'

export interface IProfilePanel {
  creatorId: string
  collabId: string
  conversationId: string
  message: string
  formats: TaskFormatType[]
}

export default interface IDisplay {
  planLimitPopupIsShown: boolean
  profilePanel: IProfilePanel
}

const defaultDisplay: IDisplay = {
  planLimitPopupIsShown: false,
  profilePanel: null,
}

export { defaultDisplay }
