import React, { useState } from 'react'
import { Box, Flex } from '@rebass/grid'
import gql from 'graphql-tag'
import { FormInputLabel, FormInput, FormTextarea, FormSelect } from '../styles/Form'
import SplitView from './SplitView'
import { CAMPAIGN_SAVE_DEBOUNCE } from '../pages/CampaignForm'
import { useDebouncedCallback } from 'use-debounce/lib'
import {
  CampaignBriefInput,
  TrackingProvider,
  PublishingPlatform,
} from '../__generated__/globalTypes'
import { useMutation } from '@apollo/react-hooks'
import Toast from './Toast'
import { CampaignBriefFragment } from '../__generated__/CampaignBriefFragment'
import {
  UpdateCampaignBrief,
  UpdateCampaignBriefVariables,
} from '../__generated__/UpdateCampaignBrief'
import { showTrackingProvider, showPublishingPlatform } from '../utils/enums'
import CheckBox from './CheckBox'

const possibleTrackingProviders = Object.values(TrackingProvider) as TrackingProvider[]
const possiblePublishingPlatforms = Object.values(PublishingPlatform) as PublishingPlatform[]

export const CAMPAIGN_BRIEF_FRAGMENT = gql`
  fragment CampaignBriefFragment on Campaign {
    _id
    goal
    rules
    estimatedBudget
    trackingProvider
    publishingPlatforms
  }
`

const UPDATE_CAMPAIGN_BRIEF = gql`
  mutation UpdateCampaignBrief($campaignBrief: CampaignBriefInput!, $campaignId: String!) {
    updateCampaignBrief(campaignBrief: $campaignBrief, campaignId: $campaignId) {
      ...CampaignBriefFragment
    }
  }
  ${CAMPAIGN_BRIEF_FRAGMENT}
`

interface Prop {
  brief: CampaignBriefFragment
}

const CampaignFormBrief: React.FC<Prop> = ({ brief }) => {
  // Omit brand data that doesn't belong in the input type
  const { _id, __typename, ...briefInputData } = brief

  // Update local form state
  const [briefInput, setBriefInput] = useState<CampaignBriefInput>(briefInputData)
  const [hasSaved, setHasSaved] = useState<boolean>(false)

  const [debouncedCallback] = useDebouncedCallback(() => {
    updateBrief({ variables: { campaignId: _id, campaignBrief: briefInput } })
  }, CAMPAIGN_SAVE_DEBOUNCE)

  const handleUpdateBrief = (update: Partial<CampaignBriefInput>) => {
    setHasSaved(false)
    setBriefInput({ ...briefInput, ...update })
    debouncedCallback()
  }

  // Prepare save to server request
  const [updateBrief, { error }] = useMutation<UpdateCampaignBrief, UpdateCampaignBriefVariables>(
    UPDATE_CAMPAIGN_BRIEF,
    {
      onCompleted: () => setHasSaved(true),
    }
  )

  const handleTogglePublishingPlatform = (platformToToggle: PublishingPlatform) => {
    const wasCheckedBefore = briefInput.publishingPlatforms.includes(platformToToggle)
    let newPlatforms: PublishingPlatform[]
    if (wasCheckedBefore) {
      // Remove from selection
      newPlatforms = briefInput.publishingPlatforms.filter(
        _platform => _platform !== platformToToggle
      )
    } else {
      // Add to selection
      newPlatforms = [...briefInput.publishingPlatforms, platformToToggle]
    }
    handleUpdateBrief({ publishingPlatforms: newPlatforms })
  }

  return (
    <SplitView title="About the campaign" ratio={4 / 12} stacked>
      <>
        {/* Notifications */}
        {hasSaved && <Toast nature="success" text="Changes saved" disappear />}
        {error && <Toast nature="error" text="Could not save changes" disappear />}
        {/* Form */}
        <FormInputLabel>
          Campaign goal
          <FormTextarea
            rows={4}
            value={briefInput.goal}
            onChange={e => handleUpdateBrief({ goal: e.target.value })}
            hasLabel
            required
          />
        </FormInputLabel>
        {/* Tracking provider */}
        <Box width={[1, 1, 6 / 12]}>
          <FormInputLabel withMargin>
            Tracking provider
            <FormSelect
              value={briefInput.trackingProvider}
              onChange={e =>
                handleUpdateBrief({ trackingProvider: e.target.value as TrackingProvider })
              }
              fullWidth
            >
              {possibleTrackingProviders.map(_provider => (
                <option value={_provider} key={_provider}>
                  {showTrackingProvider(_provider)}
                </option>
              ))}
            </FormSelect>
          </FormInputLabel>
        </Box>
        {/* Publishing platforms */}
        <FormInputLabel withMargin>Publishing platforms</FormInputLabel>
        <Flex flexDirection="row" flexWrap="wrap">
          {possiblePublishingPlatforms.map(_platform => (
            <Box key={_platform} width={[6 / 12, 6 / 12, 4 / 12]}>
              <CheckBox
                text={showPublishingPlatform(_platform)}
                isChecked={briefInput.publishingPlatforms.includes(_platform)}
                handleClick={() => handleTogglePublishingPlatform(_platform)}
              />
            </Box>
          ))}
        </Flex>

        <Box width={[1, 1, 8 / 12]} pr={[0, 0, '2rem']}>
          <FormInputLabel withMargin>
            Total campaign budget estimation (in US Dollars)
            <FormInput
              value={briefInput.estimatedBudget}
              onChange={e => handleUpdateBrief({ estimatedBudget: parseFloat(e.target.value) })}
              hasLabel
              type="number"
            />
          </FormInputLabel>
        </Box>
      </>
    </SplitView>
  )
}

export default CampaignFormBrief
