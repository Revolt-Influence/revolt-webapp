import React, { useState } from 'react'
import styled from 'styled-components'
import { palette } from '../utils/colors'
import { Box } from '@rebass/grid'
import { SubTitle } from '../styles/Text'
import { MainButton } from '../styles/Button'

const closeSource = require('../images/icons/close.svg')

const Styles = styled(Box)`
  position: relative;
  background: ${palette.blue._100};
  border: 2px solid ${palette.blue._200};
  color: ${palette.blue._900};
  border-radius: 8px;
  padding: 2rem;
  button.close {
    position: absolute;
    z-index: 200;
    top: 1rem;
    right: 1rem;
    background: ${palette.blue._200};
    width: 3rem;
    height: 3rem;
    padding: 0.9rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    transition: 0.3s background ease-in-out;
    &:hover {
      background: ${palette.blue._300};
    }
    > img {
      width: 2.4rem;
      height: 2.4rem;
    }
  }
`

interface Props {
  title: string
  description: string
  buttonText: string
  handleClick: () => any
}

const Banner: React.FC<Props> = ({ title, description, buttonText, handleClick }) => {
  const [isShown, setIsShown] = useState(true)

  if (!isShown) return null

  return (
    <Styles>
      <button className="close" type="button" onClick={() => setIsShown(false)}>
        <img src={closeSource} alt="close" />
      </button>
      <SubTitle noMargin style={{ paddingRight: '4rem' }}>
        {title}
      </SubTitle>
      <Box mt="1.5rem">{description}</Box>
      <MainButton
        style={{ color: palette.blue._700, border: `2px solid ${palette.blue._700}` }}
        inverted
        onClick={() => handleClick()}
      >
        {buttonText}
      </MainButton>
    </Styles>
  )
}

export default Banner
