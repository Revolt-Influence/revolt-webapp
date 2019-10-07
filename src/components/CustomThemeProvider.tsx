import React from 'react'
import { ThemeProvider } from 'styled-components'
import { palette } from '../utils/colors'

interface IProps {
  children: React.ReactChild
}

type PaletteColor = typeof palette.blue
export interface Theme {
  primary: PaletteColor
  accent: PaletteColor
  breakpoints: string[]
}

export const breakpoints = ['50em', '60em', '75em']
// export const breakpoints = ['60em', '75em', '80em']

const CustomThemeProvider: React.FC<IProps> = ({ children }) => {
  // Check if user is a brand or an influencer
  const getThemes = () => ({ primary: palette.blue, accent: palette.pink })
  // Select theme based on user type
  const theme: Theme = {
    ...getThemes(),
    // Default: breakpoints: ['40em', '52em', '64em'],
    breakpoints,
  }

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default CustomThemeProvider
