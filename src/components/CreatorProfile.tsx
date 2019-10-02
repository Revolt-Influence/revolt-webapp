import { useLazyQuery, useMutation, useQuery } from '@apollo/react-hooks'
import { Flex } from '@rebass/grid'
import { gql } from 'apollo-boost'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { palette } from '../utils/colors'
import { applyCloudinaryTransformations } from '../utils/images'
import { yearToAge } from '../utils/stats'
import { setFont, shadow } from '../utils/styles'
import { Creator, CreatorVariables } from '../__generated__/Creator'
import { GetCollab, GetCollabVariables } from '../__generated__/GetCollab'
import { CollabStatus, ReviewCollabDecision } from '../__generated__/globalTypes'
import {
  ReviewCollabApplication,
  ReviewCollabApplicationVariables,
} from '../__generated__/ReviewCollabApplication'
import AudienceInsights from './AudienceInsights'
import { REVIEW_COLLAB_APPLICATION } from './BrandCollabCard'
import Dropdown from './Dropdown'
import ErrorCard from './ErrorCard'
import YoutubePreview, { YOUTUBER_PROFILE_FRAGMENT } from './YoutubePreview'

const checkSource = require('../images/icons/check_white.svg')
const closeSource = require('../images/icons/close_white.svg')
const contactSource = require('../images/icons/email_white.svg')

const placeholderPicture = 'https://dummyimage.com/40x40/d8dee3/D8DEE3.jpg'

const Styles = styled.div`
  background: ${palette.grey._50};

  .profilePicture {
    width: 12rem;
    height: 12rem;
    object-fit: cover;
    margin-right: 2rem;
    border-radius: 50%;
    box-shadow: ${shadow.inset};
    border: 4px solid ${palette.pink._300};
  }

  .name {
    ${setFont(600, 'big')}
    margin-bottom: 1rem;
  }

  .message {
    margin-top: 2rem;
    white-space: pre-wrap;
  }

  .label {
    ${setFont(600, 'normal')}
    color: ${palette.grey._600};
  }

  .action {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    border-radius: 8px;
    color: ${palette.grey._50};
    transition: 0.3s all ease-in-out;
    p {
      margin: 0 0.5rem;
    }
    &:not(:last-child) {
      margin-right: 1.5rem;
    }
    img {
      width: 3rem;
      height: auto;
    }
    &.accept {
      background: ${palette.green._500};
      &:hover {
        background: ${palette.green._600};
      }
    }
    &.refuse {
      background: ${palette.red._500};
      &:hover {
        background: ${palette.red._600};
      }
    }
    &.contact {
      background: ${palette.blue._500};
      &:hover {
        background: ${palette.blue._600};
      }
    }
  }
  h2.section {
    margin-top: 2rem;
    margin-bottom: 1rem;
    ${setFont(600, 'big')}
  }
  .mentionedBrand {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    img {
      border-radius: 50%;
      width: 3rem;
      height: 3rem;
      object-fit: contain;
    }
    a {
      margin-right: 2rem;
      margin-left: 0.5rem;
      &:hover {
        text-decoration: underline;
        color: ${palette.blue._700};
      }
    }
    p.category {
      color: ${palette.grey._500};
    }
  }
`

export const CREATOR_PROFILE_FRAGMENT = gql`
  fragment CreatorProfileFragment on Creator {
    _id
    name
    picture
    country
    birthYear
    youtube {
      ...YoutuberProfileFragment
    }
  }
  ${YOUTUBER_PROFILE_FRAGMENT}
`

export const GET_CREATOR = gql`
  query Creator($creatorId: String!) {
    creator(id: $creatorId) {
      ...CreatorProfileFragment
    }
  }
  ${CREATOR_PROFILE_FRAGMENT}
`

export const GET_COLLAB = gql`
  query GetCollab($collabId: String!) {
    collab(collabId: $collabId) {
      _id
      status
      message
      updatedAt
      conversation {
        _id
      }
    }
  }
`

interface Props {
  creatorId: string
  collabId?: string
  handleAccept?: () => any
  handleRefuse?: () => any
}

