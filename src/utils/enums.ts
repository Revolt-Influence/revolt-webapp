import {
  Gender,
  AgeGroup,
  GameCategory,
  TrackingProvider,
  Language,
  ReviewFormat,
  CreatorStatus,
  PublishingPlatform,
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

export function showGameCategory(category: GameCategory): string {
  switch (category) {
    case GameCategory.ACTION:
      return 'Action'
    case GameCategory.ADVENTURE:
      return 'Adventure'
    case GameCategory.ARCADE:
      return 'Arcade'
    case GameCategory.AR_VR:
      return 'AR / VR'
    case GameCategory.HORROR:
      return 'Horror'
    case GameCategory.INDIE:
      return 'Indie'
    case GameCategory.MMO:
      return 'MMO'
    case GameCategory.PARTY_GAME:
      return 'Party game'
    case GameCategory.PLATFORMER:
      return 'Platformer'
    case GameCategory.PUZZLE:
      return 'Puzzle'
    case GameCategory.RETRO:
      return 'Retro'
    case GameCategory.ROGUELIKE:
      return 'Roguelike'
    case GameCategory.RPG:
      return 'RPG'
    case GameCategory.SHOOTER:
      return 'Shooter'
    case GameCategory.SIMULATION:
      return 'Simulation'
    case GameCategory.SPORTS:
      return 'Sports'
    case GameCategory.STRATEGY:
      return 'Strategy'
    case GameCategory.SURVIVAL:
      return 'Survival'
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

export function showPublishingPlatform(platform: PublishingPlatform): string {
  switch (platform) {
    case PublishingPlatform.APP_STORE:
      return 'Apple App Store'
    case PublishingPlatform.EPIC:
      return 'Epic Games Store'
    case PublishingPlatform.ESHOP:
      return 'Nintendo eShop'
    case PublishingPlatform.GAME_JOLT:
      return 'Game Jolt'
    case PublishingPlatform.HUMBLE_BUNDLE:
      return 'Humble Bundle'
    case PublishingPlatform.ITCH:
      return 'Itch.io'
    case PublishingPlatform.KARTRIDGE:
      return 'Kartridge'
    case PublishingPlatform.MICROSOFT_STORE:
      return 'Microsoft Store (Xbox)'
    case PublishingPlatform.ORIGIN:
      return 'Origin'
    case PublishingPlatform.PLAY_STATION_STORE:
      return 'PlayStation Store'
    case PublishingPlatform.PLAY_STORE:
      return 'Google Play Store'
    case PublishingPlatform.STEAM:
      return 'Steam'
    default:
      return platform
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
