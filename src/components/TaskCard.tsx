import React from 'react'
import styled from 'styled-components'
import { Flex } from '@rebass/grid'
import { ICampaignTask, TaskFormatType } from '../models/Campaign'
import { BoldText, LabelText } from '../styles/Text'

// Absolute URL so that it works in an iframe
const instagramLogo =
  'https://res.cloudinary.com/influencerz/image/upload/v1566909476/icons/instagram_color.svg'
const youtubeLogo =
  'https://res.cloudinary.com/influencerz/image/upload/v1566909495/icons/youtube_color.svg'

const Styles = styled.div`
  .format {
    &:not(:last-child) {
      margin-bottom: 1rem;
    }
  }
  .taskIcon {
    width: 4rem;
    height: 4rem;
    margin-right: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
      width: 3rem;
      height: 3rem;
    }
  }
`

interface ITaskCardProps {
  task: ICampaignTask
}

const TaskCard: React.FC<ITaskCardProps> = ({ task }) => {
  const getFormatPicture = (_format: TaskFormatType): string => {
    switch (_format) {
      case 'Instagram post':
        return instagramLogo
      case 'Instagram story':
        return instagramLogo
      case 'Youtube video':
        return youtubeLogo
      default:
        return ''
    }
  }
  return (
    <Styles>
      <LabelText grey withMargin>
        Plateformes acceptées
      </LabelText>
      {/* <p>Plateformes acceptées pour la revue :</p> */}
      {task.formats.map(_format => (
        <Flex flexDirection="row" alignItems="center" className="format" mt="1rem" key={_format}>
          <img src={getFormatPicture(_format)} alt={_format} className="taskIcon" />
          <span>{_format}</span>
        </Flex>
      ))}
      <LabelText grey withMargin>
        Mots clés
      </LabelText>
      <p>
        La revue doit inclure <BoldText>{task.including}</BoldText>
      </p>
      <LabelText grey withMargin>
        Date limite
      </LabelText>
      <p>
        Vous avez <BoldText>{task.daysToReview} jours</BoldText> pour poster la revue une fois le
        produit envoyé.
      </p>
    </Styles>
  )
}
export default TaskCard
