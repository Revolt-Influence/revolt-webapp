export function getCollabRecommendedQuote(estimatedCpm: number, medianViews: number): number {
  return Math.round((medianViews / 1000) * estimatedCpm)
}
