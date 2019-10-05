import React from 'react'
import styled, { css } from 'styled-components'
import { palette } from '../utils/colors'
import { setFont } from '../utils/styles'

const logoSource = require('../images/logos/logo_light.svg')

interface IStylesProps {
  fullScreen?: boolean
}

const Styles = styled.div`
  width: 100vw;
  background: ${palette.grey._50};
  ${(props: IStylesProps) => {
    if (props.fullScreen) {
      // Fill whole page
      return css`
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
      `
    }
    // Fill available space
    return css`
      height: calc(100vh - 86px);
    `
  }}
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 240px;
    height: auto;
    display: block;
    margin-top: -20px;
    margin-bottom: 30px;
  }

  p {
    color: ${palette.grey._900};
    ${setFont(500, 'normal')}
  }
`

interface ILoaderProps {
  fullScreen?: boolean
}

const Loader: React.FC<ILoaderProps> = ({ fullScreen }) => (
  <Styles fullScreen={fullScreen}>
    <img src={logoSource} alt="Revolt Gaming" />
    <p>One moment...</p>
  </Styles>
)

export default Loader
