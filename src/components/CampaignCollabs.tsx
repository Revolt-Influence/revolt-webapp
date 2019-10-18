import React, { useEffect } from 'react'
import styled, { css } from 'styled-components'
import { gql } from 'apollo-boost'
import { Box, Flex } from '@rebass/grid'
import BrandCollabCard from './BrandCollabCard'
import { Container, Row } from '../utils/grid'
import { setFont, shadow } from '../utils/styles'
import { palette } from '../utils/colors'
import ErrorBoundary from './ErrorBoundary'
import { useQuery } from '@apollo/react-hooks'
import { CollabStatus, Language, CreatorStatus } from '../__generated__/globalTypes'
import Loader from './Loader'
import ErrorCard from './ErrorCard'
import {
  GetCampaignCollabs,
  GetCampaignCollabsVariables,
} from '../__generated__/GetCampaignCollabs'
import { ContainerBox } from '../styles/grid'
import { GetCollab, GetCollabVariables } from '../__generated__/GetCollab'
import { GET_CREATOR } from './CreatorProfile'
import { GET_COLLAB } from './ReviewCollabRequest'
import { dummyDoneCollab, dummyYoutuber, dummyCreator } from '../utils/dummyData'
import { GetCreator, GetCreatorVariables } from '../__generated__/GetCreator'
import { GET_YOUTUBER } from './YoutubePreview'
import { GetYoutuber, GetYoutuberVariables } from '../__generated__/GetYoutuber'

const Column = styled.section<{ status: CollabStatus }>`
  padding-top: 2rem;
  padding-bottom: 1px;
  margin-bottom: 2rem;
  border-radius: 8px;
  box-shadow: ${shadow._200};
  h2 {
    ${setFont(600, 'big')}
  }
  p.darkText {
    padding: 1rem;
  }
  .help {
    padding: 0 1rem;
    margin-bottom: 1rem;
    margin-top: -1rem;
  }
  ${props => {
    switch (props.status) {
      case CollabStatus.ACCEPTED:
        return css`
          border-top: 6px solid ${palette.blue._400};
          /* background: ${palette.blue._200}; */
          background: ${palette.blue._100};
          h2 {
            color: ${palette.blue._800};
            span {
              color: ${palette.blue._400};
            }
          }
          .help, .darkText {
            color: ${palette.blue._800};
          }
        `
      case CollabStatus.SENT:
        return css`
          border-top: 6px solid ${palette.orange._500};
          /* background: ${palette.orange._200}; */
          background: ${palette.orange._100};
          h2 {
            color: ${palette.orange._800};
            span {
              color: ${palette.orange._500};
            }
          }
          .help, .darkText {
            color: ${palette.orange._800};
          }
        `
      case CollabStatus.DONE:
        return css`
          border-top: 6px solid ${palette.green._300};
          /* background: ${palette.green._200}; */
          background: ${palette.green._100};
          h2 {
            color: ${palette.green._800};
            span {
              color: ${palette.green._300};
            }
          }
          .help, .darkText {
            color: ${palette.green._800};
          }
        `
      default:
        // Should not happen
        return css`
          border-top: 6px solid ${palette.blue._600};
          background: ${palette.blue._100};
          color: ${palette.blue._800};
          h2 span {
            color: ${palette.blue._400};
          }
          .help,
          .darkText {
            color: ${palette.blue._800};
          }
        `
    }
  }};

  .header {
    padding: 0 10px;
    margin-bottom: 20px;
    button {
      transform: translateY(1px);
    }
  }
`

const GET_CAMPAIGN_COLLABS = gql`
  query GetCampaignCollabs($campaignId: String!) {
    campaign(id: $campaignId) {
      _id
      collabs {
        _id
        conversation {
          _id
          createdAt
        }
        status
        message
        updatedAt
        creator {
          _id
          name
          picture
          youtube {
            _id
            viewCount
            subscriberCount
            videoCount
          }
        }
      }
    }
  }
`

interface ICampaignCollabsProps {
  campaignId: string
}

