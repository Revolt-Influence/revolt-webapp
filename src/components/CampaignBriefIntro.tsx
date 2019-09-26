import React from 'react'
import equal from 'fast-deep-equal'
import { Box } from '@rebass/grid'
import { FormInput, FormInputLabel, FormTextarea } from '../styles/Form'
import { ICampaignBrief } from '../models/Campaign'
import SplitView from './SplitView'

interface ICampaignBriefIntro {
  brief: ICampaignBrief
  setBrief: (newBrief: ICampaignBrief) => void
  name: string
  setName: (newName: string) => void
}

const CampaignBriefIntro: React.FC<ICampaignBriefIntro> = ({ brief, setBrief, name, setName }) => (
  <SplitView title="Votre campagne" stacked>
    <Box width={[1, 1, 6 / 12]} pr={[0, 0, '2rem']}>
      <FormInputLabel>
        Nom de la campagne
        <FormInput
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Ma campagne"
          hasLabel
          required
        />
      </FormInputLabel>
    </Box>
    <FormInputLabel>
      But de la campagne
      <FormTextarea
        rows={4}
        value={brief.description}
        onChange={e => setBrief({ ...brief, description: e.target.value })}
        hasLabel
        required
      />
    </FormInputLabel>
  </SplitView>
)

export default React.memo(CampaignBriefIntro, (prevProps, newProps) => {
  if (prevProps.name !== newProps.name) {
    return false
  }
  return equal(prevProps.brief, newProps.brief)
})
