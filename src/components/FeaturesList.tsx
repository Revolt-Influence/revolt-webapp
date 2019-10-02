import React from 'react'
import { BlueText } from '../styles/Text'
import CheckList from './CheckList'
import { Plan } from '../__generated__/globalTypes'

interface IFeaturesListProps {
  plan: Plan
}

const freeFeatures: string[] = [
  'Créez votre campagne',
  'Appel avec un expert en influence marketing',
]

const premiumFeatures: string[] = [
  'Une campagne en ligne',
  'Partenariats illimités',
  'Accès aux données sur la communauté des influenceurs',
  'Account manager dédié (téléphone et email)',
]

const FeaturesList: React.FC<IFeaturesListProps> = ({ plan }) => {
  const relevantFeatures = plan === Plan.FREE ? freeFeatures : premiumFeatures

  return (
    <>
      {plan === Plan.FREE ? (
        <p>
          Débloquez <BlueText>gratuitement</BlueText> de nouvelles fonctionnalités.
        </p>
      ) : (
        <p>
          Accédez à toutes nos fonctionnalités pour <BlueText>179€ / mois TTC</BlueText>.{' '}
        </p>
      )}
      <CheckList items={relevantFeatures} />
    </>
  )
}

export default FeaturesList
