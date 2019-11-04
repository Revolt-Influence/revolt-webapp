import React, { useEffect } from 'react'
import moment, { Moment } from 'moment'
import { Flex, Box } from '@rebass/grid'
import {
  GetCampaignReviews_campaign_reviews,
  GetCampaignReviews_campaign_collabs,
} from '../__generated__/GetCampaignReviews'
import { dummyReview, dummyReviewCollab, dummyCreator } from '../utils/dummyData'
import { SubTitle } from '../styles/Text'
import { palette } from '../utils/colors'
import styled from 'styled-components'
import { setFont, shadow } from '../utils/styles'
import YoutubeVideo from './YoutubeVideo'
import InfoCard from './InfoCard'
import { OpenCreatorPanel, OpenCreatorPanelVariables } from '../__generated__/OpenCreatorPanel'
import { useMutation } from '@apollo/react-hooks'
import { OPEN_CREATOR_PANEL } from './CreatorProfilePanel'
import { GetCreator, GetCreatorVariables } from '../__generated__/GetCreator'
import { GET_CREATOR } from './CreatorProfile'
import { CreatorStatus } from '../__generated__/globalTypes'
import { GetYoutuber, GetYoutuberVariables } from '../__generated__/GetYoutuber'
import { GET_YOUTUBER } from './YoutubePreview'

const RADIUS = '8px'

const Styles = styled.section`
  table.reviewsTable {
    position: relative;
    display: block;
    border-radius: 10px;
    border: 2px solid ${palette.blue._200};
    overflow-x: scroll;
    white-space: nowrap;
    thead {
      display: block;
      padding: 1rem;
      text-transform: uppercase;
      background: ${palette.blue._100};
      color: ${palette.blue._900};
      letter-spacing: 0.05rem;
      border-bottom: 2px solid ${palette.blue._200};
      border-top-left-radius: ${RADIUS};
      border-top-right-radius: ${RADIUS};
      ${setFont(600, 'small')}
      tr {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        th {
          padding: 0 1rem;
          text-align: left;
          &.metric {
            text-align: right;
            width: 12rem;
          }
          &.video {
            width: 30rem;
          }
          &.author {
            flex: 1;
          }
        }
      }
    }
    tbody {
      display: block;
      align-items: center;
      border-top-left-radius: ${RADIUS};
      border-top-right-radius: ${RADIUS};
      tr {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        &:not(:last-child) {
          border-bottom: 2px solid ${palette.blue._200};
        }
        padding: 1rem;
        td {
          padding: 0 1rem;
          align-self: center;
          &.video {
            width: 30rem;
          }
          &.author {
            flex: 1;
            button {
              display: flex;
              align-items: center;
              border-radius: 8px;
              &:hover {
                background: ${palette.blue._100};
                padding: 0.5rem 1rem;
                /* Compensate padding */
                margin-left: -1rem;
                margin-right: -0.5rem;
              }
              .name {
                ${setFont(600, 'normal')}
              }
              .avatar {
                width: 5rem;
                height: 5rem;
                border-radius: 50%;
                margin-right: 1rem;
                box-shadow: ${shadow.inset};
                object-fit: cover;
              }
            }
          }
          &.metric {
            text-align: right;
            width: 12rem;
          }
        }
      }
    }
  }
`

interface Props {
  reviews: GetCampaignReviews_campaign_reviews[]
  collabs: GetCampaignReviews_campaign_collabs[]
  lastStatsDate: Moment
}

const ReviewsStatsTable: React.FC<Props> = ({ lastStatsDate, reviews, collabs }) => {
  const formatNumber = (num: number) => new Intl.NumberFormat().format(num)

  // Prepare open creator profile panel
  const [openCreatorPanel, { client }] = useMutation<OpenCreatorPanel, OpenCreatorPanelVariables>(
    OPEN_CREATOR_PANEL
  )

  useEffect(() => {
    if (reviews.length === 0) {
      // Dummy creator data for if user opens creator panel on dummy review
      client.writeQuery<GetCreator, GetCreatorVariables>({
        query: GET_CREATOR,
        variables: { creatorId: dummyCreator._id },
        data: {
          creator: {
            ...dummyCreator,
            status: CreatorStatus.VERIFIED,
          },
        },
      })
      // Youtuber query
      client.writeQuery<GetYoutuber, GetYoutuberVariables>({
        query: GET_YOUTUBER,
        variables: { youtuberId: dummyCreator.youtube._id },
        data: {
          youtuber: dummyCreator.youtube,
        },
      })
    }
  }, [client, reviews.length])

  const handleShowProfile = (creatorId: string, reviewId: string, isDummy = false) => {
    const relevantCollab = isDummy
      ? dummyReviewCollab
      : collabs.find(_collab => _collab.review._id === reviewId)
    openCreatorPanel({
      variables: { creatorId, isDummy, ...(!isDummy && { collabId: relevantCollab._id }) },
    })
  }

  const showReviewRow = (review: GetCampaignReviews_campaign_reviews, isDummy = false) => {
    const lastStats = review.stats[0]
    const collab = isDummy
      ? dummyReviewCollab
      : collabs.find(_collab => _collab.review._id === review._id)
    return (
      <tr key={review._id}>
        <td className="video">
          <YoutubeVideo videoId={review.platformId} />
        </td>
        <td className="author">
          <button onClick={() => handleShowProfile(review.creator._id, review._id, isDummy)}>
            <img src={review.creator.picture} alt={review.creator.name} className="avatar" />
            <p className="name">{review.creator.name}</p>
          </button>
        </td>
        <td className="metric">{formatNumber(lastStats.viewCount)}</td>
        <td className="metric">{formatNumber(lastStats.likeCount)}</td>
        <td className="metric">{formatNumber(lastStats.commentCount)}</td>
        <td className="metric">{formatNumber(lastStats.linkClicksCount)}</td>
        <td className="metric">${formatNumber(collab.quote)}</td>
      </tr>
    )
  }

  return (
    <Styles>
      {/* Header */}
      <Flex
        flexDirection="row"
        alignItems="baseline"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        <SubTitle>Performance per video</SubTitle>
        <p style={{ color: palette.grey._600 }}>Last updated {moment(lastStatsDate).fromNow()}</p>
      </Flex>
      {/* Actual table */}
      {reviews.length === 0 && (
        <Box mb="1rem">
          <InfoCard
            noMargin
            message="You don't have any review yet. Here is what a review will look like"
          />
        </Box>
      )}
      <table className="reviewsTable">
        {/* Table header */}
        <thead>
          <tr>
            <th className="video">Review video</th>
            <th className="author">Author</th>
            <th className="metric">Views</th>
            <th className="metric">Likes</th>
            <th className="metric">Comments</th>
            <th className="metric">Clicks</th>
            <th className="metric">Quote</th>
          </tr>
        </thead>
        {/* Table content */}
        <tbody>
          {reviews.length > 0
            ? reviews.map(_review => showReviewRow(_review))
            : showReviewRow(dummyReview, true)}
        </tbody>
      </table>
    </Styles>
  )
}

export default ReviewsStatsTable
