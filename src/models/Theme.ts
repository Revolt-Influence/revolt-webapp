import { palette } from '../utils/colors'

type PaletteColor = typeof palette.blue

export interface ITheme {
  primary: PaletteColor
  accent: PaletteColor
  breakpoints: string[]
}

const breakpoints = ['60em', '75em', '80em']

export { breakpoints }
