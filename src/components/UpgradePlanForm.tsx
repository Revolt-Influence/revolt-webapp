import React from 'react'
import { CardElement, injectStripe } from 'react-stripe-elements'
import { Flex, Box } from '@rebass/grid'
import styled from 'styled-components'
import { fontStack, setFont } from '../utils/styles'
import { MainButtonSubmit } from '../styles/Button'
import { FormInputLabel, FormInput } from '../styles/Form'
import { palette } from '../utils/colors'
import ErrorCard from './ErrorCard'
import { CreditCardWrapper } from '../styles/CreditCardWrapper'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { UpgradeUser, UpgradeUserVariables } from '../__generated__/UpgradeUser'

const Price = styled.p`
  color: ${palette.green._500};
  margin-left: 15px;
  ${setFont(600, 'normal')}
`

const UPGRADE_USER = gql`
  mutation UpgradeUser($firstName: String!, $lastName: String!, $paymentToken: String!) {
    upgradeUser(firstName: $firstName, lastName: $lastName, paymentToken: $paymentToken) {
      _id
      plan
      creditCardLast4
    }
  }
`

const UpgradePlan: React.FC<any> = ({ stripe }) => {
  // Redux
  const [upgradeUser, { loading, error }] = useMutation<UpgradeUser, UpgradeUserVariables>(
    UPGRADE_USER
  )

  // Form state
  const [cardElementIsFocused, setCardElementIsFocused] = React.useState<boolean>()
  const [cardElementHasError, setCardElementHasError] = React.useState<boolean>()
  const [cardIsComplete, setCardIsComplete] = React.useState<boolean>()
  const [firstName, setFirstName] = React.useState<string>('')
  const [lastName, setLastName] = React.useState<string>('')
  const [address, setAddress] = React.useState<string>('')
  const [postalCode, setPostalCode] = React.useState<string>('')
  const [city, setCity] = React.useState<string>('')
  const [isCreatingToken, setIsCreatingToken] = React.useState<boolean>()
  const [tokenCreationHasFailed, setTokenCreationHasFailed] = React.useState<boolean>()

  const handleSwitchToPremium = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Submit payment
    setIsCreatingToken(true)
    try {
      const { token } = await stripe.createToken({
        name: `${firstName} ${lastName}`,
        address_line1: address,
        address_city: city,
        address_zip: postalCode,
      })
      upgradeUser({
        variables: {
          firstName,
          lastName,
          paymentToken: token.id,
        },
      })
    } catch {
      setTokenCreationHasFailed(true)
    }
    setIsCreatingToken(false)
  }

  return (
    <form onSubmit={handleSwitchToPremium}>
      {/* Credit card form */}
      <Flex justifyContent="space-between" flexWrap="wrap" mb="2rem">
        <Box width={[1, 1, 6 / 12]} pr={[0, 0, '1rem']}>
          <FormInputLabel>
            Prénom
            <FormInput
              type="fullname"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              placeholder="Jeanne"
              hasLabel
              required
            />
          </FormInputLabel>
        </Box>
        <Box width={[1, 1, 6 / 12]} pl={[0, 0, '1rem']}>
          <FormInputLabel>
            Nom
            <FormInput
              type="fullname"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              placeholder="Doe"
              hasLabel
              required
            />
          </FormInputLabel>
        </Box>
      </Flex>
      <Flex justifyContent="space-between" flexWrap="wrap" mb="2rem">
        <FormInputLabel style={{ paddingTop: 0 }}>
          Adresse de facturation
          <FormInput
            type="text"
            value={address}
            onChange={e => setAddress(e.target.value)}
            placeholder="4 rue de la Paix"
            hasLabel
            required
          />
        </FormInputLabel>
      </Flex>
      <Flex justifyContent="space-between" flexWrap="wrap" mb="2rem">
        <Box width={[1, 1, 6 / 12]} pr={[0, 0, '1rem']}>
          <FormInputLabel>
            Code postal
            <FormInput
              type="text"
              value={postalCode}
              onChange={e => setPostalCode(e.target.value)}
              placeholder="75002"
              hasLabel
              required
            />
          </FormInputLabel>
        </Box>
        <Box width={[1, 1, 6 / 12]} pl={[0, 0, '1rem']}>
          <FormInputLabel>
            Ville
            <FormInput
              type="text"
              value={city}
              onChange={e => setCity(e.target.value)}
              placeholder="Paris"
              hasLabel
              required
            />
          </FormInputLabel>
        </Box>
      </Flex>
      <FormInputLabel>Carte de crédit</FormInputLabel>
      <CreditCardWrapper isFocused={cardElementIsFocused} hasError={cardElementHasError}>
        <CardElement
          onFocus={() => setCardElementIsFocused(true)}
          onBlur={() => setCardElementIsFocused(false)}
          onChange={e => {
            setCardElementHasError(e.error != null)
            setCardIsComplete(e.complete)
          }}
          style={{
            base: {
              fontFamily: fontStack,
              fontSize: '16px',
              color: palette.grey._900,
            },
          }}
          hidePostalCode
        />
      </CreditCardWrapper>
      {/* Success card */}
      {error || tokenCreationHasFailed ? (
        <ErrorCard message="Le changement n'a pas pu être fait" />
      ) : null}
      {/* Submit button */}
      <Flex flexDirection="row" alignItems="baseline">
        <MainButtonSubmit
          type="submit"
          disabled={!cardIsComplete || loading || isCreatingToken || !firstName || !lastName}
          value={loading || isCreatingToken ? 'Passage au Premium...' : 'Passer au Premium'}
        />
        <Price>179€ par mois TTC</Price>
      </Flex>
    </form>
  )
}

export default injectStripe(UpgradePlan)
