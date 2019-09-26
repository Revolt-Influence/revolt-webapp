import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Flex } from '@rebass/grid'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { ICampaign, ICampaignStatus } from '../models/Campaign'
import { ContainerBox } from '../styles/grid'
import SplitView from './SplitView'
import { MainButton, MainLink } from '../styles/Button'
import IState from '../models/State'
import { IRequestStatus } from '../utils/request'
import ErrorCard from './ErrorCard'
import { toggleArchiveCampaign, deleteCampaign, reviewCampaign } from '../actions/campaigns'
import SuccessCard from './SuccessCard'
import { Dot } from '../styles/Dot'
import { BoldText } from '../styles/Text'
import { useIsAdmin } from '../utils/hooks'

interface ICampaignSettingsProps extends RouteComponentProps {
  campaign: ICampaign
  status: ICampaignStatus
}

const CampaignSettings: React.FC<ICampaignSettingsProps> = ({ campaign, status, history }) => {
  const dispatch = useDispatch()
  const archiveStatus = useSelector<IState, IRequestStatus>(
    state => state.campaigns.requests.toggleArchiveCampaign
  )
  const deleteStatus = useSelector<IState, IRequestStatus>(
    state => state.campaigns.requests.deleteCampaign
  )
  const reviewStatus = useSelector<IState, IRequestStatus>(
    state => state.campaigns.requests.reviewCampaign
  )
  const isAdmin = useIsAdmin()

  const showToggleArchiveButtonText = () => {
    if (campaign.isArchived) {
      return archiveStatus.isLoading ? 'Publication de la campagne...' : 'Publier la campagne'
    }
    return archiveStatus.isLoading ? 'Archivage de la campagne...' : 'Archiver la campagne'
  }

  const handleDeleteCampaign = () => {
    dispatch(deleteCampaign(campaign._id))
    history.push('/')
  }

  const getShowDelete = () => {
    // Get if campaign is complete
    if (!campaign.isReviewed) {
      return true
    }
    // Always show for admin users
    if (isAdmin) {
      return true
    }
    // Otherwise don't show delete section
    return false
  }
  const showDelete = getShowDelete()

  return (
    <ContainerBox>
      {/* Archive campaign */}
      <SplitView title="Statut de la campagne" noBorder>
        <Flex flexDirection="row" alignItems="center" mb="1rem">
          <Dot color={status.color} />
          <BoldText>{status.name}</BoldText>
        </Flex>
        <p>{status.description}</p>
        {archiveStatus.hasFailed && (
          <ErrorCard message="Vos changements n'ont pas pu être enregistrés" />
        )}
        {archiveStatus.hasSucceeded && (
          <SuccessCard message="Vos changements ont bien été enregistrés" />
        )}
        {status.name === 'Incomplet' ? (
          <MainLink to={`/brand/campaigns/${campaign._id}/brief`}>Remplir mon brief</MainLink>
        ) : (
          status.name !== 'En attente de modération' && (
            <MainButton
              nature={campaign.isArchived ? 'primary' : 'danger'}
              disabled={archiveStatus.isLoading}
              onClick={() => dispatch(toggleArchiveCampaign(campaign._id))}
              inverted={!campaign.isArchived}
            >
              {showToggleArchiveButtonText()}
            </MainButton>
          )
        )}
      </SplitView>
      {/* Review campaign (admin only) */}
      {isAdmin && !campaign.isReviewed && !campaign.isArchived && (
        <SplitView title="Valider la campagne">
          <p>
            La campagne est actuellement en attente de modération. Si vous la validez, elle
            deviendra accessible à tous les influenceurs.
          </p>
          {reviewStatus.hasFailed && <ErrorCard message="La campagne n'a pas pu être supprimée" />}
          <MainButton
            onClick={() => dispatch(reviewCampaign(campaign._id))}
            disabled={reviewStatus.isLoading}
          >
            {reviewStatus.isLoading ? 'Validation...' : 'Valider la campagne'}
          </MainButton>
        </SplitView>
      )}
      {/* Campaign owner (admin only) */}
      {isAdmin && (
        <SplitView title="Propriétaire">
          <p>
            Le propriétaire de cette campagne est <BoldText>{campaign.owner}</BoldText>
          </p>
        </SplitView>
      )}
      {/* Delete campaign */}
      {showDelete && (
        <SplitView title="Supprimer la campagne">
          <p>Cette action est irréversible.</p>
          {deleteStatus.hasFailed && <ErrorCard message="La campagne n'a pas pu être supprimée" />}
          <MainButton
            inverted
            nature="danger"
            disabled={deleteStatus.isLoading}
            onClick={handleDeleteCampaign}
          >
            {deleteStatus.isLoading ? 'Suppression de la campagne' : 'Supprimer la campagne'}
          </MainButton>
        </SplitView>
      )}
    </ContainerBox>
  )
}

export default withRouter(CampaignSettings)
