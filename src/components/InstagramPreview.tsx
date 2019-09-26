import React, { useState, useEffect, useCallback } from 'react'
import approx from 'approximate-number'
import { Flex, Box } from '@rebass/grid'
import InstagramPost from './InstagramPost'
import { IInfluencer } from '../models/Influencer'
import SocialAccountPreview from './SocialAccountPreview'
import { getInfluencerData } from '../utils/crawler'
import { useSelector, useDispatch } from 'react-redux'
import IState from '../models/State'
import { IRequestStatus } from '../utils/request'
import { saveInstagramPosts } from '../actions/creators'
import ErrorCard from './ErrorCard'

const instagramSource = require('../images/icons/instagram_color.svg')

const INSTAGRAM_POSTS_CACHE_DURATION = 5 * 24 * 60 * 60 * 1000 // 5 days

interface IInstagramPreviewProps {
  profile: IInfluencer
}

const InstagramPreview: React.FC<IInstagramPreviewProps> = ({
  profile: { username, posts, followers, likes, lastPostsScraping },
}) => {
  // Local state
  const [profileLoading, setProfileLoading] = useState<boolean>(false)
  const [profileError, setProfileError] = useState<boolean>(false)
  // Redux state
  const savePostsStatus = useSelector<IState, IRequestStatus>(
    state => state.creators.requests.saveInstagramPosts
  )
  const dispatch = useDispatch()

  const updatePosts = useCallback(async () => {
    setProfileError(false)
    setProfileLoading(true)
    try {
      // Get profile page source code
      const influencerData = await getInfluencerData(username)
      // Send profile data to server who will extract and save posts
      dispatch(saveInstagramPosts({ username, influencerData }))
    } catch (_) {
      setProfileError(true)
    }
    setProfileLoading(false)
  }, [dispatch, username])

  useEffect(() => {
    const needsRefresh =
      posts.length === 0 || Date.now() > lastPostsScraping + INSTAGRAM_POSTS_CACHE_DURATION
    if (needsRefresh) {
      updatePosts()
    }
  }, [lastPostsScraping, posts.length, updatePosts])

  return (
    <SocialAccountPreview
      logo={instagramSource}
      network="Instagram"
      stats={`${approx(followers)} followers, ${approx(likes)} likes potentiels`}
      username={`@${username}`}
    >
      <>
        {(profileError || savePostsStatus.hasFailed) && posts.length === 0 && (
          <Box px="1.5rem" mt="-1rem">
            <ErrorCard message="Les posts n'ont pas pu être affichés" />
          </Box>
        )}
        {(profileLoading || savePostsStatus.isLoading) && posts.length === 0 && (
          <p>Chargement des posts...</p>
        )}
        <Flex
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="flex-start"
          mx="-0.5rem"
          p="1.5rem"
          pt="0"
        >
          {posts.map(_post => (
            <InstagramPost post={_post} key={_post.imageLink} />
          ))}
        </Flex>
      </>
    </SocialAccountPreview>
  )
}

export default InstagramPreview
