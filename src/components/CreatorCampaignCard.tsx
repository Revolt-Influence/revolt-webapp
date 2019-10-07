import { Box, Flex } from '@rebass/grid'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { palette } from '../utils/colors'
import { applyCloudinaryTransformations } from '../utils/images'
import { capitalizeFirstLetter } from '../utils/strings'
import { setFont, shadow } from '../utils/styles'
import ImageWrapper from './ImageWrapper'
import { GetCreatorCampaign_campaign } from '../__generated__/GetCreatorCampaign'

const Style = styled(Box)`
  h3.title {
    margin-top: 1rem;
    ${setFont(500, 'big')}
  }

  .brand {
    color: ${palette.grey._600};
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
    background: rgba(255, 255, 255, 0.75);
    padding: 0.5rem 1rem;
    border-radius: 8px;
    box-shadow: ${shadow._300};
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

interface Props {
  campaign: GetCreatorCampaign_campaign
}

const CreatorCampaignCard: React.FC<Props> = ({ campaign }) => {
  const { product, brand } = campaign
  return (
    <Link to={`/creator/games/${campaign._id}`} onClick={() => window.scrollTo(0, 0)}>
      <Style>
        <ImageWrapper
          src={product.pictures[0]}
          alt={product.name}
          ratio={4 / 3}
          placeholderText="No game picture"
        />
        <h3 className="title">{capitalizeFirstLetter(product.name)}</h3>
        <div className="brand">
          <Flex flexDirection="row" alignItems="center" justifyContent="flex-start">
            <img
              className="logo"
              src={applyCloudinaryTransformations(brand.logo, {
                width: 150,
              })}
              alt={brand.name}
            />
            <p>{brand.name}</p>
          </Flex>
        </div>
      </Style>
    </Link>
  )
}

export default CreatorCampaignCard
