import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Box } from '@rebass/grid'
import gql from 'graphql-tag'
import { ContainerBox } from '../styles/grid'
import {
  GetCampaignReviews,
  GetCampaignReviewsVariables,
} from '../__generated__/GetCampaignReviews'
import ErrorBoundary from './ErrorBoundary'
import ErrorCard from './ErrorCard'
import Loader from './Loader'
import InfoCard from './InfoCard'
import moment from 'moment'
import ReviewStatsOverview from './ReviewsStatsOverview'
import ReviewsStatsGraph from './ReviewsStatsGraph'
import ReviewsStatsTable from './ReviewsStatsTable'

const GET_CAMPAIGN_REVIEWS = gql`
  query GetCampaignReviews($campaignId: String!) {
    campaign(id: $campaignId) {
      _id
      collabs {
        _id
        status
        quote
        review {
          _id
        }
      }
      reviews {
        _id
        format
        platformId
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
          picture
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
          <Box mt="2rem">
            <ReviewsStatsGraph reviews={reviews} lastStatsDate={lastStatsDate} />
          </Box>
          <Box mt="2rem" mb="2rem">
            <ReviewsStatsTable reviews={reviews} collabs={collabs} lastStatsDate={lastStatsDate} />
          </Box>
        </>
      </ErrorBoundary>
    </ContainerBox>
  )
}

export default CampaignReviews
