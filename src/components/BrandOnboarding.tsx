import React from 'react'
import styled from 'styled-components'
import { Flex } from '@rebass/grid'
import { useDispatch } from 'react-redux'
import { MainButton } from '../styles/Button'
import { setFont } from '../utils/styles'
import OnboardingSlide from './OnboardingSlide'
import { createCampaign } from '../actions/campaigns'

const landingIllustration = require('../images/illustrations/landing.png')
const campaignIllustration = require('../images/illustrations/campaign.svg')
const propositionsIllustration = require('../images/illustrations/propositions.svg')
const performancesIllustration = require('../images/illustrations/performances.svg')

const Title = styled.p`
  ${setFont(600, 'huge')}
  max-width: 20em;
  line-height: 1.2em;
`

const FullPage = styled(Flex)`
  @media screen and (min-width: ${props => props.theme.breakpoints[0]}) {
    height: calc(100vh - 70px);
    padding-top: 0;
    padding-bottom: 0;
  }

  main {
    height: 100%;
    padding-right: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    p.pitch {
      margin-top: 20px;
      margin-bottom: 10px;
      max-width: 500px;
    }
  }

  img.landing {
    width: 550px;
    height: auto;
    align-self: center;
    @media screen and (max-width: ${props => props.theme.breakpoints[0]}) {
      display: none;
    }
  }
`

interface ISlidesState {
  step: 'intro' | 'slides'
  slide: number
}

const initialSlidesState: ISlidesState = {
  step: 'intro',
  slide: -1,
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
  const reduxDispatch = useDispatch()
  // Store current status in state
  const [slidesState, slidesDispatch] = React.useReducer(slidesReducer, initialSlidesState)

  // Slides data
  const slides = [
    {
      title: 'Créez votre campagne',
      description:
        'Créez votre brief de campagne en moins d’une minute. Il sera mis en avant auprès de +2000 influenceurs dans votre domaine d’activité.',
      buttonText: 'Étape suivante',
      handleButtonClick: () => slidesDispatch('NEXT_SLIDE'),
      image: campaignIllustration,
    },
    {
      title: "Recevez des propositions d'influenceurs",
      description:
        'Recevez rapidement des propositions d’influenceurs qui souhaitent découvrir votre produit. Vous pourrez consulter des données sur leurs communautés (localisation,   genre, authenticité des followers…) et chosir les meilleurs profils.',
      buttonText: 'Étape suivante',
      handleButtonClick: () => slidesDispatch('NEXT_SLIDE'),
      image: propositionsIllustration,
    },
    {
      title: 'Mesurez vos performances',
      description:
        'Consultez directement l’engagement généré par vos collaborations avec des influenceurs (likes, commentaires, traffic généré…)',
      buttonText: 'Créer ma campagne',
      handleButtonClick: () => reduxDispatch(createCampaign()),
      image: performancesIllustration,
    },
  ]

  // Intro before onboarding
  if (slidesState.step === 'intro') {
    return (
      <FullPage flexDirection="row" justifyContent="space-between" py="75px" pr={[0, 0, '100px']}>
        <main>
          <Title>Bienvenue sur Revolt</Title>
          <p className="pitch">
            Créez votre campagne d’influence marketing en ligne dès aujourd’hui et faites découvrir
            votre produit à une audience de plus de 1M de personnes.{' '}
          </p>
          <MainButton onClick={() => slidesDispatch('START_SLIDES')}>Commencer</MainButton>
        </main>
        <img
          src={landingIllustration}
          className="landing"
          alt="Partenariats avec des influenceurs"
        />{' '}
      </FullPage>
    )
  }

  // Onboarding slides
  return <OnboardingSlide {...slides[slidesState.slide]} index={slidesState.slide + 1} />
}

export default BrandOnboarding
