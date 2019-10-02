import React from 'react'
import styled from 'styled-components'
import { YoutuberProfileFragment_videos } from '../__generated__/YoutuberProfileFragment'

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
  video: YoutuberProfileFragment_videos
}

const YoutubeVideo: React.FC<IYoutubeVideoProps> = ({ video: { title, videoId } }) => (
  <Styles>
    {/* <img className="thumbnail" src={url} alt={title} />
      <Fl */}
    <div className="frameWrapper">
      <iframe
        className="iframe"
        title={title}
        width="100%"
        height="0"
        src={`https://www.youtube.com/embed/${videoId}?modestbranding=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  </Styles>
)

export default YoutubeVideo
