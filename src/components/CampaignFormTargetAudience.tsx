import React, { useState } from 'react'
import { Box } from '@rebass/grid'
import gql from 'graphql-tag'
import { FormInputLabel, FormInput, FormTextarea, FormSelect } from '../styles/Form'
import SplitView from './SplitView'
import { CAMPAIGN_SAVE_DEBOUNCE } from '../pages/CampaignForm'
import { useDebouncedCallback } from 'use-debounce/lib'
import { CampaignAudienceInput, Gender } from '../__generated__/globalTypes'
import { useMutation } from '@apollo/react-hooks'
import Toast from './Toast'
import { GetCampaign_campaign_targetAudience } from '../__generated__/GetCampaign'
import {
  UpdateCampaignTargetAudience,
  UpdateCampaignTargetAudienceVariables,
} from '../__generated__/UpdateCampaignTargetAudience'

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

  return (
    <SplitView title="Détails du cadeau" ratio={4 / 12} stacked>
      <>
        {/* Notifications */}
        {hasSaved && <Toast nature="success" text="Changes saved" disappear />}
        {error && <Toast nature="error" text="Could not save changes" disappear />}
        {/* Form */}
        <FormInputLabel>
          Gender
          <FormSelect
            value={targetAudienceInput.gender}
            onChange={e => handleUpdateTargetAudience({ gender: e.target.value as Gender })}
            fullWidth
          >
            <option value={Gender.ANY}>{Gender.ANY}</option>
            <option value={Gender.MALE}>{Gender.MALE}</option>
            <option value={Gender.FEMALE}>{Gender.FEMALE}</option>
          </FormSelect>
        </FormInputLabel>
      </>
    </SplitView>
  )
}

export default CampaignFormTargetAudience
