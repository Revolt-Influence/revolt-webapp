import React, { useEffect, useCallback } from 'react'
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
import { getInstagramPostData } from '../utils/crawler'
import { useDispatch } from 'react-redux'
import { updateInstagramReview } from '../actions/collabs'

moment.locale('fr')

// TODO: restore 5 days
const REVIEW_CACHE_DURATION = 1 * 24 * 60 * 60 * 1000 // 1 day

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
      case 'Instagram post':
        return (
          <div className="status">
            <p>Post instagram</p>
          </div>
        )
      case 'Instagram story':
        return (
          <div className="status">
            <p>Story instagram</p>
          </div>
        )
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
  const dispatch = useDispatch()

  const updatePosts = useCallback(async () => {
    // Get post page source code
    const postData = await getInstagramPostData(review.link)
    // Send post data to server who will extract and save posts
    dispatch(
      updateInstagramReview({
        reviewId: review._id,
        postData,
        creatorId: review.creator as string,
      })
    )
  }, [dispatch, review._id, review.creator, review.link])

  // Auto update review
  useEffect(() => {
    const needsRefresh =
      review.format === 'Instagram post' &&
      Date.now() > review.lastUpdateDate + REVIEW_CACHE_DURATION
    if (needsRefresh) {
      updatePosts()
    }
  }, [review.format, review.lastUpdateDate, updatePosts])

  return (
    <a href={review.link} title={`view ${review.format}`} target="_blank" rel="noopener noreferrer">
      <Styles p={[0, 0, 0]} mt={[0, 0, 0]}>
        <ImageWrapper
          src={review.medias[0]}
          alt={`Revue de ${name}`}
          placeholderText="Revue non disponible"
          ratio={1}
          objectFit={review.format === 'Instagram story' ? 'contain' : 'cover'}
          showLabel={showLabel}
        />
        <footer>
          <div>
            <p className="username">{name}</p>
            <p className="date">{moment(review.postDate).format('Do MMMM')}</p>
          </div>
          {(review.format === 'Instagram post' || review.format === 'Youtube video') && (
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
