import React, { useState, useCallback } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { Flex, Box } from '@rebass/grid'
import StyledFrame from 'react-styled-frame'
import styled from 'styled-components'
import ErrorBoundary from '../components/ErrorBoundary'
import ErrorCard from '../components/ErrorCard'
import { MainButton } from '../styles/Button'
import { usePageTitle, useClientSize } from '../utils/hooks'
import PhoneMockup from '../components/PhoneMockup'
import CreatorCampaignPresentation from '../components/CreatorCampaignPresentation'
import { Title, SubTitle } from '../styles/Text'
import PageHeader from '../components/PageHeader'
import { ContainerBox } from '../styles/grid'
import { GlobalStyle } from '../styles/Global'
import { palette } from '../utils/colors'
import SuccessCard from '../components/SuccessCard'
import NotificationCard from '../components/NotificationCard'
import CampaignFormBrand from '../components/CampaignFormBrand'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_CAMPAIGN, getCampaignStatus, CampaignStatus } from './CampaignDashboard'
import { GetCampaign, GetCampaignVariables } from '../__generated__/GetCampaign'
import gql from 'graphql-tag'
import {
  ToggleArchiveCampaign,
  ToggleArchiveCampaignVariables,
} from '../__generated__/ToggleArchiveCampaign'
import Loader from '../components/Loader'
import CampaignFormProduct from '../components/CampaignFormProduct'
import CampaignFormBrief from '../components/CampaignFormBrief'
import CampaignFormTargetAudience from '../components/CampaignFormTargetAudience'

export const CAMPAIGN_SAVE_DEBOUNCE = 1500

const FullHeightFlex = styled(Flex)<{ height: string }>`
  @media screen and (min-width: ${props => props.theme.breakpoints[1]}) {
    height: ${props => props.height};
  }
`

const FormBox = styled(Box)`
  @media screen and (min-width: ${props => props.theme.breakpoints[1]}) {
    height: 100%;
    max-height: 100%;
    min-height: 100%;
    overflow-y: scroll;
    padding: 0 3px;
  }
`

const PreviewColumn = styled.aside`
  width: 100%;
  right: 0;
`

export const TOGGLE_ARCHIVE_CAMPAIGN = gql`
  mutation ToggleArchiveCampaign($campaignId: String!) {
    toggleArchiveCampaign(campaignId: $campaignId) {
      _id
      isArchived
      isReviewed
    }
  }
`

interface MatchParams {
  campaignId: string
}

const CampaignForm: React.FC<RouteComponentProps<MatchParams>> = ({ match, history }) => {
  usePageTitle('Campaign brief')
  const { campaignId } = match.params

  const { data: { campaign } = { campaign: null }, loading, error } = useQuery<
    GetCampaign,
    GetCampaignVariables
  >(GET_CAMPAIGN, { variables: { campaignId } })

  const [toggleArchiveCampaign, toggleArchiveCampaignStatus] = useMutation<
    ToggleArchiveCampaign,
    ToggleArchiveCampaignVariables
  >(TOGGLE_ARCHIVE_CAMPAIGN, {
    onCompleted: () => history.push(`/brand/campaigns/${campaignId}/dashboard?tab=brief`),
  })

  // Calculate available vertical space
  const [topDistance, setTopDistance] = useState<number>(0)
  const measuredRef = useCallback((node: HTMLElement) => {
    if (node !== null) {
      setTopDistance(node.offsetTop)
    }
  }, [])

  const { height } = useClientSize()
  const availableHeight = height - topDistance

  if (loading) {
    return <Loader fullScreen />
  }
  if (error) {
    return <ErrorCard message="Could not load campaign form" />
  }

  const handlePublishCampaign = () => {
    toggleArchiveCampaign({ variables: { campaignId } })
  }
  const showPublishButton = () => {
    const publishButtonIsShown = campaign.isArchived && !campaign.isReviewed
    const campaignIsComplete = getCampaignStatus(campaign).name !== CampaignStatus.INCOMPLETE
    return (
      <>
        {toggleArchiveCampaignStatus.error && (
          <ErrorCard noMargin message="Could not send to review" />
        )}
        {!campaign.isArchived && !campaign.isReviewed && (
          <SuccessCard
            noMargin
            message="Your campaign is being reviewed. We'll get back to you shortly"
          />
        )}
        {!campaign.isArchived && campaign.isReviewed && (
          <SuccessCard noMargin message="Your campaign is online" />
        )}
        {!campaignIsComplete && campaign.isArchived && (
          <Box mb="1rem">
            <NotificationCard nature="info" message="Complete your brief to send to review" />
          </Box>
        )}
        {publishButtonIsShown && (
          <div>
            <MainButton
              onClick={handlePublishCampaign}
              disabled={toggleArchiveCampaignStatus.loading || !campaignIsComplete}
              noMargin
            >
              {toggleArchiveCampaignStatus.loading ? 'Sending to review...' : 'Send to review'}
            </MainButton>
          </div>
        )}
      </>
    )
  }

  // Split the campaign object
  const { product, brand, targetAudience, isArchived, isReviewed, owner, ...brief } = campaign

  return (
    <ErrorBoundary message="Could not show your brief">
      <ContainerBox ref={measuredRef}>
        <FullHeightFlex
          flexDirection={['column', 'column', 'row']}
          justifyContent="space-between"
          height={`${availableHeight}px`}
          style={{ position: 'relative' }}
        >
          <FormBox width={[1, 1, 8 / 12]}>
            <PageHeader title="Campaign brief" destination={`/brand/campaigns/${campaign._id}`} />
            {showPublishButton()}
            <CampaignFormProduct product={product} campaignId={campaign._id} />
            <CampaignFormBrief brief={brief} />
            <CampaignFormBrand brand={brand} />
            <CampaignFormTargetAudience targetAudience={targetAudience} campaignId={campaign._id} />
            {showPublishButton()}
            {/* Some whitespace because there is no footer on this page */}
            <Box mb="3rem" />
          </FormBox>
          <FormBox flex={1} style={{ overflow: 'hidden' }}>
            <PreviewColumn>
              <Box py="1rem">
                <SubTitle isCentered noMargin>
                  Live preview
                </SubTitle>
                <p style={{ textAlign: 'center', color: palette.grey._500 }}>
                  Here's what influencers will see
                </p>
              </Box>
              <PhoneMockup>
                <StyledFrame style={{ width: '100%', height: '100%' }}>
                  <>
                    <GlobalStyle />
                    <Box px="1rem">
                      <Title>{product.name}</Title>
                      <Box mt="-3rem">
                        <CreatorCampaignPresentation campaignId={campaign._id} />
                      </Box>
                    </Box>
                  </>
                </StyledFrame>
              </PhoneMockup>
            </PreviewColumn>
          </FormBox>
        </FullHeightFlex>
      </ContainerBox>
    </ErrorBoundary>
  )
}

export default withRouter(CampaignForm)
