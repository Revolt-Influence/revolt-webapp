import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { MainButtonSubmit } from '../styles/Button'
import { FormInputLabel, FormTextarea } from '../styles/Form'
import ErrorCard from './ErrorCard'
import SuccessCard from './SuccessCard'
import SplitView from './SplitView'
import CheckBox from './CheckBox'
import { IRequestStatus } from '../utils/request'
import IState from '../models/State'
import { applyToExperience } from '../actions/collabs'
import { TaskFormatType } from '../models/Campaign'
import { ICollabProposition } from '../models/Collab'
import { ICreator } from '../models/Creator'
import NotificationCard from './NotificationCard'

interface IExperienceFormProps {
  brand: string
  experienceId: string
  possibleFormats: TaskFormatType[]
}

const ExperienceForm: React.FC<IExperienceFormProps> = ({
  brand,
  experienceId,
  possibleFormats,
}) => {
  const creator = useSelector<IState, ICreator>(state => state.session.creator)
  const hasYoutube = creator.youtube != null

  const [message, setMessage] = React.useState<string>('')
  const [acceptsTerms, setAcceptsTerms] = React.useState<boolean>(false)
  const [formats, setFormats] = React.useState<TaskFormatType[]>([])
  const [someFormatsNotAvailable, setSomeFormatsNotAvailable] = React.useState<boolean>(false)

  const dispatch = useDispatch()
  const applyStatus = useSelector<IState, IRequestStatus>(
    state => state.collabs.requests.applyToExperience
  )

  const checkIfAllowSubmit = () => {
    if (!acceptsTerms || formats.length === 0 || message.length === 0) {
      return false
    }
    return true
  }
  const allowSubmit = checkIfAllowSubmit()

  const toggleReviewFormat = (toggledFormat: TaskFormatType) => {
    if (formats.includes(toggledFormat)) {
      // Remove format if it's already there
      setFormats(formats.filter(_format => _format !== toggledFormat))
    } else {
      // Or add format
      setFormats([...formats, toggledFormat])
    }
  }

  const handleSubmit = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault()
    const proposition: ICollabProposition = {
      message,
      formats,
    }
    dispatch(applyToExperience({ proposition, campaignId: experienceId }))
  }

  const showFormatText = (_format: TaskFormatType): string => {
    switch (_format) {
      case 'Youtube video':
        return `YouTube${hasYoutube ? '' : ' (non connecté)'}`
      default:
        return _format
    }
  }

  const checkIfFormatPossible = (_format: TaskFormatType): boolean => {
    const checkIsPossible = (): boolean => {
      switch (_format) {
        case 'Youtube video':
          return hasYoutube
        default:
          return false
      }
    }
    const isPossible = checkIsPossible()
    if (!isPossible && !someFormatsNotAvailable) {
      setSomeFormatsNotAvailable(true)
    }
    return isPossible
  }

  return (
    <SplitView title="Postuler" ratio={4 / 12} noBorder>
      {someFormatsNotAvailable && (
        <NotificationCard
          message="Vous n'avez pas encore accès à certaines plateformes. Débloquez les en connectant vos comptes sur votre profil"
          nature="info"
        />
      )}
      <FormInputLabel>
        Plateformes où vous posterez votre revue
        {possibleFormats.map(_possibleFormat => (
          <CheckBox
            text={showFormatText(_possibleFormat)}
            isChecked={formats.includes(_possibleFormat)}
            handleClick={() => toggleReviewFormat(_possibleFormat)}
            disabled={!checkIfFormatPossible(_possibleFormat)}
            key={_possibleFormat}
          />
        ))}
      </FormInputLabel>
      <FormInputLabel>
        Message de motivation pour {brand}
        <FormTextarea
          hasLabel
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Les candidatures avec un message de motivation ont plus de chances d'être sélectionnées"
        />
      </FormInputLabel>
      <CheckBox
        handleClick={() => setAcceptsTerms(!acceptsTerms)}
        text={`En cochant cette case, vous vous engagez contractuellement à réaliser les livrables attendus dans les délais, dès lors que ${brand} valide le partenariat.`}
        isChecked={acceptsTerms}
      />
      {applyStatus.hasFailed && (
        <ErrorCard message="Votre candidature n'a pas pu être enregistrée" />
      )}
      {applyStatus.hasSucceeded && (
        <SuccessCard
          message={`Votre candidature a bien été enregistrée. ${brand} vous contactera si vous êtes sélectionné`}
        />
      )}
      <MainButtonSubmit
        type="submit"
        value={applyStatus.isLoading ? 'Envoi de votre demande...' : 'Postuler'}
        disabled={!allowSubmit || applyStatus.isLoading}
        onClick={handleSubmit}
      />
    </SplitView>
  )
}

export default ExperienceForm
