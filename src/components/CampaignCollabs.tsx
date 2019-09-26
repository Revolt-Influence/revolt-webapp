import React from 'react'
import styled, { css } from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Flex } from '@rebass/grid'
import BrandCollabCard from './BrandCollabCard'
import { Container, Row } from '../utils/grid'
import { setFont, shadow } from '../utils/styles'
import { palette } from '../utils/colors'
import { ICampaign } from '../models/Campaign'
import { CollabStatus, ICollab } from '../models/Collab'

import IState from '../models/State'
import { reviewCollabProposition } from '../actions/collabs'
import ErrorBoundary from './ErrorBoundary'

interface IColumnProps {
  status: CollabStatus
}

const Column = styled.section<IColumnProps>`
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
      case 'accepted':
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
      case 'sent':
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
      case 'done':
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

interface ICampaignCollabsProps {
  campaign: ICampaign
}

const CampaignCollabs: React.FC<ICampaignCollabsProps> = ({ campaign }) => {
  // Get campaign collabs from Redux
  const collabs = useSelector<IState, ICollab[]>(state =>
    state.collabs.items.filter(_collab => _collab.campaign === campaign._id)
  )
  const dispatch = useDispatch()

  const notSentCollabs = collabs.filter(_collab => _collab.status === 'accepted')
  const waitingCollabs = collabs.filter(_collab => _collab.status === 'sent')
  const doneCollabs = collabs.filter(_collab => _collab.status === 'done')

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
            <Column status="accepted">
              <Row className="header" justify="space-between" verticalAlign="center">
                <h2>
                  Produit pas encore envoyé <span>({notSentCollabs.length})</span>
                </h2>
              </Row>
              <p className="help">
                Vous avez accepté la collab, mais n'avez pas encore envoyé le produit à
                l'influenceur.
              </p>
              {notSentCollabs.length === 0 && (
                <p className="noResult">Pas encore de propositions.</p>
              )}
              {notSentCollabs.map(_collab => (
                <BrandCollabCard
                  collab={_collab}
                  isLoading={false}
                  markAsSent={() =>
                    dispatch(
                      reviewCollabProposition({ collabId: _collab._id, action: 'markAsSent' })
                    )
                  }
                  key={_collab._id}
                />
              ))}
            </Column>
          </Box>
          <Box width={[1, 1, 4 / 12]} pr={[0, 0, '2rem']}>
            <Column status="sent">
              <Row className="header" justify="space-between" verticalAlign="center">
                <h2>
                  En attente de publication <span>({waitingCollabs.length})</span>
                </h2>
              </Row>
              <p className="help">
                Le produit est envoyé mais l'influenceur n'a pas encore publié ses revues.
              </p>
              {waitingCollabs.length === 0 && <p className="noResult">Pas de collab en cours.</p>}
              {waitingCollabs.map(_collab => (
                <BrandCollabCard collab={_collab} isLoading={false} key={_collab._id} />
              ))}
            </Column>
          </Box>
          <Box width={[1, 1, 4 / 12]}>
            <Column status="done">
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
