import React from 'react'
import { Flex } from '@rebass/grid'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { ContainerBox } from '../styles/grid'
import SplitView from './SplitView'
import { MainButton, MainLink } from '../styles/Button'
import ErrorCard from './ErrorCard'
import { Dot } from '../styles/Dot'
import { BoldText } from '../styles/Text'
import { useIsAdmin } from '../utils/hooks'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_CAMPAIGN, CampaignStatus, getCampaignStatus } from '../pages/CampaignDashboard'
import { GetCampaign, GetCampaignVariables } from '../__generated__/GetCampaign'
import Loader from './Loader'
import { TOGGLE_ARCHIVE_CAMPAIGN } from '../pages/CampaignForm'
import {
  ToggleArchiveCampaign,
  ToggleArchiveCampaignVariables,
} from '../__generated__/ToggleArchiveCampaign'
import gql from 'graphql-tag'
import { ReviewCampaign, ReviewCampaignVariables } from '../__generated__/ReviewCampaign'
import { DeleteCampaign, DeleteCampaignVariables } from '../__generated__/DeleteCampaign'

const REVIEW_CAMPAIGN = gql`
  mutation ReviewCampaign($campaignId: String!) {
    reviewCampaign(campaignId: $campaignId) {
      _id
      isArchived
      isReviewed
    }
  }
`

const DELETE_CAMPAIGN = gql`
  mutation DeleteCampaign($campaignId: String!) {
    deleteCampaign(campaignId: $campaignId)
  }
`

interface ICampaignSettingsProps extends RouteComponentProps {
  campaignId: string
}

const CampaignSettings: React.FC<ICampaignSettingsProps> = ({ campaignId, history }) => {
  // Get campaign query
  const { data: { campaign } = { campaign: null }, ...getCampaignRequestStatus } = useQuery<
    GetCampaign,
    GetCampaignVariables
  >(GET_CAMPAIGN, { variables: { campaignId } })
  // Toggle archive mutation
  const [toggleArchiveCampaign, toggleArchiveCampaignStatus] = useMutation<
    ToggleArchiveCampaign,
    ToggleArchiveCampaignVariables
  >(TOGGLE_ARCHIVE_CAMPAIGN)
  // Review campaign mutation
  const [reviewCampaign, reviewCampaignStatus] = useMutation<
    ReviewCampaign,
    ReviewCampaignVariables
  >(REVIEW_CAMPAIGN)
  // Delete campaign mutation
  const [deleteCampaign, { loading: deletingCampaign, error: deleteError }] = useMutation<
    DeleteCampaign,
    DeleteCampaignVariables
  >(DELETE_CAMPAIGN, { onCompleted: () => history.push('/') })

  const isAdmin = useIsAdmin()

  if (getCampaignRequestStatus.loading) {
    return <Loader />
  }
  if (getCampaignRequestStatus.error) {
    return <ErrorCard />
  }

  const status = getCampaignStatus(campaign)

  const showToggleArchiveButtonText = () => {
    if (campaign.isArchived) {
      return toggleArchiveCampaignStatus.loading ? 'Publishing campaign...' : 'Publish campaign'
    }
    return toggleArchiveCampaignStatus.loading ? 'Archiving campaign...' : 'Archive campaign'
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
        {toggleArchiveCampaignStatus.error && <ErrorCard message="Could not save your changes" />}
        {status.name === CampaignStatus.INCOMPLETE ? (
          <MainLink to={`/brand/campaigns/${campaign._id}/brief`}>Fill my brief</MainLink>
        ) : (
          status.name !== CampaignStatus.AWAITING_REVIEW && (
            <MainButton
              nature={campaign.isArchived ? 'primary' : 'danger'}
              disabled={toggleArchiveCampaignStatus.loading}
              onClick={() => toggleArchiveCampaign({ variables: { campaignId } })}
              inverted={!campaign.isArchived}
            >
              {showToggleArchiveButtonText()}
            </MainButton>
          )
        )}
      </SplitView>
      {/* Review campaign (admin only) */}
      {isAdmin && !campaign.isReviewed && !campaign.isArchived && (
        <SplitView title="Accept the campaign">
          <p>
            La campagne est actuellement en attente de modération. Si vous la validez, elle
            deviendra accessible à tous les influenceurs.
          </p>
          {reviewCampaignStatus.error && <ErrorCard message="Could not accept the campaign" />}
          <MainButton
            onClick={() => reviewCampaign({ variables: { campaignId } })}
            disabled={reviewCampaignStatus.loading}
          >
            {reviewCampaignStatus.loading ? 'Accepting...' : 'Accept the campaign'}
          </MainButton>
        </SplitView>
      )}
      {/* Campaign owner (admin only) */}
      {isAdmin && (
        <SplitView title="Owner">
          <p>
            Le propriétaire de cette campagne est <BoldText>{campaign.owner.email}</BoldText>
          </p>
        </SplitView>
      )}
      {/* Delete campaign */}
      {showDelete && (
        <SplitView title="Delete the campaign">
          <p>Cette action est irréversible.</p>
          {deleteError && <ErrorCard message="Could not delete the campaign" />}
          <MainButton
            inverted
            nature="danger"
            disabled={deletingCampaign}
            onClick={() => deleteCampaign({ variables: { campaignId } })}
          >
            {deletingCampaign ? 'Deleting the campaign...' : 'Delete the campaign'}
          </MainButton>
        </SplitView>
      )}
    </ContainerBox>
  )
}

export default withRouter(CampaignSettings)
