import React, { useEffect, useState } from 'react'
import moment from 'moment'
import 'moment/locale/fr'
import { useSelector, useDispatch } from 'react-redux'
import { useIsAdmin, usePageTitle } from '../utils/hooks'
import { Redirect, withRouter, RouteComponentProps } from 'react-router-dom'
import IState from '../models/State'
import { ICreatorState, CreatorStatus } from '../models/Creator'
import { ContainerBox } from '../styles/grid'
import ErrorBoundary from '../components/ErrorBoundary'
import { getCreatorsPage, setCreatorStatus } from '../actions/creators'
import Loader from '../components/Loader'
import FullHeightColumns from '../components/FullHeightColumns'
import SelectableCard from '../components/SelectableCard'
import { Flex, Box } from '@rebass/grid'
import { TextButton } from '../styles/Button'
import CreatorProfile from '../components/CreatorProfile'
import { Title } from '../styles/Text'
import Dropdown from '../components/Dropdown'

moment.locale('fr')

const Community: React.FC<RouteComponentProps> = ({ location }) => {
  usePageTitle('Communauté')

  // Get all the data we need from Redux
  const {
    items: creators,
    totalPages,
    // currentPage,
    requests: { getProfilesPage: getProfilesStatus },
  } = useSelector<IState, ICreatorState>(state => state.creators)
  const dispatch = useDispatch()
  const [filter, setFilter] = useState<CreatorStatus>('unverified')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const filteredCreators = creators.filter(_creator => _creator.status === filter)

  const [selectedId, setSelectedId] = useState<string>(null)

  useEffect(() => {
    dispatch(getCreatorsPage(currentPage, filter))
  }, [currentPage, dispatch, filter])

  useEffect(() => {
    if (filteredCreators.length > 0 && getProfilesStatus.hasSucceeded) {
      // Set the first one if it exists
      setSelectedId(filteredCreators[0]._id)
    } else {
      // List is empty or not ready, don't select anything
      setSelectedId(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getProfilesStatus.hasSucceeded])

  // Make sure page is only visible to admin users
  const isAdmin = useIsAdmin()
  if (!isAdmin) {
    return <Redirect to="/" />
  }

  if (getProfilesStatus.isLoading) {
    return <Loader fullScreen />
  }

  const translateStatus = (status: CreatorStatus): string => {
    switch (status) {
      case 'unverified':
        return 'Non vérifié'
      case 'verified':
        return 'Vérifié'
      case 'blocked':
        return 'Bloqué'
      default:
        return status
    }
  }

  const handleFilterChange = (newFilter: CreatorStatus) => {
    setFilter(newFilter)
    dispatch(getCreatorsPage(1, newFilter))
  }

  const handleSetStatus = (newStatus: CreatorStatus) => {
    // Make sure new status is different from the previous one
    if (newStatus !== creators.find(_creator => _creator._id === selectedId).status) {
      // Save change in server
      dispatch(setCreatorStatus({ creatorId: selectedId, newStatus }))
      // Select next creator in the list
      const potentialNextSelections = filteredCreators
        .filter(_creator => _creator._id !== selectedId)
        .map(_creator => _creator._id)
      const nextSelectionId = potentialNextSelections.length > 0 ? potentialNextSelections[0] : null
      setSelectedId(nextSelectionId)
    }
  }

  return (
    <ErrorBoundary message="La communauté d'influenceurs n'a pas pu être affichée">
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
              <Title>Communauté</Title>
              <Box flex={1} style={{ overflowY: 'scroll' }} pb="1rem">
                <Dropdown
                  name="Statut"
                  selection={filter}
                  options={['unverified', 'verified', 'blocked'] as CreatorStatus[]}
                  handleChange={handleFilterChange}
                  withMargin
                />
                {currentPage > 1 && (
                  <TextButton onClick={() => setCurrentPage(currentPage - 1)}>
                    Voir les plus récents
                  </TextButton>
                )}
                {filteredCreators.map(_creator => (
                  <SelectableCard
                    selected={selectedId === _creator._id}
                    key={_creator._id}
                    title={_creator.name}
                    picture={_creator.picture}
                    description={`${translateStatus(_creator.status)} · inscrit${
                      _creator.gender === 'female' ? 'e' : ''
                    } ${moment(_creator.signupDate).fromNow()}`}
                    handleClick={() => setSelectedId(_creator._id)}
                  />
                ))}
                {totalPages > currentPage && (
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
                <CreatorProfile
                  creatorId={selectedId}
                  handleAccept={() => handleSetStatus('verified')}
                  handleRefuse={() => handleSetStatus('blocked')}
                />
              )}
            </Box>
          )}
        />
      </ContainerBox>
    </ErrorBoundary>
  )
}

export default withRouter(Community)
