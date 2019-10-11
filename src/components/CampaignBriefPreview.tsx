import React from 'react'
import { ContainerBox } from '../styles/grid'
import { MainLink } from '../styles/Button'
import CreatorCampaignPresentation from './CreatorCampaignPresentation'
import { GetCampaign_campaign } from '../__generated__/GetCampaign'
import { getCampaignStatus, CampaignStatus } from '../pages/CampaignDashboard'
import InfoCard from './InfoCard'
import { Box, Flex } from '@rebass/grid'
import { Title, Text } from '../styles/Text'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useDeviceType } from '../utils/hooks'

const formSource = require('../images/illustrations/insertBlock.svg')

const Styles = styled(ContainerBox)`
  .illustration {
    width: 35rem;
    @media screen and (max-width: ${props => props.theme.breakpoints[1]}) {
      display: none;
    }
  }
`

interface Props {
  campaign: GetCampaign_campaign
}

const CampaignBriefPreview: React.FC<Props> = ({ campaign }) => {
  const status = getCampaignStatus(campaign)
  const deviceType = useDeviceType()
  return (
    <Styles>
      {status.name === CampaignStatus.INCOMPLETE ? (
        <Flex
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          mt={[0, 0, '8rem']}
        >
          <Box width={[1, 1, 6 / 12]}>
            <Title noMargin={deviceType === 'desktop'}>We are creating your campaign</Title>
            <Box mt={[0, 0, '2.5rem']}>
              Give us a moment! We'll send you an email once your campaign is ready to be published.
            </Box>
            <Box mt="2rem">
              <p>
                In a hurry? You can{' '}
                <Link to={`/brand/campaigns/${campaign._id}/brief`}>
                  <Text color="blue">fill the campaign brief yourself</Text>
                </Link>
              </p>
            </Box>
          </Box>
          <Box width={[1, 1, 1 / 3]}>
            <img src={formSource} className="illustration" alt="campaign brief" />
          </Box>
        </Flex>
      ) : (
        // Show the online brief with edit button
        <>
          <InfoCard message="This is the page that the influencers can see. They will send you a request if they are interested." />
          <Box mb="1rem">
            <MainLink to={`/brand/campaigns/${campaign._id}/brief`} inverted>
              Edit my brief
            </MainLink>
          </Box>
          <CreatorCampaignPresentation campaignId={campaign._id} />
        </>
      )}
    </Styles>
  )
}

export default CampaignBriefPreview