interface AdvertisingPerformance {
  type: 'Mauvaise' | 'Normale' | 'Bonne'
  color: string
}

const CreatorProfile: React.FC<Props> = ({ creatorId, collabId, handleAccept, handleRefuse }) => {
  const {
    data: { creator } = { creator: null },
    loading: creatorLoading,
    error: creatorError,
  } = useQuery<Creator, CreatorVariables>(GET_CREATOR)

  const [
    fetchCollab,
    { data: { collab } = { collab: null }, loading: collabLoading, error: collabError },
  ] = useLazyQuery<GetCollab, GetCollabVariables>(GET_COLLAB)

  if (collabId) {
    // Only get collab data if an ID is specified
    fetchCollab()
  }

  const [reviewCollabApplication] = useMutation<
    ReviewCollabApplication,
    ReviewCollabApplicationVariables
  >(REVIEW_COLLAB_APPLICATION)

  const getStatusDropdownSelected = (): string => {
    switch (collab.status) {
      case CollabStatus.ACCEPTED:
        return 'Accepté'
      case CollabStatus.DENIED:
        return 'Refusé'
      case CollabStatus.SENT:
        return 'Produit envoyé'
      default:
        return collab.status
    }
  }

  const statusDropdownSelected = getStatusDropdownSelected()

  if (creatorLoading || collabLoading) {
    return <p>Chargement du profil...</p>
  }
  if (creatorError || collabError) {
    return <ErrorCard message="Le profil n'a pas pu être chargé" noMargin />
  }

  // Destructure creator data
  const { birthYear, country, name, picture } = creator
  const { youtube } = creator
  const hasYoutube = youtube != null

  const showContactButton = () => (
    <Link
      to={`/brand/messages/${collab.conversation._id}`}
      className="action contact"
      type="button"
    >
      <p>Contacter</p>
      <img src={contactSource} alt="Email" />
    </Link>
  )

  return (
    <Styles>
      <Flex flexDirection="row" alignItems="center">
        <img
          src={applyCloudinaryTransformations(picture, { width: 160 }) || placeholderPicture}
          alt={name}
          className="profilePicture"
        />
        <div>
          <h1 className="name">{name}</h1>
          <p>
            {yearToAge(birthYear)} ans, {country}
          </p>
        </div>
      </Flex>
      {collab && (
        <p className="message">
          <span className="label">Message :</span> {collab.message}
        </p>
      )}
      <Flex flexDirection="row" justifyContent="space-between" mt="2rem">
        {handleAccept != null && handleRefuse != null ? (
          <>
            <Flex flexDirection="row" justifyContent="space-between">
              <button className="action accept" type="button" onClick={handleAccept}>
                <p>Accepter</p>
                <img src={checkSource} alt="Accept" />
              </button>
              <button className="action refuse" type="button" onClick={handleRefuse}>
                <p>Refuser</p>
                <img src={closeSource} alt="Refuse" />
              </button>
            </Flex>
            {collab && showContactButton()}
          </>
        ) : (
          collabId && (
            <>
              {showContactButton()}
              <Dropdown
                options={
                  [
                    ReviewCollabDecision.ACCEPT,
                    ReviewCollabDecision.DENY,
                    ReviewCollabDecision.MARK_AS_SENT,
                  ] as ReviewCollabDecision[]
                }
                selection={statusDropdownSelected}
                handleChange={(newSelection: ReviewCollabDecision) => {
                  reviewCollabApplication({
                    variables: {
                      collabId: collabId,
                      decision: newSelection,
                    },
                  })
                }}
              />
            </>
          )
        )}
      </Flex>
      {/* Networks preview */}
      {youtube && <h2 className="section">Plateformes</h2>}
      <section>{hasYoutube && <YoutubePreview youtuberId={youtube._id} />}</section>
      {/* Youtube analytics */}
      {youtube && (
        <section>
          {youtube.audience && (
            <>
              {/* Gender chart */}
              <h2 className="section">Audience YouTube</h2>
              <AudienceInsights youtuberAudience={youtube.audience} />
            </>
          )}
        </section>
      )}
    </Styles>
  )
}

export default CreatorProfile
