import React, { useState } from 'react'
import { Box, Flex } from '@rebass/grid'
import gql from 'graphql-tag'
import { FormInputLabel, FormSelect } from '../styles/Form'
import SplitView from './SplitView'
import { CAMPAIGN_SAVE_DEBOUNCE } from '../pages/CampaignForm'
import { useDebouncedCallback } from 'use-debounce/lib'
import { CampaignAudienceInput, Gender, AgeGroup } from '../__generated__/globalTypes'
import { useMutation } from '@apollo/react-hooks'
import Toast from './Toast'
import { GetCampaign_campaign_targetAudience } from '../__generated__/GetCampaign'
import {
  UpdateCampaignTargetAudience,
  UpdateCampaignTargetAudienceVariables,
} from '../__generated__/UpdateCampaignTargetAudience'
import { showGender, showAgeGroup } from '../utils/enums'
import CheckBox from './CheckBox'
import Tag from './Tag'

const possibleAgeGroups = Object.values(AgeGroup) as AgeGroup[]

const UPDATE_CAMPAIGN_TARGET_AUDIENCE = gql`
  mutation UpdateCampaignTargetAudience(
    $targetAudience: CampaignAudienceInput!
    $campaignId: String!
  ) {
    updateCampaignTargetAudience(targetAudience: $targetAudience, campaignId: $campaignId) {
      _id
      targetAudience {
        gender
        countries
        ageGroups
      }
    }
  }
`

interface Prop {
  campaignId: string
  targetAudience: GetCampaign_campaign_targetAudience
}

const CampaignFormTargetAudience: React.FC<Prop> = ({ targetAudience, campaignId }) => {
  // Omit brand data that doesn't belong in the input type
  const { __typename, ...targetAudienceInputData } = targetAudience

  // Update local form state
  const [targetAudienceInput, setTargetAudienceInput] = useState<CampaignAudienceInput>(
    targetAudienceInputData
  )
  const [hasSaved, setHasSaved] = useState<boolean>(false)

  const [debouncedCallback] = useDebouncedCallback(() => {
    updateTargetAudience({ variables: { campaignId, targetAudience: targetAudienceInput } })
  }, CAMPAIGN_SAVE_DEBOUNCE)

  const handleUpdateTargetAudience = (update: Partial<CampaignAudienceInput>) => {
    setHasSaved(false)
    setTargetAudienceInput({ ...targetAudienceInput, ...update })
    debouncedCallback()
  }

  // Prepare save to server request
  const [updateTargetAudience, { error }] = useMutation<
    UpdateCampaignTargetAudience,
    UpdateCampaignTargetAudienceVariables
  >(UPDATE_CAMPAIGN_TARGET_AUDIENCE, {
    onCompleted: () => setHasSaved(true),
  })

  const handleToggleAgeGroup = (groupToToggle: AgeGroup): void => {
    const wasCheckedBefore = targetAudienceInput.ageGroups.includes(groupToToggle)
    const getNewGroups = (): AgeGroup[] => {
      // "Any" is special, it disables everything else
      if (groupToToggle === AgeGroup.ANY && !wasCheckedBefore) {
        return [AgeGroup.ANY]
      }
      // Otherwise togge
      if (wasCheckedBefore) {
        // Remove from array
        return targetAudienceInput.ageGroups.filter(
          _group => _group !== groupToToggle && _group !== AgeGroup.ANY
        )
      } else {
        return [
          ...targetAudienceInput.ageGroups.filter(_group => _group !== AgeGroup.ANY),
          groupToToggle,
        ]
      }
    }
    const newGroups = getNewGroups()
    handleUpdateTargetAudience({ ageGroups: newGroups })
  }

  return (
    <SplitView title="Target audience" ratio={4 / 12} stacked>
      <>
        {/* Notifications */}
        {hasSaved && <Toast nature="success" text="Changes saved" disappear />}
        {error && <Toast nature="error" text="Could not save changes" disappear />}
        {/* Form */}
        <Box width={[1, 1, 6 / 12]}>
          <FormInputLabel>
            Gender
            <FormSelect
              value={targetAudienceInput.gender}
              onChange={e => handleUpdateTargetAudience({ gender: e.target.value as Gender })}
              fullWidth
            >
              <option value={Gender.ANY}>{showGender(Gender.ANY)}</option>
              <option value={Gender.MALE}>{showGender(Gender.MALE)}</option>
              <option value={Gender.FEMALE}>{showGender(Gender.FEMALE)}</option>
            </FormSelect>
          </FormInputLabel>
          <FormInputLabel>
            Age
            <Flex width={[1, 1, 8 / 12]} flexDirection="row" flexWrap="wrap">
              {possibleAgeGroups.map(_ageGroup => (
                <Box width={1 / 2}>
                  <CheckBox
                    text={showAgeGroup(_ageGroup)}
                    isChecked={targetAudienceInput.ageGroups.includes(_ageGroup)}
                    handleClick={() => handleToggleAgeGroup(_ageGroup)}
                  />
                </Box>
              ))}
            </Flex>
          </FormInputLabel>
          <FormInputLabel>
            Countries
            <Flex flexDirection="row" flexWrap="wrap">
              <Tag text="France" handleRemove={() => console.log('remove')} />
              <Tag text="France" handleRemove={() => console.log('remove')} />
              <Tag text="France" handleRemove={() => console.log('remove')} />
              <Tag text="France" handleRemove={() => console.log('remove')} />
            </Flex>
          </FormInputLabel>
        </Box>
      </>
    </SplitView>
  )
}

export default CampaignFormTargetAudience
