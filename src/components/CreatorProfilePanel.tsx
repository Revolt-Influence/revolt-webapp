import React, { useRef } from 'react'
import styled from 'styled-components'
import { useOnClickOutside } from '../utils/hooks'
import CreatorProfile from './CreatorProfile'
import { shadow } from '../utils/styles'
import { palette } from '../utils/colors'

const closeSource = require('../images/icons/close.svg')

const Styles = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  background: ${palette.grey._50};
  height: 100vh;
  width: 600px;
  padding: 2rem;
  max-width: 100vw;
  box-shadow: ${shadow._600};
  overflow-y: scroll;

  button.close {
    z-index: 300;
    position: absolute;
    top: 2rem;
    right: 2rem;
    background: ${palette.grey._200};
    width: 32px;
    height: 32px;
    padding: 9px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    transition: 0.3s background ease-in-out;
    &:hover {
      background: ${palette.grey._300};
    }
    > img {
      width: 24px;
      height: 24px;
    }
  }
`

interface ICreatorProfilePanelProps {
  creatorId: string
  collabId: string
}

const CreatorProfilePanel: React.FC<ICreatorProfilePanelProps> = ({ creatorId, collabId }) => {
  const selfRef = useRef()
  const hidePanel = () => {
    console.log('hide creator')
  }
  useOnClickOutside(selfRef, hidePanel)
  return (
    <Styles ref={selfRef}>
      <button className="close" onClick={() => hidePanel()} type="button">
        <img src={closeSource} alt="fermer" />
      </button>
      <CreatorProfile creatorId={creatorId} collabId={collabId} />
    </Styles>
  )
}

export default CreatorProfilePanel
