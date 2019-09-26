import React from 'react'
import equal from 'fast-deep-equal'
import { Flex, Box } from '@rebass/grid'
import SplitView from './SplitView'
import { FormInputLabel, FormSelect } from '../styles/Form'
import { ICampaignTarget } from '../models/Campaign'
import { allCountries, allCities } from '../utils/locations'
import { Gender } from '../models/Creator'

interface ICampaignBriefTargetProps {
  target: ICampaignTarget
  setTarget: (newTarget: ICampaignTarget) => void
}

const CampaignBriefTarget: React.FC<ICampaignBriefTargetProps> = ({ target, setTarget }) => {
  // Only analyse cities when country changes
  const analyseCities = React.useCallback(() => {
    // Only keep country cities (doesn't work for all countries)
    const _countryCities = allCities.filter(_city => _city.includes(`, ${target.country}`))
    // Filter out cities from other countries
    const _possibleCities = allCities.filter(
      _city => !(_city.includes(', ') && !_city.includes(target.country))
    )
    return { countryCities: _countryCities, possibleCities: _possibleCities }
  }, [target.country])
  const { countryCities, possibleCities } = analyseCities()

  return (
    <div>
      {/* Brand section */}
      <SplitView title="La cible" stacked>
        <Box width={[1, 1, 6 / 12]} pr={[0, 0, '1rem']}>
          <FormInputLabel>
            Genre
            <FormSelect
              value={target.gender}
              onChange={e => setTarget({ ...target, gender: e.target.value as Gender })}
              fullWidth
            >
              <option value="">pas de préférence</option>
              <option value="male">homme</option>
              <option value="female">femme</option>
            </FormSelect>
          </FormInputLabel>
        </Box>
        {/* Location */}
        <Flex flexDirection="row" alignItems="flex-start" flexWrap="wrap">
          {/* Country */}
          <Box width={[1, 1, 6 / 12]} pr={[0, 0, '1rem']}>
            <FormInputLabel>
              Pays
              <FormSelect
                value={target.country}
                onChange={e => setTarget({ ...target, country: e.target.value })}
                fullWidth
              >
                <option value="">pas de préférence</option>
                <option value="France">France</option>
                <option value="United States of America">États-Unis d'Amérique</option>
                {allCountries.map((_country, index) => (
                  <option value={_country} key={_country}>
                    {_country}
                  </option>
                ))}
              </FormSelect>
            </FormInputLabel>
          </Box>
          {/* City */}
          <Box width={[1, 1, 6 / 12]} pl={[0, 0, '1rem']}>
            <FormInputLabel>
              Ville
              <FormSelect
                value={target.city}
                onChange={e => setTarget({ ...target, city: e.target.value })}
                fullWidth
              >
                <option value="">pas de préférence</option>
                {[...countryCities, ...possibleCities].map((_city, index) => (
                  <option value={_city} key={index < countryCities.length ? `sug_${_city}` : _city}>
                    {_city}
                  </option>
                ))}
              </FormSelect>
            </FormInputLabel>
          </Box>
        </Flex>
      </SplitView>
    </div>
  )
}

export default React.memo(CampaignBriefTarget, (prevProps, newProps) =>
  equal(prevProps.target, newProps.target)
)
