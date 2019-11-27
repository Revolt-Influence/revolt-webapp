import React from 'react'
import approx from 'approximate-number'
import moment from 'moment'
import styled, { css } from 'styled-components'
import { Flex } from '@rebass/grid'
import { palette } from '../utils/colors'
import { setFont, shadow } from '../utils/styles'
import { capitalizeFirstLetter } from '../utils/strings'
import { Row } from '../utils/grid'
import { REVIEW_COLLAB_APPLICATION } from './ReviewCollabRequest'
import { Link } from 'react-router-dom'
import { CollabStatus, ReviewCollabDecision } from '../__generated__/globalTypes'
import { useMutation } from '@apollo/react-hooks'
import {
  ReviewCollabApplication,
  ReviewCollabApplicationVariables,
} from '../__generated__/ReviewCollabApplication'
import { GetCampaignCollabs_campaign_collabs } from '../__generated__/GetCampaignCollabs'
import { OPEN_CREATOR_PANEL } from './CreatorProfilePanel'
import { OpenCreatorPanel, OpenCreatorPanelVariables } from '../__generated__/OpenCreatorPanel'

const eyeSource = require('../images/icons/eye_white.svg')
const checkSource = require('../images/icons/check_white.svg')
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
      case CollabStatus.ACCEPTED:
        return css`
          /* border: 2px solid ${palette.pink._300}; */
          border: 2px solid ${palette.blue._200};
        `
      case CollabStatus.SENT:
        return css`
          /* border: 2px solid ${palette.orange._300}; */
          border: 2px solid ${palette.orange._200};
        `
      case CollabStatus.DONE:
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
    ${setFont(600, 'normal')}
    p {
      margin: 0 0.5rem;
    }
    &:not(:last-child) {
      margin-right: 1.2rem;
    }
    &.disabled {
      opacity: 0.5;
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
      &:hover:not(.disabled) {
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

interface Props {
  collab: GetCampaignCollabs_campaign_collabs
  isDummy?: boolean
}

const BrandCollabCard: React.FC<Props> = ({ collab, isDummy }) => {
  const { conversation, status, creator, updatedAt, _id } = collab

  // Prepare review collab
  const [reviewCollabApplication, { loading }] = useMutation<
    ReviewCollabApplication,
    ReviewCollabApplicationVariables
  >(REVIEW_COLLAB_APPLICATION)

  // Prepare open creator profile panel
  const [openCreatorPanel] = useMutation<OpenCreatorPanel, OpenCreatorPanelVariables>(
    OPEN_CREATOR_PANEL
  )

  const handleShowProfile = () => {
    openCreatorPanel({
      variables: { creatorId: creator._id, collabId: collab._id, isDummy: !!isDummy },
    })
  }

  const viewProfileButton = () => (
    <button className="action viewProfile" type="button" onClick={handleShowProfile}>
      <p>Profile</p>
      <img src={eyeSource} alt="see" />
    </button>
  )

  const showContactButton = () => (
    <Link
      className={`action contact ${isDummy ? 'disabled' : ''}`}
      type="button"
      style={isDummy && { pointerEvents: 'none' }}
      to={isDummy ? '#' : `/brand/messages/${conversation._id}`}
      onClick={e => e.stopPropagation()}
    >
      <p>Contact</p>
      <img src={contactSource} alt="Contact" />
    </Link>
  )

  // Adapt footer to status
  const showFooter = () => {
    switch (status) {
      case CollabStatus.ACCEPTED:
        return (
          <Footer justifyContent="space-between" alignItems="center">
            {viewProfileButton()}
            <button
              className="action accept"
              type="button"
              disabled={loading}
              onClick={e => {
                e.stopPropagation()
                e.preventDefault()
                reviewCollabApplication({
                  variables: {
                    collabId: _id,
                    decision: ReviewCollabDecision.MARK_AS_SENT,
                  },
                })
              }}
            >
              <p>Mark as sent</p>
              <img src={checkSource} alt="sent" />
            </button>
          </Footer>
        )
      case CollabStatus.SENT:
        return (
          <Footer justifyContent="space-between" alignItems="center">
            {viewProfileButton()}
            {showContactButton()}
          </Footer>
        )
      case CollabStatus.DONE:
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
      case CollabStatus.ACCEPTED:
        return 'accepted'
      case CollabStatus.SENT:
        return 'product sent'
      case CollabStatus.DONE:
        return 'review published'
      default:
        return status
    }
  }

  const { name, picture, youtube } = creator
  const hasYoutube = youtube != null

  return (
    <Styles status={status} onClick={handleShowProfile}>
      <Row justify="flex-start">
        <img src={picture} alt={name} className="profile" />
        <div>
          <p className="username">{name}</p>
          <p className="date">
            {capitalizeFirstLetter(formatStatus())} {moment(updatedAt).fromNow()}
          </p>
        </div>
      </Row>
      {hasYoutube && (
        <Network flexDirection="row" justifyContent="flex-start" alignItems="center">
          <img className="networkLogo" src={youtubeSource} alt="YT" />
          <div>
            <p>{approx(youtube.subscriberCount)} subscribers</p>
            <p>{approx(youtube.viewCount / youtube.videoCount)} potential views</p>
          </div>
        </Network>
      )}
      {showFooter()}
    </Styles>
  )
}

export { REVIEW_COLLAB_APPLICATION }
export default BrandCollabCard
