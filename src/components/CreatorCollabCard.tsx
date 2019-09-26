import React from 'react'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { Flex, Box } from '@rebass/grid'
import { useDispatch, useSelector } from 'react-redux'
import { ICampaign } from '../models/Campaign'
import { capitalizeFirstLetter } from '../utils/strings'
import { palette, paletteColorName } from '../utils/colors'
import { shadow, setFont } from '../utils/styles'
import { ICollab } from '../models/Collab'
import { getCurrencySymbol } from '../utils/currency'
import { Status } from '../styles/Status'
import ErrorCard from './ErrorCard'
import IState from '../models/State'
import { IRequestStatus } from '../utils/request'
import { getCampaign } from '../actions/campaigns'
import Loader from './Loader'
import ImageWrapper from './ImageWrapper'

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

const Deadline = styled.p<{ color: paletteColorName }>`
  ${setFont(600, 'normal')}
  ${props => {
    switch (props.color) {
      case 'red':
        return css`
          color: ${palette.red._700};
        `
      case 'green':
        return css`
          color: ${palette.green._700};
        `
      case 'orange':
        return css`
          color: ${palette.orange._700};
        `
      default:
        return css`
          color: ${palette.grey._700};
        `
    }
  }}
`

interface ICreatorCollabCardProps {
  experience: ICampaign
  experienceId: string
  collab: ICollab
}

const dayTimestamp = 1000 * 60 * 60 * 24

const CreatorCollabCard: React.FC<ICreatorCollabCardProps> = ({
  experience,
  collab,
  experienceId,
}) => {
  // Redux stuff
  const dispatch = useDispatch()
  const getCampaignStatus = useSelector<IState, IRequestStatus>(
    state => state.campaigns.requests.getCampaign
  )

  // Pick the right data from the experience/collab
  const picture = experience == null ? '' : experience.settings.gift.picture
  const dueDate =
    collab.acceptedDate + (experience && experience.settings.task.daysToReview) * dayTimestamp
  const dateDiff = dueDate - Date.now() // negative if late
  let timingColor: paletteColorName = 'green'
  const dueToday = dateDiff > 0 && dateDiff < dayTimestamp
  const daysDiff = Math.floor(dateDiff / dayTimestamp)
  if (dateDiff < 0) {
    timingColor = 'red'
  } else if (dueToday) {
    timingColor = 'orange'
  }

  const formatStatus = (): { name: string; color: paletteColorName } => {
    switch (collab.status) {
      case 'proposed':
        return {
          name: 'en attente de la marque',
          color: 'grey',
        }
      case 'accepted':
        return {
          name: 'produit pas encore envoyé',
          color: 'blue',
        }
      case 'sent':
        return {
          name: 'en attente de publication',
          color: 'orange',
        }
      case 'done':
        return {
          name: 'terminé',
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

  if (getCampaignStatus.hasFailed) {
    return <ErrorCard message="La collab n'a pas pu être chargée" />
  }
  if (getCampaignStatus.isLoading) {
    return <Loader fullScreen />
  }

  if (experience == null) {
    dispatch(getCampaign(experienceId))
    return <Loader fullScreen />
  }

  const showPrice = () => (
    <p className="price">
      {experience.settings.gift.value} {getCurrencySymbol(experience.settings.gift.currency)}
    </p>
  )
  const priceIsShown =
    experience.settings.gift.valueIsShown && experience.settings.gift.valueIsShown != null

  return (
    <Link to={`/creator/experiences/${experience._id}`}>
      <Style mt={[0, 0, 0]} p={[0, 0, 0]}>
        <ImageWrapper
          src={picture}
          alt={experience.name}
          ratio={4 / 3}
          showLabel={priceIsShown ? showPrice : null}
        />
        <h3 className="title">{capitalizeFirstLetter(experience.name)}</h3>
        <div className="brand">
          <Flex flexDirection="row" alignItems="center" justifyContent="flex-start">
            <img
              className="logo"
              src={experience.settings.brand.logo}
              alt={experience.settings.brand.name}
            />
            <p>{experience.settings.brand.name}</p>
          </Flex>
        </div>
        <Flex flexDirection="row" alignItems="center" justifyContent="space-between" mt="1rem">
          <Status color={status.color}>{status.name}</Status>
          {collab.status === 'sent' ? (
            <Deadline color={timingColor}>
              {dueToday
                ? "Pour aujourd'hui"
                : `${daysDiff < 0 ? 'il y a' : 'encore'} ${Math.abs(daysDiff)} jours`}
            </Deadline>
          ) : (
            // Nothing, just to keep Flexbox alignment
            <div />
          )}
        </Flex>
      </Style>
    </Link>
  )
}

export default CreatorCollabCard
