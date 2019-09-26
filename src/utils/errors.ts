const errorNames = {
  userAlreadyExists: 'User already exists',
  influencerNotFound: 'Influencer not found',
  influencerIsPrivate: 'Influencer is private',
  userNotFound: 'User not found',
  customerNotFound: 'Customer not found',
  listNotFound: 'List not found',
  wrongPassword: 'Wrong password',
  unauthorized: 'Unauthorized, you may need to login',
  loginFail: 'Login failed, invalid email or password',
  invalidLink: 'This link is not valid',
  guestPlanLimit: 'You reached the limit of the Guest plan',
  freePlanLimit: 'You reached the limit of the Free plan',
  pictureNotFound: 'Picture was not found',
  scrapeInfluencerFail: 'Could not scrape influencer profile',
  resetPasswordEmailFail: 'Could not send reset password email',
  sendConfirmEmailLinkFail: 'Could not send confirm email link',
  invalidEmailToken: 'Invalid email token',
  spammyAddress: 'Spammy email address',
  emailNotConfirmed: 'Email not confirmed',
  pageDoesNotExist: 'Page does not exist',
  invalidPayload: 'Invalid payload',
  invalidToken: 'Invalid token',
  // Campaign related
  campaignNotFound: 'Campaign not found',
  campaignAlreadyExists: 'Campaign already exists',
  influencerAlreadyAdded: 'Influencer already added',
  default: 'Something went wrong',
  // Collab related
  collabNotFound: 'Collab not found',
  alreadyApplied: 'Already applied to collab',
  scrapeReviewFailed: 'Could not scrape review',
  // Review related
  reviewNotFound: 'Review not found',
  // Creator related
  creatorAlreadyExists: 'Creator already exists',
  creatorNotFound: 'Creator not found',
  youtuberNotFound: 'Youtuber not found',
  notEnoughFollowers: 'Not enough followers',
}

export { errorNames }