const CampaignCollabs: React.FC<ICampaignCollabsProps> = ({ campaignId }) => {
  // Get campaign collabs from Redux
  const { client, data: { campaign } = { campaign: null }, loading, error } = useQuery<
    GetCampaignCollabs,
    GetCampaignCollabsVariables
  >(GET_CAMPAIGN_COLLABS, { variables: { campaignId } })

  const dummyIsShown: boolean =
    !loading &&
    !error &&
    campaign.collabs.filter(_collab =>
      [CollabStatus.ACCEPTED, CollabStatus.SENT, CollabStatus.DONE].includes(_collab.status)
    ).length === 0
  useEffect(() => {
    // Add dummy data to cache if they'll be displayed
    if (dummyIsShown) {
      // Collab query
      client.writeQuery<GetCollab, GetCollabVariables>({
        query: GET_COLLAB,
        variables: { collabId: dummyDoneCollab._id },
        data: {
          collab: {
            ...dummyDoneCollab,
            quote: 120,
            creator: {
              ...dummyDoneCollab.creator,
              youtube: {
                ...dummyDoneCollab.creator.youtube,
                estimatedCpm: 32,
                medianViews: 34500,
              },
            },
            updatedAt: Date.now(),
          },
        },
      })
      // Creator query
      client.writeQuery<GetCreator, GetCreatorVariables>({
        query: GET_CREATOR,
        variables: { creatorId: dummyDoneCollab.creator._id },
        data: {
          creator: {
            ...dummyDoneCollab.creator,
            status: CreatorStatus.VERIFIED,
            language: Language.ENGLISH,
            birthYear: 1992,
            youtube: dummyYoutuber,
          },
        },
      })
      // Youtuber query
      client.writeQuery<GetYoutuber, GetYoutuberVariables>({
        query: GET_YOUTUBER,
        variables: { youtuberId: dummyCreator.youtube._id },
        data: {
          youtuber: dummyCreator.youtube,
        },
      })
    }
  }, [dummyIsShown, client])

  if (loading) {
    return <Loader fullScreen />
  }
  if (error) {
    return (
      <ContainerBox>
        <ErrorCard message="Could not load collabs" />
      </ContainerBox>
    )
  }

  const { collabs } = campaign
  const acceptedCollabs = collabs.filter(_collab => _collab.status === CollabStatus.ACCEPTED)
  const sentCollabs = collabs.filter(_collab => _collab.status === CollabStatus.SENT)
  const doneCollabs = collabs.filter(_collab => _collab.status === CollabStatus.DONE)

  return (
    <Container>
      <ErrorBoundary message="Could not show collabs">
        <Flex
          flexDirection="row"
          flexWrap="wrap"
          alignItems="flex-start"
          justifyContent="space-between"
        >
          <Box width={[1, 1, 4 / 12]} pr={[0, 0, '2rem']}>
            <Column status={CollabStatus.ACCEPTED}>
              <Row className="header" justify="space-between" verticalAlign="center">
                <h2>
                  Game not sent <span>({acceptedCollabs.length})</span>
                </h2>
              </Row>
              <p className="help">
                You have accepted the collab, but haven't sent the game to the influencer
              </p>
              {acceptedCollabs.length === 0 && <p className="darkText">No collabs.</p>}
              {acceptedCollabs.map(_collab => (
                <BrandCollabCard collab={_collab} key={_collab._id} />
              ))}
            </Column>
          </Box>
          <Box width={[1, 1, 4 / 12]} pr={[0, 0, '2rem']}>
            <Column status={CollabStatus.SENT}>
              <Row className="header" justify="space-between" verticalAlign="center">
                <h2>
                  Review in production <span>({sentCollabs.length})</span>
                </h2>
              </Row>
              <p className="help">The influencer is now able to create his review of the game.</p>
              {sentCollabs.length === 0 && <p className="darkText">No collabs.</p>}
              {sentCollabs.map(_collab => (
                <BrandCollabCard collab={_collab} key={_collab._id} />
              ))}
            </Column>
          </Box>
          <Box width={[1, 1, 4 / 12]}>
            <Column status={CollabStatus.DONE}>
              <Row className="header" justify="space-between" verticalAlign="center">
                <h2>
                  Review published <span>({doneCollabs.length})</span>
                </h2>
              </Row>
              <p className="help">The reviews are live. You can see them in the Reviews tab</p>
              {doneCollabs.length === 0 && <p className="darkText">No collabs.</p>}
              {dummyIsShown && (
                <Box>
                  <p className="darkText">Here's what a collab will look like:</p>
                  <BrandCollabCard isDummy collab={dummyDoneCollab} />
                </Box>
              )}
              {doneCollabs.map(_collab => (
                <BrandCollabCard collab={_collab} key={_collab._id} />
              ))}
            </Column>
          </Box>
        </Flex>
      </ErrorBoundary>
    </Container>
  )
}

export default CampaignCollabs
