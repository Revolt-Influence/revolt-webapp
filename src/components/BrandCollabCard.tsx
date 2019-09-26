import React from 'react'
import approx from 'approximate-number'
import moment from 'moment'
import 'moment/locale/fr'
import styled, { css } from 'styled-components'
import { Flex } from '@rebass/grid'
import { useDispatch } from 'react-redux'
import { CollabStatus, ICollab } from '../models/Collab'
import { palette } from '../utils/colors'
import { setFont, shadow } from '../utils/styles'
import { capitalizeFirstLetter } from '../utils/strings'
import { Row } from '../utils/grid'
import { ICreator } from '../models/Creator'
import { showProfilePanel } from '../actions/display'
import { Link } from 'react-router-dom'

moment.locale('fr')

const eyeSource = require('../images/icons/eye_white.svg')
const checkSource = require('../images/icons/check_white.svg')
const instagramSource = require('../images/icons/instagram_color.svg')
const youtubeSource = require('../images/icons/youtube_color.svg')
const contactSource = require('../images/icons/email_white.svg')

interface IStylesProps {
  status: CollabStatus
}

const Styles = styled.div`
  cursor: pointer;
  transition: 0.3s all ease-in-out;
  display: block;
  width: calc(100% - 12px);
  &:hover {
    background: ${palette.grey._100};
  }
  ${(props: IStylesProps) => {
    switch (props.status) {
      case 'accepted':
        return css`
          /* border: 2px solid ${palette.pink._300}; */
          border: 2px solid ${palette.blue._200};
        `
      case 'sent':
        return css`
          /* border: 2px solid ${palette.orange._300}; */
          border: 2px solid ${palette.orange._200};
        `
      case 'done':
        return css`
          /* border: 2px solid ${palette.green._300}; */
          border: 2px solid ${palette.green._200};
        `
      default:
        // Should not happen
        return css`
          /* border: 2px solid ${palette.grey._300}; */
          border: 2px solid ${palette.grey._200};
        `
    }
  }}
  background: ${palette.grey._50};
  margin: 6px;
  border-radius: 8px;
  padding: 1.2rem;
  color: ${palette.grey._900};
  ${setFont(500, 'normal')}

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
      margin-right: 1.2rem;
    }
    img {
      width: 3rem;
      height: auto;
    }
    &.viewProfile {
      background: ${palette.pink._500};
      &:hover {
        background: ${palette.pink._600};
      }
    }
    &.contact {
      background: ${palette.blue._500};
      &:hover {
        background: ${palette.blue._600};
      }
    }
    &.accept {
      background: ${palette.green._500};
      &:hover {
        background: ${palette.green._600};
      }
    }
  }

  img.profile {
    border-radius: 50%;
    height: 6rem;
    width: 6rem;
    margin-right: 1rem;
    box-shadow: ${shadow.inset};
  }

  p.username {
    ${setFont(600, 'normal')}
  }

  p.label {
    margin-top: 1rem;
    ${setFont(600, 'normal')}
    color: ${palette.grey._600};
    /* color: ${palette.pink._600}; */
  }

  p.date {
    ${setFont(500, 'normal')}
    color: ${palette.grey._500};
  }

  p.message {
    margin-bottom: 0.5rem;
  }

  .networkLogo {
    margin-right: 1rem;
    width: 4rem;
    height: 4rem;
    object-fit: contain;
  }
`

const Footer = styled(Flex)`
  border-top: 2px solid ${palette.grey._200};
  padding-top: 1.2rem;
  margin-top: 1.2rem;
`

const Network = styled(Flex)`
  margin: 1rem 0;
  .stat {
    ${setFont(600, 'normal')}
  }
`

interface IBrandCollabCardProps {
  collab: ICollab
  markAsSent?: () => void
  isLoading?: boolean
}

