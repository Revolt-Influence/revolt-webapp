import React from 'react'
import styled from 'styled-components'
import { getYoutubeEmbedLink } from '../utils/youtube'

const Styles = styled.article`
  border-radius: 8px;
  overflow: hidden;

  .frameWrapper {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: ${(9 * 100) / 16}%;
    iframe {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
    }
  }
`

interface IYoutubeVideoProps {
  videoId: string
  autoplay?: boolean
}

const YoutubeVideo: React.FC<IYoutubeVideoProps> = ({ videoId, autoplay }) => (
  <Styles>
    <div className="frameWrapper">
      <iframe
        className="iframe"
        title="Youtube video"
        width="100%"
        height="0"
        src={getYoutubeEmbedLink(videoId, !!autoplay)}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  </Styles>
)

export default YoutubeVideo
