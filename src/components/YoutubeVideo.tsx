import React from 'react'
import styled from 'styled-components'
import { IYoutubeVideo } from '../models/YoutubeVideo'

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
  video: IYoutubeVideo
}

const YoutubeVideo: React.FC<IYoutubeVideoProps> = ({
  video: { thumbnail, title, videoId, url, views },
}) => (
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
