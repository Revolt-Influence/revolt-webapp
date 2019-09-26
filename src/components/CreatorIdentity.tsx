import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Flex, Box } from '@rebass/grid'
import { FormInputLabel, FormInput } from '../styles/Form'
import IState from '../models/State'
import { ICreator } from '../models/Creator'
import DropImage from './DropImage'
import { MainButtonSubmit } from '../styles/Button'
import { saveCreatorProfile } from '../actions/creators'
import { IRequestStatus } from '../utils/request'
import ErrorCard from './ErrorCard'
import SuccessCard from './SuccessCard'

const CreatorIdentityProfile: React.FC<{}> = () => {
  // Redux stuff
  const dispatch = useDispatch()
  const { name, picture } = useSelector<IState, ICreator>(state => state.session.creator)
  const { isLoading, hasFailed, hasSucceeded } = useSelector<IState, IRequestStatus>(
    state => state.session.requests.saveCreatorProfile
  )

  // Form state
  const [newName, setNewName] = React.useState(name)
  const [newPicture, setNewPicture] = React.useState(picture)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(saveCreatorProfile({ name: newName, picture: newPicture }))
  }

  return (
    <form onSubmit={handleSubmit}>
      <Flex flexDirection="row" flexWrap="wrap">
        <Box width={[1, 1, 6 / 12]} pr={[0, 0, '1rem']}>
          <FormInputLabel>
            Photo
            <DropImage
              currentImage={newPicture}
              handleDrop={url => setNewPicture(url)}
              preset="creator_picture"
            />
          </FormInputLabel>
        </Box>
        <Box width={[1, 1, 6 / 12]} pl={[0, 0, '1rem']}>
          <FormInputLabel>
            Nom d'affichage
            <FormInput
              value={newName}
              onChange={e => setNewName(e.target.value)}
              placeholder="Votre nom"
              hasLabel
            />
          </FormInputLabel>
        </Box>
      </Flex>
      {hasFailed && <ErrorCard message="Votre profil n'a pas pu être modifié" />}
      {hasSucceeded && <SuccessCard message="Votre profil a bien été modifié" />}
      <MainButtonSubmit
        value={isLoading ? 'Enregistrement...' : 'Enregistrer'}
        disabled={isLoading}
      />
    </form>
  )
}

export default CreatorIdentityProfile
