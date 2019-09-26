import { CurrencyType } from '../models/Campaign'

function getCurrencySymbol(currency: CurrencyType): string {
  switch (currency) {
    case 'Euro':
      return '€'
    case 'US Dollar':
      return '$'
    case 'Pound Sterling':
      return '£'
    // Should not happen
    default:
      return currency
  }
}

export { getCurrencySymbol }
