import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box } from '@rebass/grid'
import moment from 'moment'
import 'moment/locale/fr'
import IState from '../models/State'
import { ICollab } from '../models/Collab'
import { ContainerBox } from '../styles/grid'
import { ICreator } from '../models/Creator'
import { useToggle } from '../utils/hooks'
import CreatorProfile from './CreatorProfile'
import { reviewCollabProposition } from '../actions/collabs'
import ErrorBoundary from './ErrorBoundary'
import CheckBox from './CheckBox'
import NotificationCard from './NotificationCard'
import FullHeightColumns from './FullHeightColumns'
import SelectableCard from './SelectableCard'

moment.locale('fr')

const placeholderImage = 'https://dummyimage.com/40x40/d8dee3/D8DEE3.jpg'

interface ICampaignPropositionsProps {
  campaignId: string
}

const CampaignPropositions: React.FC<ICampaignPropositionsProps> = ({ campaignId }) => {
  // Redux stuff
  const dispatch = useDispatch()
  const newPropositions = useSelector<IState, ICollab[]>(state =>
    state.collabs.items.filter(
      _collab => _collab.campaign === campaignId && _collab.status === 'proposed'
    )
  )
  const refusedPropositions = useSelector<IState, ICollab[]>(state =>
    state.collabs.items.filter(
      _collab => _collab.campaign === campaignId && _collab.status === 'refused'
    )
  )
  const [showRefused, toggleShowRefused] = useToggle(false)

  React.useEffect(() => {
    setSelectedId(newPropositions.length && newPropositions[0]._id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newPropositions.length])

  const [selectedId, setSelectedId] = React.useState(
    newPropositions.length && newPropositions[0]._id
  )
  const selectedProposition =
    [...newPropositions, ...refusedPropositions].find(
      _proposition => _proposition._id === selectedId
    ) || newPropositions[0]
  const selectedCreator = selectedProposition && (selectedProposition.creator as ICreator)
  const selectedMessage = selectedProposition && selectedProposition.proposition.message
  const selectedFormats = selectedProposition && selectedProposition.proposition.formats

  const showPropositionPreview = _proposition => (
    <SelectableCard
      key={_proposition._id}
      selected={_proposition._id === selectedId}
      handleClick={() => setSelectedId(_proposition._id)}
      picture={(_proposition.creator as ICreator).picture || placeholderImage}
      title={(_proposition.creator as ICreator).name}
      description={moment(_proposition.creationDate).fromNow()}
    />
  )

  return (
    <ContainerBox mt="-2rem">
      <ErrorBoundary message="Les propositions n'ont pas pu être affichées">
        <FullHeightColumns
          leftComponent={() => (
            <>
              {newPropositions.length === 0 && (
                <Box mt="1rem">
                  <NotificationCard
                    nature="info"
                    message="Vous n'avez pas de nouvelle proposition"
                  />
                </Box>
              )}
              {newPropositions
                .sort((a, b) => (a.creationDate > b.creationDate ? -1 : 1))
                .map(showPropositionPreview)}
              <Box mb="1rem" px="2rem">
                <CheckBox
                  text="Afficher les propositions refusées"
                  isChecked={showRefused}
                  handleClick={toggleShowRefused}
                />
              </Box>
              {showRefused &&
                refusedPropositions
                  .sort((a, b) => (a.creationDate > b.creationDate ? -1 : 1))
                  .map(showPropositionPreview)}
            </>
          )}
          rightComponent={() => (
            <Box p="1rem" flex={1}>
              {selectedCreator && (
                <CreatorProfile
                  creatorId={selectedCreator._id}
                  collabId={selectedId}
                  conversationId={selectedProposition.conversation}
                  message={selectedMessage}
                  formats={selectedFormats}
                  handleAccept={() =>
                    dispatch(reviewCollabProposition({ collabId: selectedId, action: 'accept' }))
                  }
                  handleRefuse={() =>
                    dispatch(reviewCollabProposition({ collabId: selectedId, action: 'refuse' }))
                  }
                />
              )}
            </Box>
          )}
        />
      </ErrorBoundary>
    </ContainerBox>
  )
}

export default CampaignPropositions
