import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import { palette } from '../utils/colors'
import { fadeAnimation, setFont, nativeFontStack } from '../utils/styles'

const BoldText = styled.span`
  font-weight: 600;
`

const BlueText = styled.span`
  color: ${palette.blue._600};
`

interface TextProps {
  color?: 'blue' | 'pink'
  bold?: boolean
}
const Text = styled.span<TextProps>`
  color: ${props => {
    switch (props.color) {
      case 'blue':
        return palette.blue._600
      case 'pink':
        return palette.pink._600
      default:
        return palette.grey._900
    }
  }};
  ${props => (props.bold ? setFont(600, 'normal') : null)}
`

interface IFakeTextProps {
  size: 'small' | 'normal'
}

const FakeText = styled.div`
  display: inline-block;
  width: ${(props: IFakeTextProps) => {
    switch (props.size) {
      case 'small':
        return '30px'
      case 'normal':
        return '50px'
      default:
        return '50px'
    }
  }};
  height: 16px;
  margin-right: 10px;
  margin-top: 7px;
  margin-bottom: 7px;
  background: ${palette.grey._300};
  border-radius: 8px;
  animation: ${fadeAnimation} 0.5s alternate ease-in-out infinite;
`

const TinyText = styled.p`
  display: block;
  line-height: 20px;
  opacity: 0.8;
  ${setFont(600, 'small')}
  font-family: ${nativeFontStack};
`

const LabelText = styled.p<{ grey?: boolean; withMargin?: boolean }>`
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${props => (props.grey ? palette.grey._600 : palette.blue._600)};
  ${props =>
    props.withMargin &&
    css`
      margin-top: 2rem;
    `}
  ${setFont(600, 'small')}
`

const BlueLink = styled(Link)`
  color: ${palette.blue._600};
  transition: 0.3s all ease-in-out;
  &:hover {
    color: ${palette.blue._700};
  }
`

interface ITitleProps {
  isCentered?: boolean
  noMargin?: boolean
  smallerOnMobile?: boolean
}

const Title = styled.h1<ITitleProps>`
  margin-top: ${props => (props.noMargin ? '0' : '2.5rem')};
  margin-bottom: ${props => (props.noMargin ? '0' : '2.7rem')};
  text-align: ${props => (props.isCentered ? 'center' : 'inherit')};
  line-height: 1em;
  @media screen and (max-width: ${props => props.theme.breakpoints[0]}) {
    line-height: 1.1em;
    ${props => {
      if (props.smallerOnMobile) {
        return css`
          margin-top: ${props.noMargin ? '0' : '2.2rem'};
          margin-bottom: ${props.noMargin ? '0' : '2.3rem'};
          text-align: ${props.isCentered ? 'center' : 'inherit'};
        `
      }
    }}
  }
`

const SubTitle = styled.h3<ITitleProps>`
  margin-top: ${props => (props.noMargin ? '0' : '1rem')};
  margin-bottom: ${props => (props.noMargin ? '0' : '1.1rem')};
  text-align: ${props => (props.isCentered ? 'center' : 'inherit')};
  line-height: 1em;
  ${setFont(600, 'big')}
`

export { BoldText, BlueText, FakeText, TinyText, LabelText, BlueLink, Title, SubTitle, Text }
