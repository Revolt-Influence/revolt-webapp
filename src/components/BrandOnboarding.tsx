import React from 'react'
import { useHistory } from 'react-router-dom'
import OnboardingSlide from './OnboardingSlide'
import { useMutation } from '@apollo/react-hooks'
import { CreateCampaign } from '../__generated__/CreateCampaign'
import { CREATE_CAMPAIGN, GET_CAMPAIGNS } from '../pages/CampaignsList'

const landingIllustration = require('../images/illustrations/landing.svg')
const propositionsIllustration = require('../images/illustrations/propositions.svg')
const performancesIllustration = require('../images/illustrations/performances.svg')

interface ISlidesState {
  step: 'intro' | 'slides'
  slide: number
}

const initialSlidesState: ISlidesState = {
  step: 'slides',
  slide: 0,
}

const slidesReducer = (
  state: ISlidesState,
  action: 'NEXT_SLIDE' | 'START_SLIDES'
): ISlidesState => {
  switch (action) {
    case 'START_SLIDES':
      return {
        step: 'slides',
        slide: 0,
      }
    case 'NEXT_SLIDE':
      return {
        ...state,
        slide: state.slide + 1,
      }
    default:
      return state
  }
}

const BrandOnboarding: React.FC<{}> = () => {
  const history = useHistory()
  const [createCampaign] = useMutation<CreateCampaign>(CREATE_CAMPAIGN, {
    onCompleted: ({ createCampaign: { _id } }) => {
      history.push(`/brand/campaigns/${_id}/brief`)
    },
    // Add created campaign to cache
    refetchQueries: [{ query: GET_CAMPAIGNS }],
  })
  // Store current status in state
  const [slidesState, slidesDispatch] = React.useReducer(slidesReducer, initialSlidesState)

  // Slides data
  const slides = [
    {
      title: 'Create your campaign',
      description:
        'Fill your campaign brief in less than two minutes and receive offers from streamers that would be a perfect match for your game.',
      buttonText: 'Next step',
      handleButtonClick: () => slidesDispatch('NEXT_SLIDE'),
      image: landingIllustration,
    },
    {
      title: 'Negociate the smart way',
      description:
        'You’ll have access to the community insights of each influencer and an estimation of how much engagement you’ll get for each partnership. Negotiate the influencer’s remuneration more efficiently by knowing the figures that matter. Trust the data, not promises.',
      buttonText: 'Next step',
      handleButtonClick: () => slidesDispatch('NEXT_SLIDE'),
      image: propositionsIllustration,
    },
    {
      title: 'Measure your performances',
      description:
        "Forget about filling spreadsheets. In one click you'll get a custom report of the performances of your campaigns and estimate the engagement generated.",
      buttonText: 'Create my campaign',
      handleButtonClick: () => createCampaign(),
      image: performancesIllustration,
    },
  ]

  // Onboarding slides
  return <OnboardingSlide {...slides[slidesState.slide]} index={slidesState.slide + 1} />
}

export default BrandOnboarding
