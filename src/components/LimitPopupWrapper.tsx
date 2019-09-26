import React from 'react'
import ScrollLock from 'react-scrolllock'
import styled from 'styled-components'
import { Row, Col } from '../utils/grid'
import { DarkOverlay, PopupBox } from '../utils/styles'
import { palette } from '../utils/colors'
import { useDispatch } from 'react-redux'
import { closeLimitPopup } from '../actions/display'

const portraitSource = require('../images/photos/juliette.png')
const close = require('../images/icons/close.svg')

const Aside = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  background: ${palette.grey._200};
  border-bottom-right-radius: 4px;
  border-top-right-radius: 4px;
`

const Frame = styled.div`
  position: relative;
  width: 100%;
  min-height: 248px;
`

const Bio = styled.p`
  position: absolute;
  bottom: 20px;
  left: 10px;
  background: ${palette.grey._200};
  color: ${palette.blue._600};
  padding: 3px 6px;
`

const Portrait = styled.img`
  width: 100%;
  height: 360px;
  object-fit: cover;
  border-top-right-radius: 4px;
`

const Quote = styled.div`
  padding: 25px;
  line-height: 25px;
`

const CloseButton = styled.button`
  z-index: 300;
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255, 255, 255, 0.8);
  width: 32px;
  height: 32px;
  padding: 9px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  > img {
    width: 25px;
    height: 25px;
  }
`

interface ILimitPopupWrapperProps {
  children: React.ReactChild
}

const LimitPopupWrapper: React.FC<ILimitPopupWrapperProps> = ({ children }) => {
  const dispatch = useDispatch()
  return (
    <DarkOverlay onClick={() => dispatch(closeLimitPopup())}>
      <ScrollLock />
      <PopupBox onClick={e => e.stopPropagation()}>
        <Row>
          <Col size={7 / 12}>{children}</Col>
          <Col size={5 / 12}>
            <Aside>
              <CloseButton onClick={closeLimitPopup}>
                <img src={close} alt="Fermer" />
              </CloseButton>
              <Frame>
                <Portrait src={portraitSource} alt="Juliette" />
                <Bio>Juliette, CEO @Wissew</Bio>
              </Frame>
              <Quote>
                « Revolt m'a permis de faire des partenariats de qualité, ce qui a grandement
                contribué au succès de ma marketplace »
              </Quote>
            </Aside>
          </Col>
        </Row>
      </PopupBox>
    </DarkOverlay>
  )
}

export default LimitPopupWrapper
