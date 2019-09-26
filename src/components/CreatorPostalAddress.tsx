import React from 'react'
import { Box } from '@rebass/grid'
import { useSelector, useDispatch } from 'react-redux'
import { IPostalAddress, ICreator } from '../models/Creator'
import NotificationCard from './NotificationCard'
import PostalAddressForm from './PostalAddressForm'
import { MainButtonSubmit } from '../styles/Button'
import IState from '../models/State'
import { IRequestStatus } from '../utils/request'
import { savePostalAddress } from '../actions/creators'
import SuccessCard from './SuccessCard'
import ErrorCard from './ErrorCard'

const initialAddress: IPostalAddress = {
  firstName: '',
  lastName: '',
  address: '',
  addressLine2: '',
  postalCode: '',
  city: '',
  country: '',
}

function addressReducer(address: IPostalAddress, { type, payload }) {
  switch (type) {
    case 'firstName':
      return { ...address, firstName: payload }
    case 'lastName':
      return { ...address, lastName: payload }
    case 'address':
      return { ...address, address: payload }
    case 'addressLine2':
      return { ...address, addressLine2: payload }
    case 'postalCode':
      return { ...address, postalCode: payload }
    case 'city':
      return { ...address, city: payload }
    case 'country':
      return { ...address, country: payload }
    default:
      return address
  }
}

const CreatorPostalAddress = () => {
  const creator = useSelector<IState, ICreator>(state => state.session.creator)
  const [address, dispatchAddress] = React.useReducer(
    addressReducer,
    creator.postalAddress || initialAddress
  )
  const dispatch = useDispatch()
  const { isLoading, hasFailed, hasSucceeded } = useSelector<IState, IRequestStatus>(
    state => state.session.requests.savePostalAddress
  )

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(savePostalAddress(address))
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box mb="1rem">
        <NotificationCard
          message="Votre adresse sera utilisée uniquement pour vous envoyer des produits"
          nature="info"
        />
      </Box>
      <PostalAddressForm address={address} handleChange={dispatchAddress} />
      {hasSucceeded && <SuccessCard message="Votre adresse a bien été enregistrée" />}
      {hasFailed && <ErrorCard message="Votre adresse n'a pas pu être enregistrée" />}
      <MainButtonSubmit
        disabled={isLoading}
        value={isLoading ? 'Enregistrement...' : 'Enregistrer mon adresse'}
      />
    </form>
  )
}

export default CreatorPostalAddress