const BrandCollabCard: React.FC<IBrandCollabCardProps> = ({ collab, isLoading, markAsSent }) => {
  const dispatch = useDispatch()
  const { proposition, status, creator } = collab

  const handleShowProfile = () => {
    dispatch(
      showProfilePanel({
        creatorId: (creator as ICreator)._id,
        message: collab.proposition.message,
        formats: collab.proposition.formats,
        collabId: collab._id,
        conversationId: collab.conversation,
      })
    )
  }

  const viewProfileButton = () => (
    <button className="action viewProfile" type="button" onClick={handleShowProfile}>
      <p>Profil</p>
      <img src={eyeSource} alt="Voir" />
    </button>
  )

  const showContactButton = () => (
    <Link
      className="action contact"
      type="button"
      to={`/brand/messages/${collab.conversation}`}
      onClick={e => e.stopPropagation()}
    >
      <p>Contacter</p>
      <img src={contactSource} alt="Contacter" />
    </Link>
  )

  // Adapt footer to status
  const showFooter = () => {
    switch (status) {
      case 'accepted':
        return (
          <Footer justifyContent="space-between" alignItems="center">
            {viewProfileButton()}
            <button
              className="action accept"
              type="button"
              disabled={isLoading}
              onClick={e => {
                e.stopPropagation()
                e.preventDefault()
                markAsSent()
              }}
            >
              <p>A été envoyé</p>
              <img src={checkSource} alt="envoyé" />
            </button>
          </Footer>
        )
      case 'sent':
        return (
          <Footer justifyContent="space-between" alignItems="center">
            {viewProfileButton()}
            {showContactButton()}
          </Footer>
        )
      case 'done':
        return (
          <Footer justifyContent="space-between" alignItems="center">
            {viewProfileButton()}
            {showContactButton()}
          </Footer>
        )
      default:
        return null
    }
  }

  const formatStatus = (): string => {
    switch (status) {
      case 'accepted':
        return 'accepté'
      case 'sent':
        return 'cadeau envoyé'
      case 'done':
        return 'publié'
      default:
        return status
    }
  }

  const getLastUpdateDate = (): number => {
    switch (status) {
      case 'accepted':
        return collab.acceptedDate
      case 'refused':
        return collab.refusedDate
      case 'sent':
        return collab.sentDate
      case 'done':
        return collab.doneDate
      default:
        return collab.creationDate
    }
  }

  console.log(creator)
  const { name, instagram, picture, youtube } = creator as ICreator
  const hasInstagram = instagram != null
  const hasYoutube = youtube != null

  return (
    <Styles status={status} onClick={handleShowProfile}>
      <Row justify="flex-start">
        <img src={picture} alt={name} className="profile" />
        <div>
          <p className="username">{name}</p>
          <p className="date">
            {capitalizeFirstLetter(formatStatus())} {moment(getLastUpdateDate()).fromNow()}
          </p>
        </div>
      </Row>
      {hasInstagram && (
        <Network flexDirection="row" justifyContent="flex-start" alignItems="center">
          <img className="networkLogo" src={instagramSource} alt="IG" />
          <div>
            <p>{approx(instagram.followers)} followers</p>
            <p>{approx(instagram.likes)} likes potentiels</p>
          </div>
        </Network>
      )}
      {hasYoutube && (
        <Network flexDirection="row" justifyContent="flex-start" alignItems="center">
          <img className="networkLogo" src={youtubeSource} alt="YT" />
          <div>
            <p>{approx(youtube.subscriberCount)} abonnés</p>
            <p>{approx(youtube.viewCount / youtube.videoCount)} vues potentielles</p>
          </div>
        </Network>
      )}
      {collab.status === 'accepted' && (
        <>
          <p>{proposition.address && proposition.address}</p>
          <p>{proposition.addressLine2 && proposition.addressLine2}</p>
          {proposition.city && proposition.country ? (
            <p>
              {proposition.city && proposition.city}, {proposition.country && proposition.country}
            </p>
          ) : null}
        </>
      )}
      {showFooter()}
    </Styles>
  )
}

export default BrandCollabCard
