import React from 'react'
import approx from 'approximate-number'
import { Box, Flex } from '@rebass/grid'
import { palette } from '../utils/colors'
import { setFont } from '../utils/styles'
import styled from 'styled-components'
import {
  GetCampaignReviews_campaign_reviews,
  GetCampaignReviews_campaign_collabs,
} from '../__generated__/GetCampaignReviews'
import { CollabStatus } from '../__generated__/globalTypes'

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

interface Props {
  reviews: GetCampaignReviews_campaign_reviews[]
  collabs: GetCampaignReviews_campaign_collabs[]
}

const ReviewStatsOverview: React.FC<Props> = ({ reviews, collabs }) => {
  // Format and agregate reviews data
  const lastStats = reviews.map(_review => _review.stats[0])
  const totalLikes = lastStats.reduce((total, _stats) => total + (_stats.likeCount || 0), 0)
  const totalComments = lastStats.reduce((total, _stats) => total + (_stats.commentCount || 0), 0)
  const totalClicks = lastStats.reduce((total, _stats) => total + (_stats.linkClicksCount || 0), 0)
  const totalViews = lastStats.reduce((total, _stats) => total + (_stats.viewCount || 0), 0)
  const earnedMediaValue = (totalLikes + totalComments) * 0.3

  const totalSpentBudget = collabs
    .filter(_collab => _collab.status === CollabStatus.DONE)
    .reduce((quotesSum, _collab) => quotesSum + _collab.quote, 0)

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
    <Stats pt="0.1rem" mt={['2rem', '2rem', '2rem']}>
      <Flex
        justifyContent="space-around"
        alignItems="center"
        mt="2rem"
        flexWrap={['wrap', 'nowrap', 'nowrap']}
      >
        {stats.map(_stat => (
          <Box width={[6 / 12, 1, 1]} key={_stat.name} className="stat">
            <p className="figure">{_stat.value}</p>
            <p className="legend">{_stat.name}</p>
          </Box>
        ))}
      </Flex>
    </Stats>
  )
}

export default ReviewStatsOverview
