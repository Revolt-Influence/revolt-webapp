import React from 'react'
import { useSelector } from 'react-redux'
import { Flex, Box } from '@rebass/grid'
import { ContainerBox } from '../styles/grid'
import ErrorBoundary from '../components/ErrorBoundary'
import IState from '../models/State'
import { ICollab } from '../models/Collab'
import CreatorCollabCard from '../components/CreatorCollabCard'
import { ICampaign } from '../models/Campaign'
import { usePageTitle, useWindowSize } from '../utils/hooks'
import { BlueLink, Title } from '../styles/Text'
import NotificationCard from '../components/NotificationCard'

interface ICollabsListProps {}

const CollabsList: React.FC<ICollabsListProps> = () => {
  usePageTitle('Vos collabs')

  // Get all creator collabs ids
  const collabs = useSelector<IState, ICollab[]>(state => state.collabs.items)
  const collabExperiencesIds = collabs.map(_collab => _collab.campaign)
  // Get experiences that are linked to a collab
  const experiences = useSelector<IState, ICampaign[]>(state =>
    state.campaigns.items.filter(_experience => collabExperiencesIds.includes(_experience._id))
  )

  const { width } = useWindowSize()

  return (
    <ContainerBox>
      <ErrorBoundary message="Les collabs n'ont pas pu être affichées">
        <>
          <Title isCentered={width < 960}>Mes collabs</Title>
          {collabs.length === 0 ? (
            <ContainerBox mt="2rem">
              <NotificationCard message="Vous n'avez pas encore de collabs." nature="info" />
              <Box mt="1rem">
                Pour commencer une collab, allez sur la page{' '}
                <BlueLink to="/creator/experiences">Expériences</BlueLink> pour postuler à une
                expérience.
              </Box>
            </ContainerBox>
          ) : (
            <Flex flexDirection="row" flexWrap="wrap" mx={[0, 0, '-2rem']} mt="-3rem" pb="2rem">
              {collabs.map(_collab => (
                <Box
                  width={[1, 6 / 12, 4 / 12]}
                  mt="3rem"
                  mx={['auto', 'unset', 'unset']}
                  px="2rem"
                  key={_collab._id}
                >
                  <CreatorCollabCard
                    experience={experiences.find(
                      _experience => _experience._id === _collab.campaign
                    )}
                    experienceId={_collab.campaign}
                    collab={_collab}
                  />
                </Box>
              ))}
            </Flex>
          )}
        </>
      </ErrorBoundary>
    </ContainerBox>
  )
}

export default CollabsList
