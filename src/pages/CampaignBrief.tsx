import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Flex, Box } from '@rebass/grid'
import StyledFrame from 'react-styled-frame'
import styled from 'styled-components'
import CampaignBriefIntro from '../components/CampaignBriefIntro'
import CampaignBriefGift from '../components/CampaignBriefGift'
import CampaignBriefTask, { mandatoryRules, defaultRules } from '../components/CampaignBriefTask'
import ErrorBoundary from '../components/ErrorBoundary'
import {
  ICampaign,
  ICampaignSettings,
  ICampaignBrief,
  ICampaignGift,
  ICampaignTask,
  ICampaignTarget,
  defaultTask,
} from '../models/Campaign'
import { IRequestStatus } from '../utils/request'
import ErrorCard from '../components/ErrorCard'
import { MainLink, MainButton } from '../styles/Button'
import IState from '../models/State'
import { usePageTitle, useDebounce, useRenderCount, useRect } from '../utils/hooks'
import CampaignBriefTarget from '../components/CampaignBriefTarget'
import PhoneMockup from '../components/PhoneMockup'
import ExperiencePresentation from '../components/ExperiencePresentation'
import { Title, SubTitle } from '../styles/Text'
import PageHeader from '../components/PageHeader'
import { ContainerBox } from '../styles/grid'
import { saveCampaignBrief, toggleArchiveCampaign } from '../actions/campaigns'
import Toast from '../components/Toast'
import { GlobalStyle } from '../components/App/style'
import { palette } from '../utils/colors'
import SuccessCard from '../components/SuccessCard'
import NotificationCard from '../components/NotificationCard'
import { IBrand } from '../models/Brand'
import CampaignBriefBrand from '../components/CampaignBriefBrand'

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

interface IMatchParams {
  campaignId: string
}

const initialSettings: ICampaignSettings = {
  brief: {
    description: '',
  },
  brand: {
    name: '',
    link: '',
    logo: '',
  },
  gift: {
    valueIsShown: false,
    name: '',
    picture: '',
    link: '',
  },
  target: {
    gender: null,
    country: null,
    city: null,
  },
  task: {
    ...defaultTask,
    rules: [...mandatoryRules, ...defaultRules],
  },
}

interface ISettingsPayload {
  section: 'brand' | 'brief' | 'gift' | 'target' | 'task' | 'root'
  newState:
    | IBrand
    | ICampaignBrief
    | ICampaignGift
    | ICampaignTarget
    | ICampaignTask
    | { name: string }
}

const campaignReducer = (state: ICampaign, payload: ISettingsPayload): ICampaign => {
  const { section, newState } = payload
  switch (section) {
    case 'brand':
      return {
        ...state,
        settings: {
          ...state.settings,
          brand: {
            ...state.settings.brand,
            ...newState,
          },
        },
      }
    case 'brief':
      return {
        ...state,
        settings: {
          ...state.settings,
          brief: {
            ...state.settings.brief,
            ...newState,
          },
        },
      }
    case 'gift':
      return {
        ...state,
        settings: {
          ...state.settings,
          gift: {
            ...state.settings.gift,
            ...newState,
          },
        },
      }
    case 'target':
      return {
        ...state,
        settings: {
          ...state.settings,
          target: {
            ...state.settings.target,
            ...newState,
          },
        },
      }
    case 'task':
      return {
        ...state,
        settings: {
          ...state.settings,
          task: {
            ...state.settings.task,
            ...newState,
          },
        },
      }
    case 'root':
      return {
        ...state,
        name: (newState as { name: string }).name,
      }
    default:
      return state
  }
}

