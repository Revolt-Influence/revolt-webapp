import React, { useState } from 'react'
import moment from 'moment'
import { usePageTitle } from '../utils/hooks'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { ContainerBox } from '../styles/grid'
import ErrorBoundary from '../components/ErrorBoundary'
import Loader from '../components/Loader'
import FullHeightColumns from '../components/FullHeightColumns'
import SelectableCard from '../components/SelectableCard'
import { Flex, Box } from '@rebass/grid'
import { TextButton, MainButton } from '../styles/Button'
import CreatorProfile, { CREATOR_PROFILE_FRAGMENT } from '../components/CreatorProfile'
import { Title } from '../styles/Text'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GetCreatorsPage, GetCreatorsPageVariables } from '../__generated__/GetCreatorsPage'
import { CreatorStatus } from '../__generated__/globalTypes'
import ErrorCard from '../components/ErrorCard'
import { SetCreatorStatus, SetCreatorStatusVariables } from '../__generated__/SetCreatorStatus'
import { showCreatorStatus } from '../utils/enums'
import { FormSelect } from '../styles/Form'

const GET_CREATORS_PAGE = gql`
  query GetCreatorsPage($page: Float!, $status: CreatorStatus!) {
    creators(page: $page, status: $status) {
      currentPage
      totalPages
      items {
        ...CreatorProfileFragment
        status
        createdAt
      }
    }
  }
  ${CREATOR_PROFILE_FRAGMENT}
`

const SET_CREATOR_STATUS = gql`
  mutation SetCreatorStatus($creatorId: String!, $newStatus: CreatorStatus!) {
    setCreatorStatus(newStatus: $newStatus, creatorId: $creatorId) {
      _id
      status
    }
  }
`

const Community: React.FC<RouteComponentProps> = ({ location }) => {
  usePageTitle('Community')
  // User defined state
  const [filter, setFilter] = useState<CreatorStatus>(CreatorStatus.UNVERIFIED)
  const [selectedId, setSelectedId] = useState<string>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)

  const { data: { creators: paginatedCreators } = { creators: null }, loading, error } = useQuery<
    GetCreatorsPage,
    GetCreatorsPageVariables
  >(GET_CREATORS_PAGE, {
    variables: { page: currentPage, status: filter },
    fetchPolicy: 'network-only',
    onCompleted: ({ creators: _paginatedCreators }) => {
      if (_paginatedCreators.items.length > 0) {
        // Set the first one if it exists
        setSelectedId(_paginatedCreators.items[0]._id)
      } else {
        // List is empty or not ready, don't select anything
        setSelectedId(null)
      }
    },
  })

  const [setCreatorStatus, { loading: setStatusLoading }] = useMutation<
    SetCreatorStatus,
    SetCreatorStatusVariables
  >(SET_CREATOR_STATUS, {
    refetchQueries: [
      { query: GET_CREATORS_PAGE, variables: { page: currentPage, status: filter } },
    ],
    awaitRefetchQueries: true,
  })

  if (loading) {
    return <Loader fullScreen />
  }
  if (error) {
    return <ErrorCard />
  }

  const handleFilterChange = (newFilter: CreatorStatus) => {
    setFilter(newFilter)
  }

  const handleSetStatus = (newStatus: CreatorStatus) => {
    // Make sure new status is different from the previous one
    if (
      newStatus !== paginatedCreators.items.find(_creator => _creator._id === selectedId).status
    ) {
      // Save change in server
      setCreatorStatus({ variables: { creatorId: selectedId, newStatus } })
      // Select next creator in the list
      const potentialNextSelections = paginatedCreators.items
        .filter(_creator => _creator._id !== selectedId)
        .map(_creator => _creator._id)
      const nextSelectionId = potentialNextSelections.length > 0 ? potentialNextSelections[0] : null
      setSelectedId(nextSelectionId)
    }
  }

  return (
    <ErrorBoundary message="Could not show community">
      <ContainerBox>
        <FullHeightColumns
          noPadding
          leftComponent={() => (
            <Flex
              flex={1}
              width={1}
              flexDirection="column"
              justifyContent="space-between"
              style={{ height: '100%', maxHeight: '100%' }}
            >
              <Title>Community</Title>
              <Box flex={1} style={{ overflowY: 'scroll' }} pb="1rem">
                Status:{' '}
                <FormSelect
                  value={filter}
                  onChange={e => handleFilterChange(e.target.value as CreatorStatus)}
                >
                  {[CreatorStatus.UNVERIFIED, CreatorStatus.VERIFIED, CreatorStatus.BLOCKED].map(
                    _status => (
                      <option key={_status} value={_status}>
                        {showCreatorStatus(_status)}
                      </option>
                    )
                  )}
                </FormSelect>
                {currentPage > 1 && (
                  <TextButton onClick={() => setCurrentPage(currentPage - 1)}>
                    See more recents
                  </TextButton>
                )}
                {paginatedCreators.items.map(_creator => (
                  <SelectableCard
                    selected={selectedId === _creator._id}
                    key={_creator._id}
                    title={_creator.name}
                    picture={_creator.picture}
                    description={`${showCreatorStatus(_creator.status)} · signed up ${moment(
                      _creator.createdAt
                    ).fromNow()}`}
                    handleClick={() => setSelectedId(_creator._id)}
                  />
                ))}
                {paginatedCreators.totalPages > currentPage && (
                  <TextButton onClick={() => setCurrentPage(currentPage + 1)}>
                    Voir les plus anciens
                  </TextButton>
                )}
              </Box>
            </Flex>
          )}
          rightComponent={() => (
            <Box p="2rem" flex={1}>
              {selectedId && (
                <>
                  <Flex flexDirection="row" mb="2rem">
                    <Box mr="2rem">
                      <MainButton
                        nature="success"
                        noMargin
                        inverted
                        onClick={() => handleSetStatus(CreatorStatus.VERIFIED)}
                        disabled={setStatusLoading}
                      >
                        Accept
                      </MainButton>
                    </Box>
                    <MainButton
                      nature="danger"
                      noMargin
                      inverted
                      onClick={() => handleSetStatus(CreatorStatus.BLOCKED)}
                      disabled={setStatusLoading}
                    >
                      Refuse
                    </MainButton>
                  </Flex>
                  <CreatorProfile creatorId={selectedId} />
                </>
              )}
            </Box>
          )}
        />
      </ContainerBox>
    </ErrorBoundary>
  )
}

export default withRouter(Community)
