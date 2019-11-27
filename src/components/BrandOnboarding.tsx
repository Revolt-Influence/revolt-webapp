import React from 'react'
import { useHistory } from 'react-router-dom'
import OnboardingSlide from './OnboardingSlide'

const landingIllustration = require('../images/illustrations/landing.svg')
const propositionsIllustration = require('../images/illustrations/propositions.svg')
const performancesIllustration = require('../images/illustrations/performances.svg')
const emailCampaignIllustration = require('../images/illustrations/emailCampaign.svg')

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
  // Store current status in state
  const [slidesState, slidesDispatch] = React.useReducer(slidesReducer, initialSlidesState)

  // Slides data
  const slides = [
    {
      title: 'Create your campaign',
      description:
        'Tell us about your product and we will publish your campaign, so you can receive offers from streamers that would be a perfect match for your product.',
      buttonText: 'Next step',
      handleButtonClick: () => slidesDispatch('NEXT_SLIDE'),
      image: landingIllustration,
    },
    {
      title: 'Send invites to influencers',
      description:
        'Using the invite link we give you, you can send invites to any influencer that may be interested in your product. You will then receive requests on your campaign dashboard.',
      buttonText: 'Next step',
      handleButtonClick: () => slidesDispatch('NEXT_SLIDE'),
      image: emailCampaignIllustration,
    },
    {
      title: 'Negociate the smart way',
      description:
        "You'll have access to the community insights of each influencer and an estimation of how much engagement you'll get for each partnership. Negotiate the influencer's remuneration more efficiently by knowing the figures that matter. Trust the data, not promises.",
      buttonText: 'Next step',
      handleButtonClick: () => slidesDispatch('NEXT_SLIDE'),
      image: propositionsIllustration,
    },
    {
      title: 'Measure your performances',
      description:
        "Forget about filling spreadsheets. In one click you'll get a custom report of the performances of your campaigns and estimate the engagement generated.",
      buttonText: 'Create my campaign',
      handleButtonClick: () => history.push('/brand/createCampaign'),
      image: performancesIllustration,
    },
  ]

  // Onboarding slides
  return <OnboardingSlide {...slides[slidesState.slide]} index={slidesState.slide + 1} />
}

export default BrandOnboarding
