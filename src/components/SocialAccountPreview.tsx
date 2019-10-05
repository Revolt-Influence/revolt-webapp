import React from 'react'
import styled from 'styled-components'
import { Flex } from '@rebass/grid'
import { palette } from '../utils/colors'
import { setFont } from '../utils/styles'
import { IconButtonWrapper } from '../styles/Icon'

const arrowSource = require('../images/icons/arrowDown.svg')

const Styles = styled.div<{ isOpen: boolean }>`
  border-radius: 8px;
  background: ${palette.grey._200};
  .logo {
    margin-right: 1.5rem;
    width: 4rem;
    height: 4rem;
    object-fit: contain;
  }
  .username {
    ${setFont(600, 'normal')}
  }
  .stats {
    color: ${palette.grey._600};
  }
`

interface ISocialAccountPreviewProps {
  children: React.ReactChild
  logo: any
  network: string
  username: string
  stats: string
}

const SocialAccountPreview: React.FC<ISocialAccountPreviewProps> = ({
  children,
  logo,
  network,
  username,
  stats,
}) => {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <Styles isOpen={isOpen}>
      <Flex
        flexDirection="row"
        justifyContent="space-between"
        as="button"
        alignItems="center"
        onClick={() => setIsOpen(!isOpen)}
        width={1}
        p="1.5rem"
      >
        <Flex flexDirection="row" justifyContent="flex-start" alignItems="center">
          <img src={logo} className="logo" alt={network} />
          <div>
            <p className="username">{username}</p>
            <p className="stats">{stats}</p>
          </div>
        </Flex>
        <IconButtonWrapper as="div">
          <img
            src={arrowSource}
            alt={isOpen ? 'close' : 'open'}
            style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }}
          />
        </IconButtonWrapper>
      </Flex>
      {isOpen && <div>{children}</div>}
    </Styles>
  )
}

export default SocialAccountPreview
