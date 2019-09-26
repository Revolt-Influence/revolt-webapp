import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Flex } from '@rebass/grid'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { ContainerBox } from '../styles/grid'
import { ICampaign } from '../models/Campaign'
import CampaignPreviewCard from '../components/CampaignPreviewCard'
import ErrorCard from '../components/ErrorCard'
import IState from '../models/State'
import { Title } from '../styles/Text'
import { MainButton } from '../styles/Button'
import { createCampaign } from '../actions/campaigns'
import { IRequestStatus } from '../utils/request'
import SuccessCard from '../components/SuccessCard'
import { usePageTitle, useRenderCount } from '../utils/hooks'
import NotificationCard from '../components/NotificationCard'
import BrandOnboarding from '../components/BrandOnboarding'

const CampaignsList: React.FC<RouteComponentProps> = ({ history }) => {
  usePageTitle('Mes campagnes')
  // Redux
  const dispatch = useDispatch()
  const campaigns = useSelector<IState, ICampaign[]>(state => state.campaigns.items)
  const createCampaignStatus = useSelector<IState, IRequestStatus>(
    state => state.campaigns.requests.createCampaign
  )

  // Go to campaign page if campaign was created
  const renderCount = useRenderCount()
  React.useEffect(() => {
    // Don't submit the form on first render
    if (createCampaignStatus.hasSucceeded && renderCount > 0) {
      window.scrollTo(0, 0)
      history.push(`/brand/campaigns/${campaigns[campaigns.length - 1]._id}/brief`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createCampaignStatus.hasSucceeded])

  if (campaigns.length === 0) {
    return (
      <ContainerBox>
        <BrandOnboarding />
      </ContainerBox>
    )
  }

  return (
    <>
      <ContainerBox>
        <Flex
          flexDirection={['column', 'row', 'row']}
          justifyContent="space-between"
          alignItems="center"
        >
          <Title>Mes campagnes</Title>
          <Box mb={['3rem', 0, 0]}>
            <MainButton
              onClick={() => dispatch(createCampaign())}
              disabled={createCampaignStatus.isLoading}
              noMargin
            >
              {createCampaignStatus.isLoading ? "Création d'une campagne..." : 'Créer une campagne'}
            </MainButton>
          </Box>
        </Flex>
      </ContainerBox>
      <ContainerBox>
        {createCampaignStatus.hasFailed && (
          <Box mb="1rem">
            <ErrorCard message="La campagne n'a pas pu être créée" noMargin />
          </Box>
        )}
        {createCampaignStatus.hasSucceeded && (
          <Box mb="1rem">
            <SuccessCard message="La campagne a bien été créée" noMargin />
          </Box>
        )}
        <Flex flexDirection="row" flexWrap="wrap" mx={[0, 0, '-2rem']} mt="-3rem" pb="2rem">
          {campaigns.length > 0 ? (
            campaigns.map(_campaign => (
              <Box
                width={[1, 6 / 12, 4 / 12]}
                mt="3rem"
                mx={['auto', 'unset', 'unset']}
                px="2rem"
                key={_campaign._id}
              >
                <CampaignPreviewCard campaign={_campaign} />
              </Box>
            ))
          ) : (
            <Box mt="2rem" px={[0, 0, '-2rem']}>
              <NotificationCard message="Pas encore de campagne" nature="info" />
            </Box>
          )}
        </Flex>
      </ContainerBox>
    </>
  )
}

export default withRouter(CampaignsList)
