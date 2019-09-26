import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Flex } from '@rebass/grid'
import { IRequestStatus } from '../utils/request'
import ErrorCard from '../components/ErrorCard'
import SuccessCard from '../components/SuccessCard'
import { Title } from '../styles/Text'
import { FormInputLabel, FormInput } from '../styles/Form'
import { MainButtonSubmit, MainLink } from '../styles/Button'
import IState from '../models/State'
import { resetPasswordViaEmail } from '../actions/session'
import { usePageTitle } from '../utils/hooks'
import { ContainerBox } from '../styles/grid'

interface IRouterProps {
  token: string
}

interface IResetPasswordProps extends RouteComponentProps<IRouterProps> {}

const ResetPassword: React.FC<IResetPasswordProps> = ({ match }) => {
  // Page management
  usePageTitle('Réinitialiser le mot de passe')
  const { token } = match.params
  // Form state
  const [newPassword, setNewPassword] = React.useState('')
  const [confirmNewPassword, setConfirmNewPassword] = React.useState('')
  // Redux
  const dispatch = useDispatch()
  const { isLoading, hasSucceeded, hasFailed } = useSelector<IState, IRequestStatus>(
    state => state.session.requests.resetPasswordViaEmail
  )

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(resetPasswordViaEmail({ newPassword, token }))
  }

  return (
    <ContainerBox>
      <Flex justifyContent="center" flexDirection="column" width={[1, 10 / 12, 6 / 12]} mx="auto">
        <Title>Réinitialiser votre mot de passe</Title>
        {hasSucceeded ? (
          <>
            <SuccessCard message="Votre mot de passe a bien été enregistré" />
            <MainLink to="/login">Se connecter</MainLink>
          </>
        ) : (
          <form onSubmit={handleFormSubmit}>
            {/* New password */}
            <FormInputLabel>
              Nouveau mot de passe
              <FormInput
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                type="password"
                placeholder="Au moins 6 carctères"
                pattern=".{6,}"
                required
                hasLabel
              />
            </FormInputLabel>
            {/* Confirm new password */}
            <FormInputLabel>
              Confirmer le mot de passe
              <FormInput
                value={confirmNewPassword}
                onChange={e => setConfirmNewPassword(e.target.value)}
                type="password"
                placeholder="Même mot de passe"
                required
                hasLabel
              />
            </FormInputLabel>
            {hasFailed && <ErrorCard message="Ce lien n'est pas valide" />}
            <MainButtonSubmit
              value={isLoading ? 'Enregistrement...' : 'Enregistrer le mot de passe'}
              type="submit"
              disabled={isLoading || newPassword !== confirmNewPassword}
            />
          </form>
        )}
      </Flex>
    </ContainerBox>
  )
}

export default ResetPassword
