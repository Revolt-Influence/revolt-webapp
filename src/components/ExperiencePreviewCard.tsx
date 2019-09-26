import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Flex, Box } from '@rebass/grid'
import { ICampaign } from '../models/Campaign'
import { capitalizeFirstLetter } from '../utils/strings'
import { palette } from '../utils/colors'
import { shadow, setFont } from '../utils/styles'
import { getCurrencySymbol } from '../utils/currency'
import ImageWrapper from './ImageWrapper'
import { applyCloudinaryTransformations } from '../utils/images'

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

interface IExperiencePreviewCardProps {
  experience: ICampaign
}

const ExperiencePreviewCard: React.FC<IExperiencePreviewCardProps> = ({ experience }) => {
  const { picture } = experience.settings.gift
  const showPrice = () => (
    <p className="price">
      {experience.settings.gift.value} {getCurrencySymbol(experience.settings.gift.currency)}
    </p>
  )
  const priceIsShown = experience.settings.gift.valueIsShown && experience.settings.gift != null

  return (
    <Link to={`/creator/experiences/${experience._id}`} onClick={() => window.scrollTo(0, 0)}>
      <Style>
        <ImageWrapper
          src={picture}
          alt={experience.name}
          ratio={4 / 3}
          placeholderText="Pas de photo du cadeau"
          showLabel={priceIsShown ? showPrice : null}
        />
        <h3 className="title">{capitalizeFirstLetter(experience.name)}</h3>
        <div className="brand">
          <Flex flexDirection="row" alignItems="center" justifyContent="flex-start">
            <img
              className="logo"
              src={applyCloudinaryTransformations(experience.settings.brand.logo, {
                width: 150,
              })}
              alt={experience.settings.brand.name}
            />
            <p>{experience.settings.brand.name}</p>
          </Flex>
        </div>
      </Style>
    </Link>
  )
}

export default ExperiencePreviewCard
