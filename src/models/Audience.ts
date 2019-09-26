export interface IAudienceMetric {
  name: string // 'Paris' or 'France'
  percentage: number
}

export interface IAudienceInterest {
  name: string
  percentage: number
}

export interface IAudience {
  // Location
  topCities: IAudienceMetric[]
  topCountries: IAudienceMetric[]
  // Interests
  topInterests: IAudienceInterest[]
  // Gender
  malePercentage: number // 61
  femalePercentage: number // 39
  // Authenticity
  influencersPercentage: number
  authenticPercentage: number
  massfollowersPercentage: number
  suspiciousPercentage: number
}
