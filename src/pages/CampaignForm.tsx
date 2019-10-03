import React, { useRef } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { Flex, Box } from '@rebass/grid'
import StyledFrame from 'react-styled-frame'
import styled from 'styled-components'
// import CampaignBriefIntro from '../components/CampaignBriefIntro'
// import CampaignBriefGift from '../components/CampaignBriefGift'
// import CampaignBriefTask, { mandatoryRules, defaultRules } from '../components/CampaignBriefTask'
// import CampaignBriefTarget from '../components/CampaignBriefTarget'
import ErrorBoundary from '../components/ErrorBoundary'
import ErrorCard from '../components/ErrorCard'
import { MainButton } from '../styles/Button'
import { usePageTitle, useRect } from '../utils/hooks'
import PhoneMockup from '../components/PhoneMockup'
import ExperiencePresentation from '../components/ExperiencePresentation'
import { Title, SubTitle } from '../styles/Text'
import PageHeader from '../components/PageHeader'
import { ContainerBox } from '../styles/grid'
import { GlobalStyle } from '../components/App'
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

const CampaignForm: React.FC<RouteComponentProps<MatchParams>> = ({ match }) => {
  usePageTitle('Brief de la campagne')
  const { campaignId } = match.params

  const { data: { campaign } = { campaign: null }, loading, error } = useQuery<
    GetCampaign,
    GetCampaignVariables
  >(GET_CAMPAIGN, { variables: { campaignId } })

  const [toggleArchiveCampaign, toggleArchiveCampaignStatus] = useMutation<
    ToggleArchiveCampaign,
    ToggleArchiveCampaignVariables
  >(TOGGLE_ARCHIVE_CAMPAIGN)

  // Calculate available vertical space
  const selfRef = useRef(null)
  const box = useRect(selfRef)
  const availableHeight = window.innerHeight - box.top

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
          <ErrorCard noMargin message="Votre demande n'a pas pu être enregistrée" />
        )}
        {!campaign.isArchived && !campaign.isReviewed && (
          <SuccessCard
            noMargin
            message="Votre demande a été enregistrée. Nous allons vérifier votre campagne et vous recontacter"
          />
        )}
        {!campaign.isArchived && campaign.isReviewed && (
          <SuccessCard noMargin message="Votre campagne est en ligne" />
        )}
        {!campaignIsComplete && campaign.isArchived && (
          <Box mb="1rem">
            <NotificationCard
              nature="info"
              message="Complétez votre brief pour demander à publier la campagne"
            />
          </Box>
        )}
        {publishButtonIsShown && (
          <div>
            <MainButton
              onClick={handlePublishCampaign}
              disabled={toggleArchiveCampaignStatus.loading || !campaignIsComplete}
              noMargin
            >
              {toggleArchiveCampaignStatus.loading ? 'Publication...' : 'Demander la publication'}
            </MainButton>
          </div>
        )}
      </>
    )
  }

  // Split the campaign object
  const { product, brand, targetAudience, isArchived, isReviewed, owner, ...brief } = campaign

  return (
    <ErrorBoundary message="Le brief n'a pas pu être affiché">
      <ContainerBox ref={selfRef}>
        <FullHeightFlex
          flexDirection={['column', 'column', 'row']}
          justifyContent="space-between"
          height={`${availableHeight}px`}
          style={{ position: 'relative' }}
        >
          <FormBox width={[1, 1, 8 / 12]}>
            <PageHeader
              title="Brief de la campagne"
              destination={`/brand/campaigns/${campaign._id}`}
            />
            {showPublishButton()}
            <CampaignFormProduct product={product} campaignId={campaign._id} />
            <CampaignFormBrief brief={brief} />
            <CampaignFormBrand brand={brand} />
            <CampaignFormTargetAudience targetAudience={targetAudience} campaignId={campaign._id} />
            {showPublishButton()}
            {/* Some whitespace because there is no footer on this page */}
            <Box mb="1rem" />
          </FormBox>
          <FormBox flex={1} style={{ overflow: 'hidden' }}>
            <PreviewColumn>
              <Box py="1rem">
                <SubTitle isCentered noMargin>
                  Aperçu en direct
                </SubTitle>
                <p style={{ textAlign: 'center', color: palette.grey._500 }}>
                  Voici ce que verront les influenceurs
                </p>
              </Box>
              <PhoneMockup>
                <StyledFrame style={{ width: '100%', height: '100%' }}>
                  <>
                    <GlobalStyle />
                    <Box px="1rem">
                      <Title>{campaign.name}</Title>
                      <Box mt="-3rem">
                        <ExperiencePresentation experienceId={campaign._id} />
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
