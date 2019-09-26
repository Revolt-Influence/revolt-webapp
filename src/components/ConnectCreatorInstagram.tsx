import React, { useState } from 'react'
import copy from 'copy-to-clipboard'
import styled from 'styled-components'
import { captureException } from '@sentry/core'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Flex } from '@rebass/grid'
import CheckList from './CheckList'
import { FormInputLabel, FormInput } from '../styles/Form'
import { MainButtonSubmit, MainButton, TextButton } from '../styles/Button'
import IState from '../models/State'
import { IRequestStatus } from '../utils/request'
import { setFont } from '../utils/styles'
import { linkInstagram, checkInstagramToken } from '../actions/creators'
import ErrorCard from './ErrorCard'
import { ICreator } from '../models/Creator'
import { palette } from '../utils/colors'
import OrderedList from './OrderedList'
import InstagramPreview from './InstagramPreview'
import { useRenderCount } from '../utils/hooks'
import { IInfluencer } from '../models/Influencer'
import ErrorBoundary from './ErrorBoundary'
import { getInfluencerData } from '../utils/crawler'
import { errorNames } from '../utils/errors'

const Code = styled.p`
  color: ${palette.green._500};
  margin-right: 2rem;
  ${setFont(600, 'big')}
`

const ConnectCreatorInstagram: React.FC<{}> = () => {
  // Redux stuff
  const dispatch = useDispatch()
  const creator = useSelector<IState, ICreator>(state => state.session.creator)
  const connectStatus = useSelector<IState, IRequestStatus>(
    state => state.session.requests.linkInstagramAccount
  )

  const rules = [
    'Au moins 250 likes par post',
    'Pas de faux followers',
    'Compte toujours public',
    'Moins de 50% de placements de produits dans les posts',
    'Qualité de photo professionnelle',
  ]
  const [username, setUsername] = React.useState('')
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(linkInstagram(username))
  }

  const [copyButtonText, setCopyButtonText] = React.useState('Copier le hashtag')
  const renderCount = useRenderCount()
  const [hasApplied, setHasApplied] = React.useState(creator.instagramUsername != null)
  React.useEffect(() => {
    if (renderCount > 0 && connectStatus.hasSucceeded) {
      setHasApplied(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectStatus.hasSucceeded])
  const verifyStatus = useSelector<IState, IRequestStatus>(
    state => state.creators.requests.checkInstagramToken
  )

  // Local state
  const [influencerDataLoading, setInfluencerDataLoading] = useState<boolean>(false)
  const [influencerDataError, setInfluencerDataError] = useState<boolean>(false)
  const handleCheckInstagramToken = async () => {
    setInfluencerDataError(null)
    setInfluencerDataLoading(true)
    try {
      const influencerData = await getInfluencerData(username || creator.instagramUsername)
      dispatch(checkInstagramToken(influencerData))
    } catch (_error) {
      setInfluencerDataError(true)
      captureException(_error)
    }
    setInfluencerDataLoading(false)
  }

  // New users, suggest Instagram connect
  if (!hasApplied) {
    return (
      <form onSubmit={handleSubmit}>
        <p>Votre profil sera vérifié par notre équipe. Il doit respecter les règles suivantes :</p>
        <Box mt="1.5rem">
          <CheckList items={rules} />
        </Box>
        <Box width={[1, 10 / 12, 6 / 12]} mt="3rem">
          <FormInputLabel>
            Instagram @username
            <FormInput
              value={username}
              onChange={e => (e.target.value.includes('@') ? null : setUsername(e.target.value))}
              placeholder="username"
              required
              hasLabel
            />
          </FormInputLabel>
        </Box>
        {connectStatus.hasFailed && (
          <ErrorCard message="Votre Instagram n'a pas pu être connecté" />
        )}
        <MainButtonSubmit
          type="submit"
          value={connectStatus.isLoading ? 'Connexion...' : 'Connecter mon Instagram'}
          disabled={connectStatus.isLoading}
        />
      </form>
    )
  }

  const getErrorMessage = (message: string | boolean): string => {
    switch (message) {
      case errorNames.invalidToken:
        return 'Code invalide'
      case errorNames.notEnoughFollowers:
        return "Vous n'avez pas encore 250 likes par post"
      default:
        return "Nous n'avons pas pu vérifier votre compte"
    }
  }

  // Users waiting for their profile to be reviewed
  if (!creator.instagramIsVerified) {
    const hashtag = `#check${creator.instagramToken}`
    return (
      <div>
        <p style={{ marginBottom: '0.6rem' }}>
          Veuillez prouver que le compte @{username || creator.instagramUsername} vous appartient.
        </p>
        <OrderedList
          items={[
            'Copier le hashtag ci-dessous',
            'Coller ce hashtag dans la description de votre dernier post Instagram',
            "Retournez sur Revolt et cliquez sur 'Connecter mon compte'",
            'Vous pourrez ensuite retirer le hashtag une fois votre compte connecté',
          ]}
        />
        <Flex alignItems="center" mt="2rem">
          <Code>{hashtag}</Code>
          <MainButton
            inverted
            smaller
            noMargin
            nature="primary"
            onClick={() => {
              copy(hashtag)
              setCopyButtonText('Copié !')
              window.setTimeout(() => setCopyButtonText('Copier le hashtag'), 2000)
            }}
          >
            {copyButtonText}
          </MainButton>
        </Flex>
        {/* All possible error messages */}
        {influencerDataError && <ErrorCard message="Nous n'avons pas pu vérifier votre compte" />}
        {verifyStatus.hasFailed && <ErrorCard message={getErrorMessage(verifyStatus.hasFailed)} />}
        <Box mt="1rem">
          <MainButton
            disabled={influencerDataLoading || verifyStatus.isLoading}
            onClick={handleCheckInstagramToken}
          >
            {verifyStatus.isLoading || influencerDataLoading
              ? 'Connexion...'
              : 'Connecter mon compte'}
          </MainButton>
        </Box>

        <Box mt="2rem">
          <TextButton
            noMargin
            style={{ color: palette.grey._500 }}
            onClick={() => setHasApplied(false)}
          >
            Changer mon pseudo
          </TextButton>
        </Box>
      </div>
    )
  }

  // Existing and connected users
  if (creator.instagramIsVerified) {
    return (
      <div>
        <p>Vous avez bien connecté votre compte Instagram.</p>
        {typeof creator.instagram === 'string' || creator.instagram == null ? (
          <p>Votre compte est @{creator.instagramUsername} sur Instagram</p>
        ) : (
          <ErrorBoundary message="L'aperçu de votre Instagram n'a pas pu être affiché">
            <Box mt="1rem">
              <InstagramPreview profile={creator.instagram as IInfluencer} />
            </Box>
          </ErrorBoundary>
        )}
      </div>
    )
  }
}

export default ConnectCreatorInstagram
