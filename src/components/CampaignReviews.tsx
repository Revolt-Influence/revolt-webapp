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
import NotificationCard from './NotificationCard'
import ReviewCard from './ReviewCard'

const Stats = styled(Box)`
  background: ${palette.pink._100};
  border-radius: 8px;
  .stat {
    text-align: center;
    .figure {
      color: ${palette.pink._500};
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
      reviews {
        format
        commentCount
        createdAt
        likeCount
        link
        creator {
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
  >(GET_CAMPAIGN_REVIEWS)
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
      name: 'Commentaires',
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
      <ErrorBoundary message="Les revues n'ont pas pu être affichées">
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
                <NotificationCard nature="info" message="Vous n'avez pas encore de revue" />
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
