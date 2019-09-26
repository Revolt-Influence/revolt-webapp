import retry from 'async-retry'
import { request } from './request'

async function getInfluencerData(username: string): Promise<any> {
  // Retry 3 times if it fails
  return retry(
    async () => {
      const profileSource = await request.get(`https://www.instagram.com/${username}/?hl=en`)
      const rawProfileData = profileSource.text
        .match(/<script type="text\/javascript">window\._sharedData = (.*)<\/script>/)[1]
        .slice(0, -1)
      if (rawProfileData == null) {
        // Something is wrong, log the request response
        console.log(`Request response: ${JSON.stringify(profileSource)}`)
        console.log(`Response code: ${profileSource.status}`)
      }
      // Several steps to avoid this problem: https://stackoverflow.com/questions/17546953/cant-access-object-property-even-though-it-shows-up-in-a-console-log
      const profileData = JSON.parse(rawProfileData)
      const profileEntryData = profileData.entry_data
      const profilePage = profileEntryData.ProfilePage[0]
      const profileGraphql = profilePage.graphql
      const influencerData = profileGraphql.user
      return influencerData
    },
    { retries: 3 }
  )
}

async function getInstagramPostData(link: string): Promise<any> {
  return retry(async () => {
    const postSource = await request.get(link)
    const rawPostData = postSource.text
      .match(/<script type="text\/javascript">window\._sharedData = (.*)<\/script>/)[1]
      .slice(0, -1)
    return JSON.parse(rawPostData)
  })
}

export { getInfluencerData, getInstagramPostData }
