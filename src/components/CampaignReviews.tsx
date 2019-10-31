import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Box, Flex } from '@rebass/grid'
import gql from 'graphql-tag'
import { ContainerBox } from '../styles/grid'
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
import moment from 'moment'
import ReviewStatsOverview from './ReviewsStatsOverview'
import ReviewsStatsGraph from './ReviewsStatsGraph'

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

  const lastStats = reviews.map(_review => _review.stats[0])
  const lastStatsDate = moment(lastStats.length > 0 ? lastStats[0].createdAt : new Date())

  return (
    <ContainerBox>
      <ErrorBoundary message="Could not load reviews">
        <>
          <ReviewStatsOverview reviews={reviews} collabs={collabs} />
          {reviews.length === 0 && (
            <InfoCard message="You don't have any reviews of your game yet. Here is what a review will look like:" />
          )}
          <Box mt="2rem">
            <ReviewsStatsGraph reviews={reviews} lastStatsDate={lastStatsDate} />
          </Box>
          <Flex
            flexDirection="row"
            justifyContent="flex-start"
            flexWrap="wrap"
            alignItems="flex-start"
            mx="-2rem"
            mt="2rem"
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
