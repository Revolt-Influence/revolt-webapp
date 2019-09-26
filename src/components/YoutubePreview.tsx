import React from 'react'
import approx from 'approximate-number'
import { Flex, Box } from '@rebass/grid'
import SocialAccountPreview from './SocialAccountPreview'
import { IYoutuber } from '../models/Youtuber'
import YoutubeVideo from './YoutubeVideo'

const youtubeSource = require('../images/icons/youtube_color.svg')

interface IYoutubePreviewProps {
  youtuber: IYoutuber
}

const YoutubePreview: React.FC<IYoutubePreviewProps> = ({
  youtuber: { subscriberCount, videos, videoCount, name },
}) => (
  <SocialAccountPreview
    logo={youtubeSource}
    network="YouTube"
    stats={`${approx(subscriberCount)} abonnés, ${videoCount} vidéos`}
    username={name}
  >
    <Flex
      flexDirection="row"
      flexWrap="wrap"
      justifyContent="flex-start"
      mx="-0.5rem"
      p="1.5rem"
      pt="0"
    >
      {videos.map(_video => (
        <Box width={[1, 1, 6 / 12]} px="0.5rem" mb="1rem" key={_video.videoId}>
          <YoutubeVideo video={_video} />
        </Box>
      ))}
    </Flex>
  </SocialAccountPreview>
)

export default YoutubePreview
