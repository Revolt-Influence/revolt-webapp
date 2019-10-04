import React from 'react'
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Box } from '@rebass/grid'
import { getName } from 'country-list'
import styled from 'styled-components'
import { palette } from '../utils/colors'
import { setFont, shadow } from '../utils/styles'
import ErrorBoundary from './ErrorBoundary'
import {
  GetYoutuber_youtuber_audience,
  GetYoutuber_youtuber_audience_countries,
} from '../__generated__/GetYoutuber'

const MAX_LOCATIONS = 6

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

const AudienceInsights: React.FC<Props> = ({ youtuberAudience: { ageGroups, countries } }) => {
  // Prepare Recharts data
  const hasAgeData = ageGroups
  const ageDatas = hasAgeData
    ? ageGroups
        .map((_topAge, _index) => ({
          ..._topAge,
          name: `${_topAge.name.replace('age', '')} ans`,
        }))
        .sort(sortByPercentage)
    : []
  // Limit to 6 countries
  const hasCountryData = countries != null
  const countryDatas = hasCountryData
    ? countries
        .map(_isoCountry => ({
          ..._isoCountry,
          name: getName(_isoCountry.name) || _isoCountry.name,
        }))
        .sort(sortByPercentage)
        .filter((_country, index) => index < MAX_LOCATIONS)
    : []

  return (
    <ErrorBoundary message="Les données n'ont pas pu être affichées">
      <Styles>
        {/* Age data */}
        {hasAgeData && (
          <>
            <h3 className="subSection">Âge de l'audience</h3>
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
            <h3 className="subSection">Pays de l'audience</h3>
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
