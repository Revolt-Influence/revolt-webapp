import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Box, Flex } from '@rebass/grid'
import approx from 'approximate-number'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { ContainerBox } from '../styles/grid'
import { palette } from '../utils/colors'
import { setFont } from '../utils/styles'
import {
  GetCampaignReviews,
  GetCampaignReviewsVariables,
} from '../__generated__/GetCampaignReviews'
import ErrorBoundary from './ErrorBoundary'
import ErrorCard from './ErrorCard'
import Loader from './Loader'
import ReviewCard from './ReviewCard'
import InfoCard from './InfoCard'
import { dummyReview } from '../utils/dummyData'
import { CollabStatus } from '../__generated__/globalTypes'
import { PLATFORM_COMMISSION_PERCENTAGE } from './ReviewCollabRequest'
import moment from 'moment'

const Stats = styled(Box)`
  background: ${palette.blue._100};
  border-radius: 8px;
  .stat {
    text-align: center;
    .figure {
      color: ${palette.blue._500};
      text-align: center;
      margin-bottom: 8px;
      ${setFont(600, 'huge')}
    }
    .legend {
      margin-bottom: 1rem;
    }
  }
`

const GET_CAMPAIGN_REVIEWS = gql`
  query GetCampaignReviews($campaignId: String!) {
    campaign(id: $campaignId) {
      _id
      collabs {
        _id
        status
        quote
      }
      reviews {
        _id
        format
        stats {
          _id
          createdAt
          commentCount
          likeCount
          viewCount
          linkClicksCount
        }
        createdAt
        link
        creator {
          _id
          name
        }
      }
    }
  }
`

interface Props {
  campaignId: string
}

const CampaignReviews: React.FC<Props> = ({ campaignId }) => {
  const { data: { campaign } = { campaign: null }, loading, error } = useQuery<
    GetCampaignReviews,
    GetCampaignReviewsVariables
  >(GET_CAMPAIGN_REVIEWS, { variables: { campaignId } })
  if (loading) {
    return <Loader />
  }
  if (error) {
    return <ErrorCard />
  }
  const { reviews, collabs } = campaign

  const totalSpentBudget = collabs
    .filter(_collab => _collab.status === CollabStatus.DONE)
    .reduce(
      (quotesSum, _collab) =>
        quotesSum + _collab.quote * ((100 + PLATFORM_COMMISSION_PERCENTAGE) / 100),
      0
    )
  const lastStats = reviews.map(_review => _review.stats[0])
  const totalLikes = lastStats.reduce((total, _stats) => total + (_stats.likeCount || 0), 0)
  const totalComments = lastStats.reduce((total, _stats) => total + (_stats.commentCount || 0), 0)
  const totalClicks = lastStats.reduce((total, _stats) => total + (_stats.linkClicksCount || 0), 0)
  const totalViews = lastStats.reduce((total, _stats) => total + (_stats.viewCount || 0), 0)
  const earnedMediaValue = (totalLikes + totalComments) * 0.3

  const stats = [
    {
      name: reviews.length > 1 ? 'Reviews' : 'Review',
      value: reviews.length,
    },
    {
      name: 'Views',
      value: approx(totalViews),
    },
    {
      name: 'Likes',
      value: approx(totalLikes),
    },
    {
      name: 'Comments',
      value: approx(totalComments),
    },
    {
      name: 'Clicks',
      value: approx(totalClicks),
    },
    {
      name: 'Budget spent',
      value: `$${approx(totalSpentBudget)}`,
    },
    {
      name: 'Earned media value',
      value: `$${approx(earnedMediaValue)}`,
    },
  ]

  return (
    <ContainerBox>
      <ErrorBoundary message="Could not load reviews">
        <>
          <Stats pt="0.1rem" mt={['2rem', '2rem', '2rem']}>
            <Flex
              justifyContent="space-around"
              alignItems="center"
              mt="2rem"
              flexWrap={['wrap', 'nowrap', 'nowrap']}
            >
              {stats.map(_stat => (
                <Box flex={1} width={[6 / 12, 1, 1]} key={_stat.name} className="stat">
                  <p className="figure">{_stat.value}</p>
                  <p className="legend">{_stat.name}</p>
                </Box>
              ))}
            </Flex>
          </Stats>
          {reviews.length === 0 && (
            <InfoCard message="You don't have any reviews of your game yet. Here is what a review will look like:" />
          )}
          <Box my="1rem">
            The review stats were last updated{' '}
            {moment(lastStats.length > 0 ? lastStats[0].createdAt : new Date()).fromNow()}
          </Box>
          <Flex
            flexDirection="row"
            justifyContent="flex-start"
            flexWrap="wrap"
            alignItems="flex-start"
            mx="-2rem"
          >
            {reviews.length === 0 && (
              <Box width={[1, 6 / 12, 4 / 12]} px="2rem" mb="2rem">
                <ReviewCard review={dummyReview} />
              </Box>
            )}
            {reviews.map((_review, index) => (
              <Box width={[1, 6 / 12, 4 / 12]} px="2rem" mb="2rem" key={index}>
                <ReviewCard review={_review} />
              </Box>
            ))}
          </Flex>
        </>
      </ErrorBoundary>
    </ContainerBox>
  )
}

export default CampaignReviews
