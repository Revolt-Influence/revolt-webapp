import React from 'react'
import { Box } from '@rebass/grid'
import { useSelector, useDispatch } from 'react-redux'
import IState from '../models/State'
import { ISession } from '../models/Session'
import { MainButton } from '../styles/Button'
import { logoutUser } from '../actions/session'
import { IRequestStatus } from '../utils/request'
import ErrorCard from './ErrorCard'

const Session: React.FC<{}> = () => {
  const dispatch = useDispatch()
  const { type, creator, user } = useSelector<IState, ISession>(state => state.session)
  const email = type === 'brand' ? user.email : creator.email
  const logoutStatus = useSelector<IState, IRequestStatus>(state => state.session.requests.logout)
  return (
    <div>
      <Box mb="1rem">Vous êtes connecté en tant que {email}</Box>
      {logoutStatus.hasFailed ? <ErrorCard message="La déconnexion a échoué" /> : null}
      <MainButton
        onClick={() => dispatch(logoutUser())}
        disabled={logoutStatus.isLoading}
        noMargin
        inverted
      >
        {logoutStatus.isLoading ? 'Déconnexion...' : 'Se déconnecter'}
      </MainButton>
    </div>
  )
}

export default Session
