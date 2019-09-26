import { capitalizeFirstLetter, normalizeString, blurEmail } from '../utils/strings'

test('capitalize first letter', () => {
  // Random sentence
  expect(capitalizeFirstLetter('this is string')).toBe('This is string')
  // Single character
  expect(capitalizeFirstLetter('f')).toBe('F')
})

test('normalize string', () => {
  expect(normalizeString('Crême Brûlée Épatante')).toBe('creme brulee epatante')
  expect(normalizeString('Égypte')).toBe('egypte')
})

test('blur email', () => {
  // Null email
  expect(blurEmail(null)).toBeNull()
  // Normal email case
  const normalEmail = 'leroyjenkins69@yahoo.fr'
  expect(blurEmail(normalEmail, 5)).toBe('leroy******************')
  // Weirdly short email case
  const shortEmail = 'i@.i'
  expect(blurEmail(shortEmail, 5)).toBe('****')
})
