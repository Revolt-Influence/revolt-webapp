import React, { useState } from 'react'
import { Flex, Box } from '@rebass/grid'
import { FormInputLabel, FormInput } from '../styles/Form'
import DropImage from './DropImage'
import { MainButtonSubmit } from '../styles/Button'
import ErrorCard from './ErrorCard'
import SuccessCard from './SuccessCard'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_SESSION } from './Session'
import { GetSession } from '../__generated__/GetSession'
import Loader from './Loader'
import gql from 'graphql-tag'
import {
  UpdateCreatorProfileVariables,
  UpdateCreatorProfile,
} from '../__generated__/UpdateCreatorProfile'

const UPDATE_CREATOR_PROFILE = gql`
  mutation UpdateCreatorProfile($name: String!, $picture: String!) {
    updateCreatorProfile(newPicture: $picture, newName: $name) {
      _id
      name
      picture
    }
  }
`

const CreatorIdentityProfile: React.FC<{}> = () => {
  // Form state
  const [newName, setNewName] = useState<string>(null)
  const [newPicture, setNewPicture] = useState<string>(null)
  const [succeeded, setSucceeded] = useState<boolean>(false)

  // Server requests
  const sessionStatus = useQuery<GetSession>(GET_SESSION, {
    onCompleted: sessionData => {
      const { name, picture } = sessionData.session.creator
      setNewName(name)
      setNewPicture(picture)
    },
  })
  const [updateCreatorProfile, updateCreatorProfileStatus] = useMutation<
    UpdateCreatorProfile,
    UpdateCreatorProfileVariables
  >(UPDATE_CREATOR_PROFILE, { onCompleted: () => setSucceeded(true) })

  if (sessionStatus.loading) {
    return <Loader />
  }
  if (sessionStatus.error) {
    return <ErrorCard />
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    updateCreatorProfile({ variables: { name: newName, picture: newPicture } })
  }

  return (
    <form onSubmit={handleSubmit}>
      <Flex flexDirection="row" flexWrap="wrap">
        <Box width={[1, 1, 6 / 12]} pr={[0, 0, '1rem']}>
          <FormInputLabel>
            Photo
            <DropImage
              currentImages={[newPicture]}
              handleDrop={urls => setNewPicture(urls[0])}
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
      {updateCreatorProfileStatus.error && (
        <ErrorCard message="Votre profil n'a pas pu être modifié" />
      )}
      {succeeded && <SuccessCard message="Votre profil a bien été modifié" />}
      <MainButtonSubmit
        value={updateCreatorProfileStatus.loading ? 'Enregistrement...' : 'Enregistrer'}
        disabled={updateCreatorProfileStatus.loading}
      />
    </form>
  )
}

export default CreatorIdentityProfile
