import {
  Gender,
  AgeGroup,
  ProductCategory,
  TrackingProvider,
  Language,
  ReviewFormat,
  CreatorStatus,
  ReviewCollabDecision,
} from '../__generated__/globalTypes'

export function showGender(gender: Gender): string {
  switch (gender) {
    case Gender.ANY:
      return 'Any'
    case Gender.MALE:
      return 'Male'
    case Gender.FEMALE:
      return 'Female'
    default:
      return gender
  }
}

export function showAgeGroup(ageGroup: AgeGroup): string {
  switch (ageGroup) {
    case AgeGroup.AGE_13_17:
      return '13-17'
    case AgeGroup.AGE_18_24:
      return '18-24'
    case AgeGroup.AGE_25_34:
      return '25-34'
    case AgeGroup.AGE_35_44:
      return '35-44'
    case AgeGroup.AGE_45_54:
      return '45-54'
    case AgeGroup.AGE_55_64:
      return '55-64'
    case AgeGroup.AGE_65_PLUS:
      return '65+'
    case AgeGroup.ANY:
      return 'any'
    default:
      return ageGroup
  }
}

export function showProductCategory(category: ProductCategory): string {
  switch (category) {
    case ProductCategory.FAMILY:
      return 'Family'
    case ProductCategory.FASHION:
      return 'Fashion'
    case ProductCategory.FITNESS:
      return 'Fitness'
    case ProductCategory.HEALTH:
      return 'Health'
    case ProductCategory.LIFESTYLE:
      return 'Lifestyle'
    case ProductCategory.MAKEUP:
      return 'Makeup'
    case ProductCategory.NUTRITION:
      return 'Food'
    case ProductCategory.TRAVEL:
      return 'Travel'

    default:
      return category
  }
}

export function showTrackingProvider(provider: TrackingProvider): string {
  switch (provider) {
    case TrackingProvider.GAME_ANALYTICS:
      return 'Game Analytics'
    case TrackingProvider.GOOGLE_ANALYTICS:
      return 'Google Analytics'
    case TrackingProvider.NONE:
      return 'No tracking provider'
    case TrackingProvider.OTHER:
      return 'Other'
    case TrackingProvider.UNITY_ANALYTICS:
      return 'Unity Analytics'
    case TrackingProvider.ADJUST:
      return 'Adjust'
    case TrackingProvider.APPSFLYER:
      return 'AppsFlyer'
    case TrackingProvider.BUFFPANEL:
      return 'BuffPanel'
    case TrackingProvider.CUSTOM_LINK:
      return 'Custom tracked link'
    case TrackingProvider.KOCHAVA:
      return 'Kochava'
    case TrackingProvider.SINGULAR:
      return 'Singular'
    case TrackingProvider.TENJIN:
      return 'Tenjin'
    case TrackingProvider.TUNE:
      return 'TUNE'
    default:
      return provider
  }
}

export function showLanguage(language: Language): string {
  switch (language) {
    case Language.ARABIC:
      return 'Arabic'
    case Language.ENGLISH:
      return 'English'
    case Language.FRENCH:
      return 'French'
    case Language.GERMAN:
      return 'German'
    case Language.HINDI:
      return 'Hindi'
    case Language.INDONESIAN:
      return 'Indonesian'
    case Language.ITALIAN:
      return 'Italian'
    case Language.JAPANESE:
      return 'Japanese'
    case Language.MANDARIN:
      return 'Mandarin Chinese'
    case Language.NORWEGIAN:
      return 'Norwegian'
    case Language.PORTUGUESE:
      return 'Portuguese'
    case Language.RUSSIAN:
      return 'Russian'
    case Language.SPANISH:
      return 'Spanish'
    case Language.SWEDISH:
      return 'Swedish'
    case Language.OTHER:
      return 'Other language'
  }
}

export function showReviewFormat(format: ReviewFormat): string {
  switch (format) {
    case ReviewFormat.YOUTUBE_VIDEO:
      return 'YouTube video'
    default:
      return format
  }
}

export function showCreatorStatus(status: CreatorStatus): string {
  switch (status) {
    case CreatorStatus.BLOCKED:
      return 'Blocked'
    case CreatorStatus.UNVERIFIED:
      return 'Unverified'
    case CreatorStatus.VERIFIED:
      return 'Verified'
    default:
      return status
  }
}

export function showReviewCollabDecision(decision: ReviewCollabDecision): string {
  switch (decision) {
    case ReviewCollabDecision.ACCEPT:
      return 'Accept'
    case ReviewCollabDecision.DENY:
      return 'Deny'
    case ReviewCollabDecision.MARK_AS_SENT:
      return 'Mark as sent'
    default:
      return decision
  }
}
