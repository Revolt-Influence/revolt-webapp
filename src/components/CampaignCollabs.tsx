import React from 'react'
import styled, { css } from 'styled-components'
import { gql } from 'apollo-boost'
import { Box, Flex } from '@rebass/grid'
import BrandCollabCard from './BrandCollabCard'
import { Container, Row } from '../utils/grid'
import { setFont, shadow } from '../utils/styles'
import { palette } from '../utils/colors'
import ErrorBoundary from './ErrorBoundary'
import { useQuery } from '@apollo/react-hooks'
import { CollabStatus } from '../__generated__/globalTypes'
import Loader from './Loader'
import ErrorCard from './ErrorCard'
import {
  GetCampaignCollabs,
  GetCampaignCollabsVariables,
} from '../__generated__/GetCampaignCollabs'

const Column = styled.section<{ status: CollabStatus }>`
  padding-top: 2rem;
  padding-bottom: 1px;
  margin-bottom: 2rem;
  border-radius: 8px;
  box-shadow: ${shadow._200};
  h2 {
    ${setFont(600, 'big')}
  }
  p.noResult {
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
          .help {
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
          .help {
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
          .help {
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
          .help {
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
          name
          picture
          youtube {
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
  const { data: { campaign } = { campaign: null }, loading, error } = useQuery<
    GetCampaignCollabs,
    GetCampaignCollabsVariables
  >(GET_CAMPAIGN_COLLABS, { variables: { campaignId } })

  if (loading) {
    return <Loader fullScreen />
  }
  if (error) {
    return <ErrorCard message="Collabs could not be loaded" />
  }

  const { collabs } = campaign
  const acceptedCollabs = collabs.filter(_collab => _collab.status === CollabStatus.ACCEPTED)
  const sentCollabs = collabs.filter(_collab => _collab.status === CollabStatus.SENT)
  const doneCollabs = collabs.filter(_collab => _collab.status === CollabStatus.DONE)

  return (
    <Container>
      <ErrorBoundary message="Les partenariats n'ont pas pu être affichés">
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
                  Produit pas encore envoyé <span>({acceptedCollabs.length})</span>
                </h2>
              </Row>
              <p className="help">
                Vous avez accepté la collab, mais n'avez pas encore envoyé le produit à
                l'influenceur.
              </p>
              {acceptedCollabs.length === 0 && (
                <p className="noResult">Pas encore de propositions.</p>
              )}
              {acceptedCollabs.map(_collab => (
                <BrandCollabCard collab={_collab} key={_collab._id} />
              ))}
            </Column>
          </Box>
          <Box width={[1, 1, 4 / 12]} pr={[0, 0, '2rem']}>
            <Column status={CollabStatus.SENT}>
              <Row className="header" justify="space-between" verticalAlign="center">
                <h2>
                  En attente de publication <span>({sentCollabs.length})</span>
                </h2>
              </Row>
              <p className="help">
                Le produit est envoyé mais l'influenceur n'a pas encore publié ses revues.
              </p>
              {sentCollabs.length === 0 && <p className="noResult">Pas de collab en cours.</p>}
              {sentCollabs.map(_collab => (
                <BrandCollabCard collab={_collab} />
              ))}
            </Column>
          </Box>
          <Box width={[1, 1, 4 / 12]}>
            <Column status={CollabStatus.DONE}>
              <Row className="header" justify="space-between" verticalAlign="center">
                <h2>
                  Collabs terminées <span>({doneCollabs.length})</span>
                </h2>
              </Row>
              <p className="help">
                Les revues ont été publiées. Vous pouvez les voir dans l'onglet Revues.
              </p>
              {doneCollabs.length === 0 && (
                <p className="noResult">Pas encore de collabs terminées.</p>
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
