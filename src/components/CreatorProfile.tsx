import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Flex } from '@rebass/grid'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { palette } from '../utils/colors'
import { applyCloudinaryTransformations } from '../utils/images'
import { yearToAge } from '../utils/stats'
import { setFont, shadow } from '../utils/styles'
import { GetCreator, GetCreatorVariables } from '../__generated__/GetCreator'
import AudienceInsights from './AudienceInsights'
import ErrorCard from './ErrorCard'
import YoutubePreview, { YOUTUBER_PROFILE_FRAGMENT } from './YoutubePreview'
import { showLanguage } from '../utils/enums'
import ReviewCollabRequest from './ReviewCollabRequest'
import ErrorBoundary from './ErrorBoundary'

const placeholderPicture = 'https://dummyimage.com/40x40/d8dee3/D8DEE3.jpg'

const Styles = styled.div`
  background: ${palette.grey._50};

  .profilePicture {
    width: 8rem;
    height: 8rem;
    object-fit: cover;
    margin-right: 2rem;
    border-radius: 50%;
    box-shadow: ${shadow.inset};
    /* border: 4px solid ${props => props.theme.primary._300}; */
  }

  .name {
    ${setFont(600, 'big')}
    margin-bottom: 0.5rem;
  }

  .description {
    color: ${palette.grey._700};
  }

  .label {
    ${setFont(600, 'normal')}
    color: ${palette.grey._600};
  }

  h2.section {
    margin-top: 2rem;
    margin-bottom: 1rem;
    ${setFont(600, 'big')}
  }
  .mentionedBrand {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    img {
      border-radius: 50%;
      width: 3rem;
      height: 3rem;
      object-fit: contain;
    }
    a {
      margin-right: 2rem;
      margin-left: 0.5rem;
      &:hover {
        text-decoration: underline;
        color: ${palette.blue._700};
      }
    }
    p.category {
      color: ${palette.grey._500};
    }
  }
`

export const CREATOR_PROFILE_FRAGMENT = gql`
  fragment CreatorProfileFragment on Creator {
    _id
    name
    picture
    birthYear
    language
    youtube {
      ...YoutuberProfileFragment
    }
  }
  ${YOUTUBER_PROFILE_FRAGMENT}
`

export const GET_CREATOR = gql`
  query GetCreator($creatorId: String!) {
    creator(id: $creatorId) {
      ...CreatorProfileFragment
      status
    }
  }
  ${CREATOR_PROFILE_FRAGMENT}
`

interface Props {
  creatorId: string
  collabId?: string
  isDummy?: boolean
}

const CreatorProfile: React.FC<Props> = ({ creatorId, collabId, isDummy }) => {
  const {
    data: { creator } = { creator: null },
    loading: creatorLoading,
    error: creatorError,
  } = useQuery<GetCreator, GetCreatorVariables>(GET_CREATOR, {
    variables: { creatorId },
    fetchPolicy: creatorId.includes('DUMMY') ? 'cache-only' : 'cache-first',
  })

  if (creatorLoading) {
    return <p>Loading profile...</p>
  }
  if (creatorError) {
    return <ErrorCard message="Could not load profile" noMargin />
  }

  // Destructure creator data
  const { birthYear, name, picture, language } = creator
  const { youtube } = creator
  const hasYoutube = youtube != null

  return (
    <Styles>
      <Flex flexDirection="row" alignItems="center">
        <img
          src={applyCloudinaryTransformations(picture, { width: 160 }) || placeholderPicture}
          alt={name}
          className="profilePicture"
        />
        <div>
          <h1 className="name">{name}</h1>
          <p className="description">
            {yearToAge(birthYear)} years old, speaks {showLanguage(language)}
          </p>
        </div>
      </Flex>
      {collabId && (
        <ErrorBoundary message="Could not load the collab details">
          <ReviewCollabRequest collabId={collabId} />
        </ErrorBoundary>
      )}
      {/* Networks preview */}
      {youtube && <h2 className="section">Platforms</h2>}
      <section>{hasYoutube && <YoutubePreview youtuberId={youtube._id} />}</section>
      {/* Youtube analytics */}
      {youtube && (
        <section>
          {youtube.audience && (
            <>
              {/* Gender chart */}
              <h2 className="section">YouTube audience</h2>
              <AudienceInsights youtuberAudience={youtube.audience} />
            </>
          )}
        </section>
      )}
    </Styles>
  )
}

export default CreatorProfile
