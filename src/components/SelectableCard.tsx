import React, { useRef } from 'react'
import styled, { css } from 'styled-components'
import { setFont, shadow, remsToPixels } from '../utils/styles'
import { truncateString } from '../utils/strings'
import { palette } from '../utils/colors'
import { Flex, Box } from '@rebass/grid'
import { applyCloudinaryTransformations } from '../utils/images'
import { Link } from 'react-router-dom'
import { useRect } from '../utils/hooks'

const PICTURE_SIZE = '6rem'

interface StyledProps {
  selected: boolean
  pixelsWidth: number
}

const StyledLink = styled(Link)<StyledProps>`
  display: block;
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
  padding: 1rem;
  width: 100%;
  border-radius: 8px;
  transition: 0.05s all ease-in-out;
  ${props =>
    props.selected
      ? css`
          background: ${palette.blue._200};
        `
      : css`
          &:hover {
            background: ${palette.blue._100};
          }
        `}
  .picture {
    align-self: flex-start;
    flex-shrink: 0;
    width: ${PICTURE_SIZE};
    height: ${PICTURE_SIZE};
    border-radius: 50%;
    box-shadow: ${shadow.inset};
    object-fit: contain;
  }
  .title {
    ${setFont(600, 'normal')}
    ${props => truncateString(`${props.pixelsWidth}px`)}
  }
  .description {
    color: ${palette.grey._600};
    ${props => truncateString(`${props.pixelsWidth}px`)}
  }
`

interface Props {
  picture: string // URL
  title: string
  description: string
  handleClick?: () => any
  selected: boolean
  linkTo?: string
}

/**
 *
 * @description Acts as a button or a link depending on props
 */
const SelectableCard: React.FC<Props> = ({
  picture,
  title,
  description,
  handleClick,
  selected,
  linkTo,
}) => {
  const selfRef = useRef(null)
  const box = useRect(selfRef)
  const availablePixelsWidth = box.width - remsToPixels(PICTURE_SIZE)

  const showContents = () => (
    <Flex flexDirection="row" alignItems="center" ref={selfRef}>
      <img
        src={applyCloudinaryTransformations(picture, {
          width: 100,
        })}
        alt={title}
        className="picture"
      />
      <Box ml="1rem">
        <p className="title">{title}</p>
        <p className="description">{description}</p>
      </Box>
    </Flex>
  )

  // Check if button or link
  if (linkTo) {
    return (
      <StyledLink selected={selected} pixelsWidth={availablePixelsWidth} to={linkTo}>
        {showContents()}
      </StyledLink>
    )
  } else {
    // Otherwise is a button
    return (
      <StyledLink
        as="button"
        to="/" // Only to make Typescript happy, not used since it's a button
        selected={selected}
        pixelsWidth={availablePixelsWidth}
        onClick={handleClick}
        type="button"
      >
        {showContents()}
      </StyledLink>
    )
  }
}

export default SelectableCard