const CampaignBrief: React.FC<RouteComponentProps<IMatchParams>> = ({ match }) => {
  usePageTitle('Brief de la campagne')
  const { campaignId } = match.params

  // Redux stuff
  const dispatch = useDispatch()
  const reduxCampaign = useSelector<IState, ICampaign>(state =>
    state.campaigns.items.find(_campaign => _campaign._id === campaignId)
  )
  const saveSettingsStatus = useSelector<IState, IRequestStatus>(
    state => state.campaigns.requests.saveSettings
  )

  const getBaseSettings = (): ICampaignSettings => {
    // Settings don't exist
    if (reduxCampaign.settings == null) {
      return initialSettings
    }
    // Settings partially or fully exist
    const baseSettings = { ...reduxCampaign.settings }
    if (baseSettings.brief == null) {
      baseSettings.brief = initialSettings.brief
    }
    if (baseSettings.gift == null) {
      baseSettings.gift = initialSettings.gift
    }
    if (baseSettings.target == null) {
      baseSettings.target = initialSettings.target
    }
    if (baseSettings.task == null) {
      baseSettings.task = initialSettings.task
    }
    if (baseSettings.brand == null) {
      baseSettings.brand = initialSettings.brand
    }
    return baseSettings
  }

  const initialCampaign: ICampaign = {
    ...reduxCampaign,
    settings: getBaseSettings(),
  }

  const [campaign, dispatchCampaign] = React.useReducer(campaignReducer, initialCampaign)

  const debouncedCampaign = useDebounce(campaign, 1500)

  const debounceIsObsolete = debouncedCampaign !== campaign
  const renderCount = useRenderCount()
  React.useEffect(() => {
    if (!debounceIsObsolete && renderCount > 0) {
      // Save on server
      dispatch(saveCampaignBrief({ newCampaign: campaign, campaignId }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [campaign, campaignId, debounceIsObsolete, dispatch])

  // Calculate available vertical space
  const selfRef = React.useRef(null)
  const box = useRect(selfRef)
  const availableHeight = window.innerHeight - box.top

  const handlePublishCampaign = () => {
    dispatch(toggleArchiveCampaign(campaignId))
  }
  const publishStatus = useSelector<IState, IRequestStatus>(
    state => state.campaigns.requests.toggleArchiveCampaign
  )
  const showPublishButton = () => {
    const publishButtonIsShown = reduxCampaign.isArchived && !reduxCampaign.isReviewed
    const campaignIsComplete =
      campaign.settings != null &&
      campaign.settings.brand &&
      campaign.settings.brand.name &&
      campaign.settings.brand.logo &&
      campaign.settings.brand.link &&
      campaign.settings.brief.description &&
      campaign.settings.gift.name &&
      campaign.settings.gift.details &&
      campaign.settings.gift.picture &&
      campaign.settings.task.formats
    return (
      <>
        {publishStatus.hasFailed && (
          <ErrorCard noMargin message="Votre demande n'a pas pu être enregistrée" />
        )}
        {!reduxCampaign.isArchived && !reduxCampaign.isReviewed && (
          <SuccessCard
            noMargin
            message="Votre demande a été enregistrée. Nous allons vérifier votre campagne et vous recontacter"
          />
        )}
        {!reduxCampaign.isArchived && reduxCampaign.isReviewed && (
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
              disabled={publishStatus.isLoading || !campaignIsComplete}
              noMargin
            >
              {publishStatus.isLoading ? 'Publication...' : 'Demander la publication'}
            </MainButton>
          </div>
        )}
      </>
    )
  }

  return (
    <ErrorBoundary message="Le brief n'a pas pu être affiché">
      <ContainerBox ref={selfRef}>
        {saveSettingsStatus.isLoading && <Toast nature="loading" text="Enregistrement..." />}
        {saveSettingsStatus.hasSucceeded && !debounceIsObsolete && (
          <Toast nature="success" text="Changements enregistrés" disappear />
        )}
        {saveSettingsStatus.hasFailed && (
          <Toast nature="error" text="Échec de l'enregistrement" disappear />
        )}
        {campaign == null && !saveSettingsStatus.isLoading && !saveSettingsStatus.hasSucceeded ? (
          <>
            <ErrorCard message="Cette campagne n'existe pas" />
            <MainLink to="/campaigns" display="inline">
              Retour aux campagnes
            </MainLink>
          </>
        ) : (
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
              <CampaignBriefBrand
                brand={campaign.settings.brand}
                setBrand={(newState: IBrand) => {
                  dispatchCampaign({ section: 'brand', newState })
                }}
              />
              <CampaignBriefIntro
                brief={campaign.settings.brief}
                setBrief={(newState: ICampaignBrief) =>
                  dispatchCampaign({ section: 'brief', newState })
                }
                name={campaign.name}
                setName={(newName: string) =>
                  dispatchCampaign({ section: 'root', newState: { name: newName } })
                }
              />
              <CampaignBriefGift
                gift={campaign.settings.gift}
                setGift={(newState: ICampaignGift) =>
                  dispatchCampaign({ section: 'gift', newState })
                }
              />
              <CampaignBriefTarget
                target={campaign.settings.target}
                setTarget={(newState: ICampaignTarget) =>
                  dispatchCampaign({ section: 'target', newState })
                }
              />
              <CampaignBriefTask
                task={campaign.settings.task}
                setTask={(newState: ICampaignTask) =>
                  dispatchCampaign({ section: 'task', newState })
                }
              />
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
                          <ExperiencePresentation experience={campaign} />
                        </Box>
                      </Box>
                    </>
                  </StyledFrame>
                </PhoneMockup>
              </PreviewColumn>
            </FormBox>
          </FullHeightFlex>
        )}
      </ContainerBox>
    </ErrorBoundary>
  )
}

export default withRouter(CampaignBrief)
