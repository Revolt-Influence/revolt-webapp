import React from 'react'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Flex, Box } from '@rebass/grid'
import { getName } from 'country-list'
import styled from 'styled-components'
import { IAudienceMetric } from '../models/Audience'
import { palette } from '../utils/colors'
import Tabs from './Tabs'
import { setFont, shadow } from '../utils/styles'
import { Dot } from '../styles/Dot'
import ErrorBoundary from './ErrorBoundary'

const ANIMATION_DURATION = 1000
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

const sortByPercentage = (metricA: IAudienceMetric, metricB: IAudienceMetric): number => {
  if (metricA.percentage < metricB.percentage) return 1
  if (metricA.percentage > metricB.percentage) return -1
  return 0
}

interface IAudienceInsightsProps {
  // Base data
  malePercentage: number
  femalePercentage: number
  // Location data
  topCities?: IAudienceMetric[]
  topCountries?: IAudienceMetric[]
  // Audience quality
  influencersPercentage?: number
  authenticPercentage?: number
  massfollowersPercentage?: number
  suspiciousPercentage?: number
  // Audience age
  topAges?: IAudienceMetric[]
}

const AudienceInsights: React.FC<IAudienceInsightsProps> = ({
  malePercentage,
  femalePercentage,
  topCities,
  topCountries,
  influencersPercentage,
  authenticPercentage,
  massfollowersPercentage,
  suspiciousPercentage,
  topAges,
}) => {
  // Tabs state
  const [locationTab, setLocationTab] = React.useState<'country' | 'city'>('country')

  // Prepare Recharts data
  const scaleGenderPercentage = 100 / (femalePercentage + malePercentage)
  const formattedMalePercentage = malePercentage * scaleGenderPercentage
  const formattedFemalePercentage = femalePercentage * scaleGenderPercentage
  const genderDatas = [
    { name: 'hommes', value: formattedMalePercentage, color: palette.blue._400 },
    { name: 'femmes', value: formattedFemalePercentage, color: palette.pink._400 },
  ]
  const hasAgeData = topAges != null
  const ageDatas = hasAgeData
    ? topAges
        .map((_topAge, _index) => ({
          ..._topAge,
          name: `${_topAge.name.replace('age', '')} ans`,
        }))
        .sort(sortByPercentage)
    : []
  const hasFollowerTypesData =
    influencersPercentage != null &&
    authenticPercentage != null &&
    massfollowersPercentage != null &&
    suspiciousPercentage != null
  const followerTypesDatas = hasFollowerTypesData
    ? [
        {
          name: 'influenceurs',
          value: influencersPercentage,
          color: palette.pink._500,
        },
        {
          name: 'authentiques',
          value: authenticPercentage,
          color: palette.pink._400,
        },
        {
          name: 'massfollowers',
          value: massfollowersPercentage,
          color: palette.grey._500,
        },
        {
          name: 'comptes suspicieux',
          value: suspiciousPercentage,
          color: palette.grey._300,
        },
      ]
    : []

  // Limit to 6 locations
  const hasCountryData = topCountries != null
  const countryDatas = hasCountryData
    ? topCountries
        .map(_isoCountry => ({
          ..._isoCountry,
          name: getName(_isoCountry.name) || _isoCountry.name,
        }))
        .sort(sortByPercentage)
        .filter((_country, index) => index < MAX_LOCATIONS)
    : []
  const hasCityData = topCities != null
  const cityDatas = hasCityData
    ? topCities
        .map(_city => ({
          ..._city,
          // Don't show country in city name
          name: _city.name.includes(',')
            ? _city.name.substr(0, _city.name.indexOf(','))
            : _city.name,
        }))
        .sort(sortByPercentage)
        .filter((_city, index) => index < MAX_LOCATIONS)
    : []

  const locationTabItems = [
    {
      isActive: locationTab === 'country',
      name: 'Pays',
      handleClick: () => setLocationTab('country'),
    },
    {
      isActive: locationTab === 'city',
      name: 'Ville',
      handleClick: () => setLocationTab('city'),
    },
  ]

  return (
    <ErrorBoundary message="Les données n'ont pas pu être affichées">
      <Styles>
        {/* Gender chart */}
        <h3 className="subSection">Genre de l'audience</h3>
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

        {/* Authenticity chart */}
        {hasFollowerTypesData && (
          <>
            <h3 className="subSection">Qualité de l'audience</h3>
            <Flex flexDirection="row" alignItems="center">
              <PieChart
                width={180}
                height={180}
                margin={{ top: -20, right: -20, bottom: -20, left: -20 }}
              >
                <Pie
                  data={followerTypesDatas}
                  dataKey="value"
                  nameKey="authenticity"
                  animationDuration={ANIMATION_DURATION}
                >
                  {followerTypesDatas.map(_followerType => (
                    <Cell fill={_followerType.color} key={_followerType.name} />
                  ))}
                </Pie>
              </PieChart>
              <ul className="legend">
                {followerTypesDatas.map(_followerType => (
                  <li key={_followerType.name}>
                    <Dot color={_followerType.color} />
                    <span>
                      {Math.round(_followerType.value)}% {_followerType.name}
                    </span>
                  </li>
                ))}
              </ul>
            </Flex>
          </>
        )}

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
        {(hasCountryData || hasCityData) && (
          <>
            <h3 className="subSection">Localisation de l'audience</h3>
            {hasCountryData && hasCityData && <Tabs items={locationTabItems} noLinks small />}
            <Box width={1}>
              <ResponsiveContainer width="100%" minHeight="240px">
                <BarChart
                  data={locationTab === 'country' ? countryDatas : cityDatas}
                  margin={{ top: -20 }}
                >
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
