import React from 'react'
import approx from 'approximate-number'
import { Flex, Box } from '@rebass/grid'
import SocialAccountPreview from './SocialAccountPreview'
import YoutubeVideo from './YoutubeVideo'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import { GetYoutuber, GetYoutuberVariables } from '../__generated__/GetYoutuber'
import ErrorCard from './ErrorCard'
import Loader from './Loader'

const youtubeSource = require('../images/icons/youtube_color.svg')

const YOUTUBER_PROFILE_FRAGMENT = gql`
  fragment YoutuberProfileFragment on Youtuber {
    _id
    name
    picture
    videoCount
    subscriberCount
    videos {
      title
      videoId
    }
    audience {
      ageGroups {
        name
        percentage
      }
      countries {
        name
        percentage
      }
    }
  }
`

const GET_YOUTUBER = gql`
  query GetYoutuber($youtuberId: String!) {
    youtuber(id: $youtuberId) {
      ...YoutuberProfileFragment
    }
  }
  ${YOUTUBER_PROFILE_FRAGMENT}
`

interface Props {
  youtuberId: string
}

const YoutubePreview: React.FC<Props> = ({ youtuberId }) => {
  const { data, loading, error } = useQuery<GetYoutuber, GetYoutuberVariables>(GET_YOUTUBER, {
    variables: { youtuberId },
  })
  if (loading) {
    return <Loader fullScreen />
  }
  if (error) {
    return <ErrorCard message="Could not preview YouTube channel" />
  }
  const {
    youtuber: { videos, subscriberCount, videoCount, name },
  } = data
  return (
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
}

export { YOUTUBER_PROFILE_FRAGMENT }
export default YoutubePreview
