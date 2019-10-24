import React, { useState } from 'react'
import { usePageTitle } from '../utils/hooks'
import PageHeader from '../components/PageHeader'
import { useQuery } from '@apollo/react-hooks'
import { GET_SESSION } from '../components/Session'
import { GetSession } from '../__generated__/GetSession'
import { ContainerBox } from '../styles/grid'
import AmbassadorProgramCreators from '../components/AmbassadorProgramCreators'
import Tabs from '../components/Tabs'
import { Box } from '@rebass/grid'
import AmbassadorProgramBrands from '../components/AmbassadorProgramBrands'

enum ProgramTab {
  CREATORS = 'Invite influencers',
  BRANDS = 'Invite brands',
}

const possibleTabs = [ProgramTab.BRANDS, ProgramTab.CREATORS]

const AmbassadorProgram: React.FunctionComponent<{}> = () => {
  usePageTitle('Become an ambassador')
  const [tab, setTab] = useState<ProgramTab>(ProgramTab.BRANDS)
  // Copy link
  const { data: { session } = { session: null } } = useQuery<GetSession>(GET_SESSION)
  const creatorId = session.creator._id

  return (
    <ContainerBox>
      <PageHeader title="Become an ambassador" />
      <Box mt="-2rem">
        <Tabs
          noLinks
          items={possibleTabs.map(_tab => ({
            name: _tab,
            isActive: tab === _tab,
            handleClick: () => setTab(_tab),
          }))}
        />
      </Box>
      {tab === ProgramTab.CREATORS && <AmbassadorProgramCreators creatorId={creatorId} />}
      {tab === ProgramTab.BRANDS && <AmbassadorProgramBrands creatorId={creatorId} />}
    </ContainerBox>
  )
}

export default AmbassadorProgram
