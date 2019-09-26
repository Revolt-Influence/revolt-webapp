import React from 'react'
import approx from 'approximate-number'
import styled from 'styled-components'
import { Flex, Box } from '@rebass/grid'
import { IInstagramPost } from '../models/InstagramPost'
import { palette } from '../utils/colors'
import { shadow } from '../utils/styles'

const likeIcon = require('../images/icons/like.svg')
const viewsIcon = require('../images/icons/playOutlineBlack.svg')
const commentIcon = require('../images/icons/comment.svg')

const Style = styled.a`
  display: block;
  background: ${palette.grey._50};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: ${shadow._200};

  img.postImage {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const StatIcon = styled.img`
  width: 1.8rem;
  height: 1.8rem;
  opacity: 0.8;
  margin-right: 0.5rem;
`

interface IInstagramPostProps {
  post: IInstagramPost
}

const InstagramPost: React.FC<IInstagramPostProps> = ({
  post: { postLink, imageLink, comments, likes, format, views },
}) => (
  <Box width={[6 / 12, 4 / 12, 4 / 12]} px="0.5rem" mb="1rem">
    <Style href={postLink} target="_link">
      <img className="postImage" src={imageLink} alt="Instagram post" />
      <Flex
        justifyContent="space-evenly"
        mt="-2px"
        mb="3px"
        mx="auto"
        style={{ maxWidth: '200px' }}
      >
        <Flex flexDirection="row" alignItems="center">
          <StatIcon src={format === 'photo' ? likeIcon : viewsIcon} alt="Likes" />
          <p>{approx(format === 'photo' ? likes : views)}</p>
        </Flex>
        <Flex flexDirection="row" alignItems="center">
          <StatIcon src={commentIcon} alt="Comments" />
          <p>{approx(comments)}</p>
        </Flex>
      </Flex>
    </Style>
  </Box>
)

export default InstagramPost
