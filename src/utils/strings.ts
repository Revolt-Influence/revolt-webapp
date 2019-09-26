import { css } from 'styled-components'

function capitalizeFirstLetter(rawString: string): string {
  return rawString.charAt(0).toUpperCase() + rawString.slice(1)
}

function joinStrings(strings: string[]): string {
  return strings.join(', ')
}

function truncateString(width: string) {
  return css`
    max-width: ${width};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `
}

function blurEmail(email: string, charactersToShow: number = 5): string {
  // Metaphorical blur, replace most characters with string of *
  // Handle edge cases
  if (email == null) return null
  if (email.length <= charactersToShow) return '*'.repeat(email.length)
  const clearPart = email.substring(0, charactersToShow)
  const blurredPart = '*'.repeat(email.length - charactersToShow)
  return `${clearPart}${blurredPart}`
}

// tslint:disable-next-line
const emailRegex =
  "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"

function sortStrings(strings: string[]): string[] {
  return strings.sort((a, b) => a.localeCompare(b))
}

function normalizeString(text: string): string {
  const smallText = text.toLowerCase()
  // Got from StackOverflow, not to be overly trusted
  return smallText.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

function getLastNumber(text: string): number {
  return Number(text.match(/(\d+)(?!.*\d)/)[0])
}

export {
  capitalizeFirstLetter,
  emailRegex,
  joinStrings,
  truncateString,
  sortStrings,
  normalizeString,
  blurEmail,
  getLastNumber,
}
