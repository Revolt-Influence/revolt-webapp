import React, { useState } from 'react'
import { Box } from '@rebass/grid'
import gql from 'graphql-tag'
import { FormInputLabel, FormInput, FormTextarea } from '../styles/Form'
import SplitView from './SplitView'
import { CAMPAIGN_SAVE_DEBOUNCE } from '../pages/CampaignForm'
import { useDebouncedCallback } from 'use-debounce/lib'
import { CampaignBriefInput } from '../__generated__/globalTypes'
import { useMutation } from '@apollo/react-hooks'
import Toast from './Toast'
import { CampaignBriefFragment } from '../__generated__/CampaignBriefFragment'
import {
  UpdateCampaignBrief,
  UpdateCampaignBriefVariables,
} from '../__generated__/UpdateCampaignBrief'

export const CAMPAIGN_BRIEF_FRAGMENT = gql`
  fragment CampaignBriefFragment on Campaign {
    _id
    name
    description
    rules
    estimatedBudget
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

  return (
    <SplitView title="About the campaign" ratio={4 / 12} stacked>
      <>
        {/* Notifications */}
        {hasSaved && <Toast nature="success" text="Changes saved" disappear />}
        {error && <Toast nature="error" text="Could not save changes" disappear />}
        {/* Form */}
        <Box width={[1, 1, 6 / 12]} pr={[0, 0, '2rem']}>
          <FormInputLabel>
            Campaign name
            <FormInput
              value={briefInput.name}
              onChange={e => handleUpdateBrief({ name: e.target.value })}
              placeholder="My campaign"
              hasLabel
              required
            />
          </FormInputLabel>
        </Box>
        <FormInputLabel>
          Campaign goal
          <FormTextarea
            rows={4}
            value={briefInput.description}
            onChange={e => handleUpdateBrief({ description: e.target.value })}
            hasLabel
            required
          />
        </FormInputLabel>
        <Box width={[1, 1, 6 / 12]} pr={[0, 0, '2rem']}>
          <FormInputLabel withMargin>
            Total campaign budget estimation (in dollars)
            <FormInput
              value={briefInput.estimatedBudget}
              onChange={e => handleUpdateBrief({ estimatedBudget: parseFloat(e.target.value) })}
              hasLabel
              required
            />
          </FormInputLabel>
        </Box>
      </>
    </SplitView>
  )
}

export default CampaignFormBrief
