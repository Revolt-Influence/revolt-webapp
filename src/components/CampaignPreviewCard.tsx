import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { Box } from '@rebass/grid'
import { ICampaign } from '../models/Campaign'
import { capitalizeFirstLetter } from '../utils/strings'
import { palette } from '../utils/colors'
import { shadow, setFont } from '../utils/styles'
import { ICollab } from '../models/Collab'
import IState from '../models/State'
import { getCampaignStatus } from '../pages/CampaignDashboard'
import { Dot } from '../styles/Dot'
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

interface ICampaignPreviewCardProps {
  campaign: ICampaign
}

const CampaignPreviewCard: React.FC<ICampaignPreviewCardProps> = ({ campaign }) => {
  const collabs = useSelector<IState, ICollab[]>(state =>
    state.collabs.items.filter(_collab => _collab.campaign === campaign._id)
  )
  const collabsCount = collabs.filter(
    _collab =>
      _collab.status === 'accepted' || _collab.status === 'sent' || _collab.status === 'done'
  ).length
  const propositionsCount = collabs.filter(_collab => _collab.status === 'proposed').length
  const picture =
    campaign && campaign.settings && campaign.settings.gift && campaign.settings.gift.picture
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
          src={picture}
          alt={campaign.name}
          ratio={4 / 3}
          placeholderText="Ajoutez une photo du cadeau dans le brief"
          showLabel={showStatusLabel}
        />
        <p className="stat">
          {propositionsCount === 0 && collabsCount === 0
            ? 'Pas encore de propositions'
            : `${propositionsCount} proposition${
                propositionsCount > 1 ? 's' : ''
              } · ${collabsCount} collab${collabsCount > 1 ? 's' : ''}`}
        </p>
        <h3 className="title">{capitalizeFirstLetter(campaign.name)}</h3>
      </Style>
    </Link>
  )
}

export default CampaignPreviewCard
