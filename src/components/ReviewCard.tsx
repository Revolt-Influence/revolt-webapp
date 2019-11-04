import { Box, Flex } from '@rebass/grid'
import approx from 'approximate-number'
import moment from 'moment'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { palette } from '../utils/colors'
import { setFont, shadow } from '../utils/styles'
import { GetCampaignReviews_campaign_reviews } from '../__generated__/GetCampaignReviews'
import { ReviewFormat } from '../__generated__/globalTypes'
import { getYoutubeEmbedLink, getVideoId } from '../utils/youtube'

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

  iframe {
    box-shadow: ${shadow._200};
    border-radius: 8px;
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
  review: GetCampaignReviews_campaign_reviews
}

const ReviewCard: React.FC<IReviewCardProps> = ({ review }) => {
  const getIframeUrl = () => {
    if (review.format === ReviewFormat.YOUTUBE_VIDEO) {
      const videoId = getVideoId(review.link)
      return getYoutubeEmbedLink(videoId)
    }
    return null
  }
  const iframeUrl = getIframeUrl()

  const [frameWidth, setFrameWidth] = useState(0)
  const measuredRef = useCallback((node: HTMLElement) => {
    if (node != null) {
      setFrameWidth(node.offsetWidth)
    }
  }, [])

  const lastStats = review.stats[0]

  return (
    <a href={review.link} title={`view ${review.format}`} target="_blank" rel="noopener noreferrer">
      <Styles p={[0, 0, 0]} mt={[0, 0, 0]} ref={measuredRef}>
        {iframeUrl ? (
          <iframe
            title={review.link}
            src={iframeUrl}
            width={`${frameWidth}px`}
            height={`${(frameWidth * 9) / 16}px`}
          />
        ) : (
          <p>Could not preview the review</p>
        )}
        <footer>
          <div>
            <p className="username">{review.creator.name}</p>
            <p className="date">{moment(review.createdAt).format('Do MMMM')}</p>
          </div>
          {review.format === ReviewFormat.YOUTUBE_VIDEO && (
            <Flex flexDirection="row" alignItems="baseline">
              <Flex flexDirection="row" alignItems="center" mr="2rem">
                <img className="statIcon" src={likeIcon} alt="Likes" />
                <p>{approx(lastStats.likeCount)}</p>
              </Flex>
              <Flex flexDirection="row" alignItems="center">
                <img className="statIcon" src={commentIcon} alt="Comments" />
                <p>{approx(lastStats.commentCount)}</p>
              </Flex>
            </Flex>
          )}
        </footer>
      </Styles>
    </a>
  )
}

export default ReviewCard
