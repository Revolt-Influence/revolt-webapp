import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Flex, Box } from '@rebass/grid'
import { capitalizeFirstLetter } from '../utils/strings'
import { palette, paletteColorName } from '../utils/colors'
import { shadow, setFont } from '../utils/styles'
import { Status } from '../styles/Status'
import ImageWrapper from './ImageWrapper'
import { CollabStatus } from '../__generated__/globalTypes'
import gql from 'graphql-tag'
import { CREATOR_CAMPAIGN_PRESENTATION_FRAGMENT } from './CreatorCampaignPresentation'
import { CreatorCollabFragment } from '../__generated__/CreatorCollabFragment'

const Style = styled(Box)`
  h3.title {
    margin-top: 1rem;
    ${setFont(500, 'big')}
  }

  .brand {
    color: ${palette.grey._500};
    margin-top: 0.4rem;
  }

  img.logo {
    width: 3.5rem;
    height: 3.5rem;
    object-fit: contain;
    border-radius: 50%;
    box-shadow: ${shadow.inset};
    margin-right: 1rem;
  }

  .price {
    background: rgba(255, 255, 255, 0.6);
    padding: 0.5rem 1rem;
    border-radius: 8px;
    ${setFont(600, 'normal')}
    &:after {
      content: '';
      position: absolute;
      height: 0.3rem;
      width: 100%;
      left: 50%;
      top: calc(50% - 0.15rem);
      background: ${palette.grey._900};
      opacity: 0.5;
      transform: translateX(-50%) rotate(30deg);
      max-width: 5rem;
    }
  }
`

export const CREATOR_COLLAB_FRAGMENT = gql`
  fragment CreatorCollabFragment on Collab {
    _id
    status
    updatedAt
    campaign {
      ...CreatorCampaignPresentationFragment
    }
  }
  ${CREATOR_CAMPAIGN_PRESENTATION_FRAGMENT}
`

interface Props {
  collab: CreatorCollabFragment
}

const CreatorCollabCard: React.FC<Props> = ({ collab }) => {
  const formatStatus = (): { name: string; color: paletteColorName } => {
    switch (collab.status) {
      case CollabStatus.REQUEST:
        return {
          name: 'waiting for an answer',
          color: 'grey',
        }
      case CollabStatus.ACCEPTED:
        return {
          name: 'game not sent yet',
          color: 'blue',
        }
      case CollabStatus.SENT:
        return {
          name: 'waiting for your review',
          color: 'orange',
        }
      case CollabStatus.DONE:
        return {
          name: 'collab complete',
          color: 'green',
        }
      default:
        return {
          name: collab.status,
          color: 'grey',
        }
    }
  }
  const status = formatStatus()

  const { campaign } = collab

  return (
    <Link to={`/creator/games/${campaign._id}`}>
      <Style mt={[0, 0, 0]} p={[0, 0, 0]}>
        <ImageWrapper
          src={campaign.product.pictures[0]}
          alt={campaign.product.name}
          ratio={16 / 9}
        />
        <h3 className="title">{capitalizeFirstLetter(campaign.product.name)}</h3>
        <div className="brand">
          <Flex flexDirection="row" alignItems="center" justifyContent="flex-start">
            <img className="logo" src={campaign.brand.logo} alt={campaign.brand.name} />
            <p>{campaign.brand.name}</p>
          </Flex>
        </div>
        <Flex flexDirection="row" alignItems="center" justifyContent="space-between" mt="1rem">
          <Status color={status.color}>{status.name}</Status>
        </Flex>
      </Style>
    </Link>
  )
}

export default CreatorCollabCard
