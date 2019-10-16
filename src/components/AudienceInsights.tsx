import React from 'react'
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Box, Flex } from '@rebass/grid'
import { getName, overwrite } from 'country-list'
import styled from 'styled-components'
import { palette } from '../utils/colors'
import { setFont, shadow } from '../utils/styles'
import ErrorBoundary from './ErrorBoundary'
import {
  GetYoutuber_youtuber_audience,
  GetYoutuber_youtuber_audience_countries,
} from '../__generated__/GetYoutuber'
import { Dot } from '../styles/Dot'

const ANIMATION_DURATION = 1000
const MAX_LOCATIONS = 6
const MAX_AGEGROUPS = 6

overwrite([{ code: 'GB', name: 'UK' }, { code: 'US', name: 'USA' }])

const Styles = styled.div`
  .legend {
    margin-left: 2rem;
    li {
      display: flex;
      flex-direction: row;
      justify-content: row;
      align-items: center;
      &:not(:last-child) {
        margin-bottom: 1rem;
      }
    }
  }

  .subSection {
    ${setFont(600, 'normal')}
    margin-top: 20px;
    margin-bottom: 5px;
  }
`

const sortByPercentage = (
  metricA: GetYoutuber_youtuber_audience_countries,
  metricB: GetYoutuber_youtuber_audience_countries
): number => {
  if (metricA.percentage < metricB.percentage) return 1
  if (metricA.percentage > metricB.percentage) return -1
  return 0
}

interface Props {
  youtuberAudience: GetYoutuber_youtuber_audience
}

const AudienceInsights: React.FC<Props> = ({
  youtuberAudience: { ageGroups, countries, malePercentage, femalePercentage },
}) => {
  // Prepare age data
  const hasAgeData = ageGroups
  const ageDatas = hasAgeData
    ? ageGroups
        .map((_topAge, _index) => ({
          ..._topAge,
          name: `${_topAge.name.replace('age', '')} y/o`,
        }))
        .sort(sortByPercentage)
        // Limit groups amount
        .filter((_group, index) => index < MAX_AGEGROUPS)
    : []

  // Prepare country data
  const hasCountryData = countries != null
  const countryDatas = hasCountryData
    ? countries
        .map(_isoCountry => ({
          ..._isoCountry,
          name: getName(_isoCountry.name) || _isoCountry.name,
        }))
        .sort(sortByPercentage)
        // Limit countries amount
        .filter((_country, index) => index < MAX_LOCATIONS)
    : []

  // Prepare gender data
  const scaleGenderPercentage = 100 / (femalePercentage + malePercentage)
  const formattedMalePercentage = malePercentage * scaleGenderPercentage
  const formattedFemalePercentage = femalePercentage * scaleGenderPercentage
  const genderDatas = [
    { name: 'men', value: formattedMalePercentage, color: palette.blue._400 },
    { name: 'women', value: formattedFemalePercentage, color: palette.pink._400 },
  ]

  return (
    <ErrorBoundary message="Could not show audience insights">
      <Styles>
        {/* Gender chart */}
        <h3 className="subSection">Audience gender</h3>
        <Flex flexDirection="row" alignItems="center">
          <PieChart
            width={180}
            height={180}
            margin={{ top: -20, right: -20, bottom: -20, left: -20 }}
          >
            <Pie
              data={genderDatas}
              dataKey="value"
              nameKey="gender"
              animationDuration={ANIMATION_DURATION}
            >
              {genderDatas.map(_genderData => (
                <Cell fill={_genderData.color} key={_genderData.name} />
              ))}
            </Pie>
          </PieChart>
          <ul className="legend">
            {genderDatas.map(_genderData => (
              <li key={_genderData.name}>
                <Dot color={_genderData.color} />
                <span>
                  {Math.round(_genderData.value)}% {_genderData.name}
                </span>
              </li>
            ))}
          </ul>
        </Flex>

        {/* Age data */}
        {hasAgeData && (
          <>
            <h3 className="subSection">Audience age</h3>
            <Box width={1}>
              <ResponsiveContainer width="100%" minHeight="240px">
                <BarChart data={ageDatas} margin={{ top: -20 }}>
                  <XAxis dataKey="name" />
                  <Tooltip
                    wrapperStyle={{
                      backgroundColor: palette.grey._50,
                      border: 0,
                      boxShadow: shadow._400,
                      borderRadius: '6px',
                      overflow: 'hidden',
                    }}
                    cursor={{ fill: palette.grey._200 }}
                  />
                  <Bar dataKey="percentage" fill={palette.blue._400} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </>
        )}

        {/* Location chart */}
        {hasCountryData && (
          <>
            <h3 className="subSection">Audience countries</h3>
            <Box width={1}>
              <ResponsiveContainer width="100%" minHeight="240px">
                <BarChart data={countryDatas} margin={{ top: -20 }}>
                  <XAxis dataKey="name" />
                  <Tooltip
                    wrapperStyle={{
                      backgroundColor: palette.grey._50,
                      border: 0,
                      boxShadow: shadow._400,
                      borderRadius: '6px',
                      overflow: 'hidden',
                    }}
                    cursor={{ fill: palette.grey._200 }}
                  />
                  <Bar dataKey="percentage" fill={palette.blue._400} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </>
        )}
      </Styles>
    </ErrorBoundary>
  )
}

export default AudienceInsights
