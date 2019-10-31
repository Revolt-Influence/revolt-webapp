import React, { useMemo } from 'react'
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  ResponsiveContainer,
} from 'recharts'
import { GetCampaignReviews_campaign_reviews } from '../__generated__/GetCampaignReviews'
import moment, { Moment } from 'moment'
import { SubTitle } from '../styles/Text'
import { palette } from '../utils/colors'
import { Flex } from '@rebass/grid'

const ANIMATION_DURATION = 1000

interface GraphDataItem {
  day: Moment | string
  likeCount: number
  commentCount: number
  linkClicksCount: number
  viewCount: number
}

interface Props {
  reviews: GetCampaignReviews_campaign_reviews[]
  lastStatsDate: Moment
}

const ReviewsStatsGraph: React.FC<Props> = ({ reviews, lastStatsDate }) => {
  const graphData = useMemo(() => {
    const flatStats = reviews.flatMap(_review => _review.stats)
    const statsWithoutTime = flatStats.map(_stat => ({
      ..._stat,
      createdAt: moment(_stat.createdAt).startOf('day'),
    }))
    const itemsGroupedByDay: GraphDataItem[] = statsWithoutTime.reduceRight(
      (currentItems: GraphDataItem[], _stat) => {
        // Check if the day already has its item
        const existingItemIndex = currentItems.findIndex(_item =>
          (_item.day as Moment).isSame(_stat.createdAt)
        )
        if (existingItemIndex >= 0) {
          // Add stat to existing day
          const newItems = [...currentItems]
          const existingEntry = newItems[existingItemIndex]
          const updatedItem = {
            ...existingEntry,
            commentCount: existingEntry.commentCount + _stat.commentCount,
            likeCount: existingEntry.likeCount + _stat.likeCount,
            viewCount: existingEntry.viewCount + _stat.viewCount,
            linkClicksCount: existingEntry.linkClicksCount + _stat.linkClicksCount,
          }
          newItems[existingItemIndex] = updatedItem
          return newItems
        }
        // Create new item
        const newItem: GraphDataItem = {
          day: _stat.createdAt,
          commentCount: _stat.commentCount,
          likeCount: _stat.likeCount,
          viewCount: _stat.viewCount,
          linkClicksCount: _stat.linkClicksCount,
        }
        return [...currentItems, newItem]
      },
      []
    )
    // Get stats change for each item by comparing it with the previous item
    const incrementalItems: GraphDataItem[] = itemsGroupedByDay.reduce(
      (items: GraphDataItem[], _item) => {
        // Compare stats with previous if possible
        const incrementalStats: Partial<GraphDataItem> =
          items.length === 0
            ? _item
            : {
                likeCount: _item.likeCount - items[items.length - 1].likeCount,
                linkClicksCount: _item.linkClicksCount - items[items.length - 1].linkClicksCount,
                viewCount: _item.viewCount - items[items.length - 1].viewCount,
                commentCount: _item.commentCount - items[items.length - 1].commentCount,
              }
        return [...items, { ..._item, ...incrementalStats }]
      },
      []
    )
    // Format dates
    const itemsFormattedDates = incrementalItems.map(_item => ({
      ..._item,
      day: moment(_item.day).format('MMM D'),
    }))

    return itemsFormattedDates
  }, [reviews])

  return (
    <div>
      <Flex
        flexDirection="row"
        alignItems="baseline"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        <SubTitle>Performance per day</SubTitle>
        <p style={{ color: palette.grey._600 }}>Last updated {moment(lastStatsDate).fromNow()}</p>
      </Flex>
      <ResponsiveContainer width="100%" minHeight="240px">
        <AreaChart data={graphData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={palette.blue._400} stopOpacity={0.8} />
              <stop offset="95%" stopColor={palette.blue._400} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={palette.green._300} stopOpacity={0.8} />
              <stop offset="95%" stopColor={palette.green._300} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="day" />
          <YAxis />
          <CartesianGrid stroke={palette.grey._100} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="viewCount"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorPv)"
            animationDuration={ANIMATION_DURATION}
          />
          <Area
            type="monotone"
            dataKey="linkClicksCount"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
            animationDuration={ANIMATION_DURATION}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ReviewsStatsGraph
