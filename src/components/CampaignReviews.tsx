import { useQuery } from '@apollo/react-hooks'
import { Box, Flex } from '@rebass/grid'
import approx from 'approximate-number'
import gql from 'graphql-tag'
import React from 'react'
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
      reviews {
        _id
        format
        commentCount
        createdAt
        likeCount
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
  const { reviews } = campaign

  const totalLikes = reviews.reduce((total, _review) => total + (_review.likeCount || 0), 0)
  const totalComments = reviews.reduce((total, _review) => total + (_review.commentCount || 0), 0)
  const earnedMediaValue = (totalLikes + totalComments) * 0.3

  const stats = [
    {
      name: reviews.length > 1 ? 'Reviews' : 'Review',
      value: reviews.length,
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
      name: 'Engagement',
      value: approx(totalLikes + totalComments),
    },
    {
      name: 'Earned media value',
      value: `${approx(earnedMediaValue)}€`,
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
          <Flex
            flexDirection="row"
            justifyContent="flex-start"
            flexWrap="wrap"
            alignItems="flex-start"
            mx="-2rem"
            mt="2rem"
          >
            {reviews.length === 0 && (
              <Box px="2rem">
                <InfoCard message="You don't have reviews yet" />
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
