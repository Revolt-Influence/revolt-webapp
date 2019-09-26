export type Plan = 'free' | 'premium' | 'admin'

export interface IUser {
  _id?: string
  email: string
  signupDate: number
  switchToPremiumDate: number
  passwordHash: string
  phone: string
  plan: Plan
  creditCardLast4: string
  firstName: string
  lastName: string
  hasVerifiedEmail?: boolean
  company: string
  wantsHelp?: boolean
  ambassador?: string // _id
}

export interface ILoginInfo {
  email: string
  plainPassword: string
}
