import React from 'react'
import { Flex, Box } from '@rebass/grid'
import { ContainerBox } from '../styles/grid'
import ErrorBoundary from '../components/ErrorBoundary'
import CreatorCollabCard from '../components/CreatorCollabCard'
import { usePageTitle, useWindowSize } from '../utils/hooks'
import { BlueLink, Title } from '../styles/Text'
import NotificationCard from '../components/NotificationCard'
import gql from 'graphql-tag'
import { EXPERIENCE_PRESENTATION_FRAGMENT } from '../components/ExperiencePresentation'
import { useQuery } from '@apollo/react-hooks'
import { GetCreatorCollabs } from '../__generated__/GetCreatorCollabs'
import Loader from '../components/Loader'
import ErrorCard from '../components/ErrorCard'

const GET_CREATOR_COLLABS = gql`
  query GetCreatorCollabs {
    collabs {
      _id
      status
      updatedAt
      campaign {
        ...ExperiencePresentation
      }
    }
  }
  ${EXPERIENCE_PRESENTATION_FRAGMENT}
`

const CollabsList: React.FC<{}> = () => {
  usePageTitle('Vos collabs')

  // Get all creator collabs ids
  const {
    data: { collabs },
    error,
    loading,
  } = useQuery<GetCreatorCollabs, {}>(GET_CREATOR_COLLABS)

  const { width } = useWindowSize()

  if (loading) {
    return <Loader />
  }
  if (error) {
    return <ErrorCard message="Could not show collabs" />
  }

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
                  <CreatorCollabCard collab={_collab} />
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
