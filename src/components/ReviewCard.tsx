import React from 'react'
import moment from 'moment'
import 'moment/locale/fr'
import approx from 'approximate-number'
import styled from 'styled-components'
import { Flex, Box } from '@rebass/grid'
import { IReview } from '../models/Review'
import { ICreator } from '../models/Creator'
import { shadow, setFont } from '../utils/styles'
import { palette } from '../utils/colors'
import ImageWrapper from './ImageWrapper'

moment.locale('fr')

const likeIcon = require('../images/icons/like.svg')
const commentIcon = require('../images/icons/comment.svg')

const Styles = styled(Box)`
  footer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-top: 0.8rem;
    .username {
      ${setFont(600, 'normal')}
    }
    .date {
      color: ${palette.grey._500};
    }
  }

  .statIcon {
    width: 1.8rem;
    height: 1.8rem;
    opacity: 0.8;
    margin-right: 0.5rem;
  }

  .status {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    background: rgba(255, 255, 255, 0.85);
    padding: 0 1rem;
    line-height: 3.5rem;
    border-radius: 8px;
    box-shadow: ${shadow._100};
    ${setFont(600, 'normal')}
  }
`

interface IReviewCardProps {
  review: IReview
}

const ReviewCard: React.FC<IReviewCardProps> = ({ review }) => {
  const { name } = review.creator as ICreator
  const showLabel = () => {
    switch (review.format) {
      case 'Youtube video':
        return (
          <div className="status">
            <p>Vidéo YouTube</p>
          </div>
        )
      default:
        return (
          <div className="status">
            <p>{review.format}</p>
          </div>
        )
    }
  }

  return (
    <a href={review.link} title={`view ${review.format}`} target="_blank" rel="noopener noreferrer">
      <Styles p={[0, 0, 0]} mt={[0, 0, 0]}>
        <ImageWrapper
          src={review.medias[0]}
          alt={`Revue de ${name}`}
          placeholderText="Revue non disponible"
          ratio={1}
          objectFit="cover"
          showLabel={showLabel}
        />
        <footer>
          <div>
            <p className="username">{name}</p>
            <p className="date">{moment(review.postDate).format('Do MMMM')}</p>
          </div>
          {review.format === 'Youtube video' && (
            <Flex flexDirection="row" alignItems="baseline">
              <Flex flexDirection="row" alignItems="center" mr="2rem">
                <img className="statIcon" src={likeIcon} alt="Likes" />
                <p>{approx(review.likes)}</p>
              </Flex>
              <Flex flexDirection="row" alignItems="center">
                <img className="statIcon" src={commentIcon} alt="Comments" />
                <p>{approx(review.comments)}</p>
              </Flex>
            </Flex>
          )}
        </footer>
      </Styles>
    </a>
  )
}

export default ReviewCard
