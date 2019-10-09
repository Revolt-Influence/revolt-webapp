import React, { useState } from 'react'
import { Box, Flex } from '@rebass/grid'
import gql from 'graphql-tag'
import { FormInputLabel, FormInput, FormSelect } from '../styles/Form'
import SplitView from './SplitView'
import InfoCard from './InfoCard'
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
        {/* Loop through all items and add an empty one */}
        <InfoCard
          noMargin
          message="You can define a set of rules that the influencer will commit to follow"
        />
        {[...briefInput.rules, ''].map((_rule, _index) => (
          <FormInputLabel key={_index}>
            Influencer rule {_index + 1}
            <FormInput
              value={_rule}
              disabled={_index === 0} // Keep the first rule
              onChange={e => {
                // Update rule if field is not blank
                if (e.target.value.length > 0) {
                  // Replace rule being edited
                  const newRules = [...briefInput.rules]
                  newRules[_index] = e.target.value
                  handleUpdateBrief({ rules: newRules })
                } else {
                  // Field is blank, remove field
                  handleUpdateBrief({
                    rules: [
                      // All rules except the one being modified
                      ...briefInput.rules.filter((_, allIndex) => _index !== allIndex),
                    ],
                  })
                }
              }}
              hasLabel
              placeholder="Add a rule for the influencer"
            />
          </FormInputLabel>
        ))}
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
        {/* Campaign budget */}
        <Box width={[1, 1, 8 / 12]} pr={[0, 0, '2rem']}>
          <FormInputLabel withMargin>
            Total campaign budget estimation (in US Dollars, optional)
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
