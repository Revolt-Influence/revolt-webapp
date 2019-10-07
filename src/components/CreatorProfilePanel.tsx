import React, { useRef } from 'react'
import styled from 'styled-components'
import { useOnClickOutside } from '../utils/hooks'
import CreatorProfile from './CreatorProfile'
import { shadow } from '../utils/styles'
import { palette } from '../utils/colors'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GetCreatorPanel } from '../__generated__/GetCreatorPanel'
import { CloseCreatorPanel } from '../__generated__/CloseCreatorPanel'

const closeSource = require('../images/icons/close.svg')

const Styles = styled.div`
  position: fixed;
  z-index: 100;
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
    position: absolute;
    z-index: 200;
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

export const GET_CREATOR_PANEL = gql`
  query GetCreatorPanel {
    creatorPanel @client {
      id
      isOpen
      creatorId
      collabId
    }
  }
`

export const OPEN_CREATOR_PANEL = gql`
  mutation OpenCreatorPanel($creatorId: String!, $collabId: String) {
    openCreatorPanel(creatorId: $creatorId, collabId: $collabId) @client {
      id
      isOpen
      creatorId
      collabId
    }
  }
`

const CLOSE_CREATOR_PANEL = gql`
  mutation CloseCreatorPanel {
    closeCreatorPanel @client {
      id
      isOpen
      creatorId
      collabId
    }
  }
`

const CreatorProfilePanel: React.FC<{}> = () => {
  // Get panel data
  const { data } = useQuery<GetCreatorPanel>(GET_CREATOR_PANEL)
  // Prepare close panel
  const [closePanel] = useMutation<CloseCreatorPanel>(CLOSE_CREATOR_PANEL)
  // const client = useApolloClient()

  // Handle close on click outside
  const selfRef = useRef()
  const handleClosePanel = () => {
    closePanel()
  }
  useOnClickOutside(selfRef, handleClosePanel)

  // Don't show panel if not open
  if (!data || !data.creatorPanel.isOpen) return null

  // Otherwise show panel
  return (
    <Styles ref={selfRef}>
      <button className="close" onClick={() => handleClosePanel()} type="button">
        <img src={closeSource} alt="close" />
      </button>
      <CreatorProfile
        creatorId={data.creatorPanel.creatorId}
        collabId={data.creatorPanel.collabId}
      />
    </Styles>
  )
}

export default CreatorProfilePanel
