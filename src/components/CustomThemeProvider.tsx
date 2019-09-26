import React from 'react'
import { ThemeProvider } from 'styled-components'
import { palette } from '../utils/colors'
import { ITheme, breakpoints } from '../models/Theme'

interface IProps {
  children: React.ReactChild
}

const CustomThemeProvider: React.FC<IProps> = ({ children }) => {
  // Check if user is a brand or an influencer
  const getThemes = () => ({ primary: palette.pink, accent: palette.blue })
  // Select theme based on user type
  const theme: ITheme = {
    ...getThemes(),
    // Default: breakpoints: ['40em', '52em', '64em'],
    breakpoints,
  }

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default CustomThemeProvider
