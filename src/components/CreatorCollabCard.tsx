import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Flex, Box } from '@rebass/grid'
import { capitalizeFirstLetter } from '../utils/strings'
import { palette, paletteColorName } from '../utils/colors'
import { shadow, setFont } from '../utils/styles'
import { Status } from '../styles/Status'
import ImageWrapper from './ImageWrapper'
import { GetCreatorCollabs_collabs } from '../__generated__/GetCreatorCollabs'
import { CollabStatus } from '../__generated__/globalTypes'
import gql from 'graphql-tag'
import { EXPERIENCE_PRESENTATION_FRAGMENT } from './ExperiencePresentation'

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

// const Deadline = styled.p<{ color: paletteColorName }>`
//   ${setFont(600, 'normal')}
//   ${props => {
//     switch (props.color) {
//       case 'red':
//         return css`
//           color: ${palette.red._700};
//         `
//       case 'green':
//         return css`
//           color: ${palette.green._700};
//         `
//       case 'orange':
//         return css`
//           color: ${palette.orange._700};
//         `
//       default:
//         return css`
//           color: ${palette.grey._700};
//         `
//     }
//   }}
// `

export const CREATOR_COLLAB_FRAGMENT = gql`
  fragment CreatorCollabFragment on Collab {
    _id
    status
    updatedAt
    campaign {
      ...ExperiencePresentationFragment
    }
  }
  ${EXPERIENCE_PRESENTATION_FRAGMENT}
`

interface Props {
  collab: GetCreatorCollabs_collabs
}

const CreatorCollabCard: React.FC<Props> = ({ collab }) => {
  const formatStatus = (): { name: string; color: paletteColorName } => {
    switch (collab.status) {
      case CollabStatus.REQUEST:
        return {
          name: 'waiting for brand answer',
          color: 'grey',
        }
      case CollabStatus.ACCEPTED:
        return {
          name: 'game not given yet',
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

  const { campaign: experience } = collab

  return (
    <Link to={`/creator/experiences/${experience._id}`}>
      <Style mt={[0, 0, 0]} p={[0, 0, 0]}>
        <ImageWrapper src={experience.product.pictures[0]} alt={experience.name} ratio={4 / 3} />
        <h3 className="title">{capitalizeFirstLetter(experience.name)}</h3>
        <div className="brand">
          <Flex flexDirection="row" alignItems="center" justifyContent="flex-start">
            <img className="logo" src={experience.brand.logo} alt={experience.brand.name} />
            <p>{experience.brand.name}</p>
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
