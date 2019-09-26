import React from 'react'
import { BlueText } from '../styles/Text'
import { Plan } from '../models/Session'
import CheckList from './CheckList'

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
  const relevantFeatures = plan === 'free' ? freeFeatures : premiumFeatures

  return (
    <>
      {plan === 'free' ? (
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
