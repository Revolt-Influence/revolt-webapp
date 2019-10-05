import { Box } from '@rebass/grid'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { getCampaignStatus } from '../pages/CampaignDashboard'
import { Dot } from '../styles/Dot'
import { palette } from '../utils/colors'
import { capitalizeFirstLetter } from '../utils/strings'
import { setFont, shadow } from '../utils/styles'
import { GetCampaigns_campaigns_items } from '../__generated__/GetCampaigns'
import { CollabStatus } from '../__generated__/globalTypes'
import ImageWrapper from './ImageWrapper'

const Style = styled(Box)`
  .rewardWrapper {
    position: relative;
    width: 100%;
    max-width: 100%;
    /* Force 4:3 aspect ration (3/4 = 75%) */
    height: 0;
    padding-bottom: 75%;
    box-shadow: ${shadow._200};
    border-radius: 8px;
    overflow: hidden;
    transition: 0.3s all ease-in-out;
    &:hover {
      box-shadow: ${shadow._300};
    }
    > img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .placeholder {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 0 1rem;
      background: ${palette.grey._200};
      color: ${palette.grey._500};
    }
  }

  .stat {
    margin-top: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.01em;
    color: ${palette.blue._600};
    ${setFont(600, 'small')}
  }

  h3.title {
    ${setFont(500, 'big')}
  }

  .status {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    background: rgba(255, 255, 255, 0.85);
    padding: 0 1rem;
    line-height: 3.5rem;
    border-radius: 8px;
    /* border: 2px solid ${palette.grey._200}; */
    box-shadow: ${shadow._100};
    ${setFont(600, 'normal')}
  }
`

interface Props {
  campaign: GetCampaigns_campaigns_items
}

const CampaignPreviewCard: React.FC<Props> = ({ campaign }) => {
  const { collabs, product, name } = campaign
  const collabsCount = collabs.filter(
    _collab =>
      _collab.status === CollabStatus.ACCEPTED ||
      _collab.status === CollabStatus.SENT ||
      _collab.status === CollabStatus.DONE
  ).length
  const requestsCount = collabs.filter(_collab => _collab.status === CollabStatus.REQUEST).length
  const status = getCampaignStatus(campaign)

  const showStatusLabel = () => (
    <div className="status">
      <Dot small color={status.color} />
      {status.name}
    </div>
  )

  return (
    <Link to={`/brand/campaigns/${campaign._id}`}>
      <Style mt={[0, 0, 0]} p={[0, 0, 0]}>
        <ImageWrapper
          src={product.pictures.length > 0 ? product.pictures[0] : null}
          alt={name}
          ratio={4 / 3}
          placeholderText="Add a game image in the brief"
          showLabel={showStatusLabel}
        />
        <p className="stat">
          {requestsCount === 0 && collabsCount === 0
            ? 'No requests'
            : `${requestsCount} requests${requestsCount > 1 ? 's' : ''} · ${collabsCount} collab${
                collabsCount > 1 ? 's' : ''
              }`}
        </p>
        <h3 className="title">{capitalizeFirstLetter(name)}</h3>
      </Style>
    </Link>
  )
}

export default CampaignPreviewCard
