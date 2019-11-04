import styled, {
  keyframes,
  css,
  Interpolation,
  ThemeProps,
  FlattenSimpleInterpolation,
} from 'styled-components'
import { palette, hexToRGBA, paletteColorName } from './colors'
import { Theme } from '../components/CustomThemeProvider'

const nativeFontStack = "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
const fontStack = `Montserrat, Gotham, ${nativeFontStack}`

function setFont(
  weight: 500 | 600 = 500,
  size: 'small' | 'normal' | 'big' | 'huge'
): Interpolation<ThemeProps<Theme>> {
  return css`
    font-family: ${fontStack};
    font-weight: ${weight};
    font-size: ${desktopTypeScale[size]};
    @media screen and (max-width: ${props => (props.theme as Theme).breakpoints[0]}) {
      font-size: ${mobileTypeScale[size]};
    }
  `
}

const fadeAnimation = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0.5;
  }
`

const shadow = {
  _100: '0 1px 4px 0 rgba(0,0,0,0.06)',
  _200: '0 2px 6px 0 rgba(0,0,0,0.15)',
  _300: '0 4px 6px 0 rgba(50,50,50,0.18)',
  _400: '0 4px 6px 0 rgba(50,50,50,0.25)',
  _500: '0 6px 12px 0 rgba(50,50,50,0.35)',
  _600: '0 15px 35px rgba(50,50,93,.1), 0 5px 15px rgba(0,0,0,.07)',
  inset: 'inset 0 1px 4px 0 rgba(51,51,51,0.18)',
}

const mobileTypeScale = {
  small: '1.3rem',
  normal: '1.6rem',
  big: '1.9rem',
  huge: '2.6rem',
}

const desktopTypeScale = {
  small: '1.2rem',
  normal: '1.6rem',
  big: '2rem',
  huge: '3.2rem',
}

interface IOutlineOptions {
  isBold?: boolean
  isLight?: boolean
}

function setOutline(
  color: paletteColorName,
  options?: IOutlineOptions
): FlattenSimpleInterpolation {
  // Default options to false
  const isBold = (options && options.isBold) || false
  const isLight = (options && options.isLight) || false
  const getOpacity = (opacity: number): number => {
    if (isBold) return opacity * 2
    if (isLight) return opacity / 2
    return opacity
  }
  return css`
    outline: none;
    outline-offset: -2px;
    border-color: ${hexToRGBA(palette[color]._500, getOpacity(0.5))};
    box-shadow: inset 0 1px 2px ${hexToRGBA(palette[color]._500, getOpacity(0.075))},
      0 0 0 0.2em ${hexToRGBA(palette[color]._500, getOpacity(0.3))};
  `
}

function removeInputOutline(): FlattenSimpleInterpolation {
  return css`
    outline: none;
    outline-offset: -2px;
    border-color: inherit;
    box-shadow: none;
  `
}

const DarkOverlay = styled.div`
  position: fixed;
  z-index: 300;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: ${hexToRGBA(palette.grey._900, 0.5)};
`

const PopupBox = styled.div`
  z-index: 400;
  position: fixed;
  top: 50%;
  left: 50%;
  width: 700px;
  transform: translate(-50%, -50%);
  background: ${palette.grey._50};
  border-radius: 8px;
  box-shadow: ${shadow._600};
`

interface IDividerProps {
  color?: string
  transparent?: boolean
  small?: boolean
}

const Divider = styled('div')`
  margin: ${(props: IDividerProps) => (props.small ? '10px 0' : '30px 0')};
  width: 100%;
  height: 4px;
  opacity: ${(props: IDividerProps) => (props.transparent ? 0 : 1)};
  background: ${(props: IDividerProps) => props.color || palette.grey._200};
  border-radius: 2px;
`

const SmallIcon = styled.img`
  width: 20px;
  height: 20px;
  transform: translateY(5px);
`

const SectionTitle = styled.h2`
  margin-top: 25px;
  margin-bottom: 15px;
  padding: 0 10px;
  ${setFont(600, 'big')}
`

function remsToPixels(rems: string): number {
  const pixels = parseFloat(rems) * parseFloat(desktopTypeScale.normal) * 10
  return pixels
}

export {
  setFont,
  desktopTypeScale,
  fadeAnimation,
  shadow,
  setOutline,
  removeInputOutline,
  PopupBox,
  DarkOverlay,
  fontStack,
  Divider,
  SmallIcon,
  SectionTitle,
  nativeFontStack,
  remsToPixels,
}
