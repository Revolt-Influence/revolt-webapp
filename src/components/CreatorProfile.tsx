import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Flex } from '@rebass/grid'
import { useSelector, useDispatch } from 'react-redux'
import { ICreator } from '../models/Creator'
import { palette } from '../utils/colors'
import { shadow, setFont } from '../utils/styles'
import { yearToAge } from '../utils/stats'
import IState from '../models/State'
import { IRequestStatus } from '../utils/request'
import { getFullCreatorProfile } from '../actions/creators'
import ErrorCard from './ErrorCard'
import AudienceInsights from './AudienceInsights'
import { TaskFormatType } from '../models/Campaign'
import Dropdown from './Dropdown'
import { reviewCollabProposition } from '../actions/collabs'
import { ICollab } from '../models/Collab'
import YoutubePreview from './YoutubePreview'
import { applyCloudinaryTransformations } from '../utils/images'
import { Link } from 'react-router-dom'

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

interface Props {
  creatorId: string
  conversationId?: string
  message?: string
  collabId?: string
  formats?: TaskFormatType[]
  handleAccept?: () => any
  handleRefuse?: () => any
}

interface IAdvertisingPerformance {
  type: 'Mauvaise' | 'Normale' | 'Bonne'
  color: string
}

const CreatorProfile: React.FC<Props> = ({
  creatorId,
  collabId,
  message,
  handleAccept,
  handleRefuse,
  formats,
  conversationId,
}) => {
  const dispatch = useDispatch()
  const creator = useSelector<IState, ICreator>(state =>
    state.creators.items.find(_creator => _creator._id === creatorId)
  )
  const getProfileStatus = useSelector<IState, IRequestStatus>(
    state => state.creators.requests.getFullProfile
  )

  const collab = useSelector<IState, ICollab>(state =>
    state.collabs.items.find(_collab => _collab._id === collabId)
  )
  const reduxStatus = collab && collab.status

  const getStatusDropdownSelected = () => {
    switch (reduxStatus) {
      case 'accepted':
        return 'Accepté'
      case 'refused':
        return 'Refusé'
      case 'sent':
        return 'Produit envoyé'
      default:
        return reduxStatus
    }
  }

  const statusDropdownSelected = getStatusDropdownSelected()
  useEffect(() => {
    if (creator == null) {
      dispatch(getFullCreatorProfile(creatorId))
    }
  }, [creator, creatorId, dispatch])

  if (getProfileStatus.hasFailed) {
    return <ErrorCard message="Le profil n'a pas pu être chargé" noMargin />
  }
  if (getProfileStatus.isLoading || creator == null) {
    return <p>Chargement du profil...</p>
  }

  // Destructure creator data
  const { birthYear, gender, country, name, picture } = creator
  const { youtube } = creator
  const hasYoutube = youtube != null

  const showContactButton = () => (
    <Link to={`/brand/messages/${conversationId}`} className="action contact" type="button">
      <p>Contacter</p>
      <img src={contactSource} alt="Email" />
    </Link>
  )

  const translateGender = (): string => {
    switch (gender) {
      case 'female':
        return 'femme'
      case 'male':
        return 'homme'
      default:
        return 'sexe inconnu'
    }
  }

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
            {yearToAge(birthYear)} ans, {translateGender()}, {country}
          </p>
          <p>{creator.phone}</p>
        </div>
      </Flex>
      {message && (
        <p className="message">
          <span className="label">Message :</span> {message}
        </p>
      )}
      {formats && (
        <p>
          <span className="label">Plateformes :</span> {formats.join(', ')}
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
            {conversationId && showContactButton()}
          </>
        ) : (
          collabId && (
            <>
              {showContactButton()}
              <Dropdown
                options={['Accepté', 'Refusé', 'Produit envoyé']}
                selection={statusDropdownSelected}
                handleChange={newSelection => {
                  if (newSelection === 'Accepté') {
                    dispatch(reviewCollabProposition({ collabId, action: 'accept' }))
                  } else if (newSelection === 'Refusé') {
                    dispatch(reviewCollabProposition({ collabId, action: 'refuse' }))
                  } else if (newSelection === 'Produit envoyé') {
                    dispatch(reviewCollabProposition({ collabId, action: 'markAsSent' }))
                  }
                }}
              />
            </>
          )
        )}
      </Flex>
      {/* Networks preview */}
      {hasYoutube && <h2 className="section">Plateformes</h2>}
      <section>{hasYoutube && <YoutubePreview youtuber={youtube} />}</section>
      {/* Youtube analytics */}
      {hasYoutube && (
        <section>
          {youtube.audience != null && (
            <>
              {/* Gender chart */}
              <h2 className="section">Audience YouTube</h2>
              <AudienceInsights {...youtube.audience} />
            </>
          )}
        </section>
      )}
    </Styles>
  )
}

export default CreatorProfile
