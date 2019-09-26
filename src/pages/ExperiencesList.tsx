import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Flex } from '@rebass/grid'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import queryString from 'query-string'
import { ContainerBox } from '../styles/grid'
import ErrorBoundary from '../components/ErrorBoundary'
import { Title } from '../styles/Text'
import IState from '../models/State'
import { ICampaignState } from '../models/Campaign'
import ExperiencePreviewCard from '../components/ExperiencePreviewCard'
import { usePageTitle, useWindowSize } from '../utils/hooks'
import NotificationCard from '../components/NotificationCard'
import Pagination from '../components/Pagination'
import ErrorCard from '../components/ErrorCard'
import { getCampaignsPage } from '../actions/campaigns'
import AmbassadorProgramCard from '../components/AmbassadorProgramCard'
import { CreatorStatus } from '../models/Creator'

const ExperiencesList: React.FC<RouteComponentProps> = ({ location, history }) => {
  usePageTitle('Expériences')

  // Get current page from URL
  const parsedQuery = queryString.parse(location.search)
  const hasQueryParams = Object.entries(parsedQuery).length > 0
  const urlCurrentPage = hasQueryParams ? parseInt((parsedQuery as any).page) : 1

  // Redux stuff
  const dispatch = useDispatch()
  const {
    items: experiences,
    totalPages,
    currentPage: reduxCurrentPage,
    requests: { getPage: getPageStatus },
  } = useSelector<IState, ICampaignState>(state => state.campaigns)
  const creatorStatus = useSelector<IState, CreatorStatus>(state => state.session.creator.status)

  // Check if a fetch is necessary based on current page
  React.useEffect(() => {
    if (urlCurrentPage !== reduxCurrentPage) {
      dispatch(getCampaignsPage(urlCurrentPage))
    }
  }, [urlCurrentPage, dispatch, location.search, reduxCurrentPage])

  const { width } = useWindowSize()

  return (
    <ContainerBox>
      <ErrorBoundary message="Les expériences n'ont pas pu être affichées">
        <>
          <Title isCentered={width < 960}>Expériences</Title>
          {getPageStatus.hasFailed && (
            <ErrorCard message="Les expériences n'ont pas pu être chargées" />
          )}
          {getPageStatus.isLoading ? (
            <Box mt="2rem">
              <p>Chargement des expériences...</p>
            </Box>
          ) : (
            <>
              {creatorStatus === 'unverified' && (
                <Box mb="2rem" px={['2rem', 0, 0]}>
                  <NotificationCard
                    nature="info"
                    message="Votre profil n'a pas encore été validé par notre équipe. Vous ne pouvez donc pas encore postuler aux expériences"
                  />
                </Box>
              )}
              {creatorStatus === 'blocked' && (
                <Box mb="2rem" px={['2rem', 0, 0]}>
                  <NotificationCard
                    nature="info"
                    message="Votre profil n'a pas été validé par notre équipe. Vous ne pouvez donc pas postuler aux expériences"
                  />
                </Box>
              )}
              <Flex flexDirection="row" flexWrap="wrap" mx={[0, 0, '-2rem']} mt="-3rem" pb="2rem">
                {/* Ambassador program card */}
                <Box
                  width={[1, 6 / 12, 4 / 12]}
                  mt="3rem"
                  mx={['auto', 'unset', 'unset']}
                  px="2rem"
                >
                  <AmbassadorProgramCard />
                </Box>
                {/* List of experiences */}
                {experiences.map(_experience => (
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
                {experiences.length === 0 && (
                  <ContainerBox mt="3rem">
                    <NotificationCard
                      message="Pas de nouvelle expérience disponible"
                      nature="info"
                    />
                    <Box mt="1rem">
                      On dirait que vous avez postulé à toutes les expériences. Revenez plus tard !
                    </Box>
                  </ContainerBox>
                )}
              </Flex>
              {totalPages > 1 && (
                <Pagination
                  optionsBreadth={1}
                  totalPages={totalPages}
                  handlePageChange={page => {
                    history.push({ pathname: '/creator/experiences', search: `?page=${page}` })
                  }}
                  currentPage={urlCurrentPage}
                />
              )}
            </>
          )}
        </>
      </ErrorBoundary>
    </ContainerBox>
  )
}

export default withRouter(ExperiencesList)
