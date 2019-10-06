import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Box, Flex } from '@rebass/grid'
import gql from 'graphql-tag'
import queryString from 'query-string'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import AmbassadorProgramCard from '../components/AmbassadorProgramCard'
import ErrorBoundary from '../components/ErrorBoundary'
import ErrorCard from '../components/ErrorCard'
import { EXPERIENCE_PRESENTATION_FRAGMENT } from '../components/ExperiencePresentation'
import ExperiencePreviewCard from '../components/ExperiencePreviewCard'
import Loader from '../components/Loader'
import NotificationCard from '../components/NotificationCard'
import Pagination from '../components/Pagination'
import { GET_SESSION } from '../components/Session'
import { ContainerBox } from '../styles/grid'
import { Title } from '../styles/Text'
import { useDeviceType, usePageTitle } from '../utils/hooks'
import {
  GetExperiencesPage,
  GetExperiencesPageVariables,
} from '../__generated__/GetExperiencesPage'
import { GetSession } from '../__generated__/GetSession'
import { CreatorStatus } from '../__generated__/globalTypes'

const GET_EXPERIENCES_PAGE = gql`
  query GetExperiencesPage($page: Float) {
    campaigns(page: $page) {
      currentPage
      totalPages
      items {
        ...ExperiencePresentationFragment
      }
    }
  }
  ${EXPERIENCE_PRESENTATION_FRAGMENT}
`

const ExperiencesList: React.FC<RouteComponentProps> = ({ location, history }) => {
  usePageTitle('Experiences')

  // Get current page from URL
  const parsedQuery = queryString.parse(location.search)
  const hasQueryParams = Object.entries(parsedQuery).length > 0
  const urlCurrentPage = hasQueryParams ? parseInt((parsedQuery as any).page) : 1

  const { data: { campaigns: experiences } = { campaigns: null }, loading, error } = useQuery<
    GetExperiencesPage,
    GetExperiencesPageVariables
  >(GET_EXPERIENCES_PAGE, { variables: { page: urlCurrentPage } })
  const { data: { session } = { session: null } } = useQuery<GetSession>(GET_SESSION)

  const deviceType = useDeviceType()

  if (loading) {
    return <Loader />
  }
  if (error) {
    return (
      <ContainerBox>
        <ErrorCard message="Could not show experiences" />
      </ContainerBox>
    )
  }

  return (
    <ContainerBox>
      <ErrorBoundary message="Could not show experiences">
        <>
          <Title isCentered={deviceType !== 'desktop'}>Experiences</Title>
          <>
            {session.creator.status === CreatorStatus.UNVERIFIED && (
              <Box mb="2rem" px={['2rem', 0, 0]}>
                <NotificationCard
                  nature="info"
                  message="Your profile hasn't been veriried by our team yet. You can't apply to experiences for now"
                />
              </Box>
            )}
            {session.creator.status === CreatorStatus.BLOCKED && (
              <Box mb="2rem" px={['2rem', 0, 0]}>
                <NotificationCard
                  nature="info"
                  message="Your profile hasn't been veriried by our team. You can't apply to experiences"
                />
              </Box>
            )}
            <Flex flexDirection="row" flexWrap="wrap" mx={[0, 0, '-2rem']} mt="-3rem" pb="2rem">
              {/* Ambassador program card */}
              <Box width={[1, 6 / 12, 4 / 12]} mt="3rem" mx={['auto', 'unset', 'unset']} px="2rem">
                <AmbassadorProgramCard />
              </Box>
              {/* List of experiences */}
              {experiences.items.map(_experience => (
                <Box
                  width={[1, 6 / 12, 4 / 12]}
                  mt="3rem"
                  mx={['auto', 'unset', 'unset']}
                  px="2rem"
                  key={_experience._id}
                >
                  <ExperiencePreviewCard experience={_experience} />
                </Box>
              ))}
              {experiences.items.length === 0 && (
                <ContainerBox mt="3rem">
                  <NotificationCard message="No new game available" nature="info" />
                  <Box mt="1rem">Looks like you've applied to all games. Come back later!</Box>
                </ContainerBox>
              )}
            </Flex>
            {experiences.totalPages > 1 && (
              <Pagination
                optionsBreadth={1}
                totalPages={experiences.totalPages}
                handlePageChange={page => {
                  history.push({ pathname: '/creator/experiences', search: `?page=${page}` })
                }}
                currentPage={urlCurrentPage}
              />
            )}
          </>
        </>
      </ErrorBoundary>
    </ContainerBox>
  )
}

export default withRouter(ExperiencesList)
