import React, { useState } from 'react'
import { Box, Flex } from '@rebass/grid'
import { LabelText, SubTitle } from '../styles/Text'
import { MainButton } from '../styles/Button'
import OrderedList from '../components/OrderedList'
import styled from 'styled-components'
import { setFont } from '../utils/styles'
import { FormInputLabel, FormInput } from '../styles/Form'
import { Price } from '../styles/Price'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GetCreatorReferredBrandEmails } from '../__generated__/GetCreatorReferredBrandEmails'
import ErrorCard from './ErrorCard'
import {
  AddReferredBrandEmail,
  AddReferredBrandEmailVariables,
} from '../__generated__/AddReferredBrandEmail'

const illustrationSource = require('../images/illustrations/ambassador.svg')

const Styles = styled.div`
  .illustration {
    display: block;
    width: 25rem;
    height: auto;
    @media screen and (max-width: ${props => props.theme.breakpoints[1]}) {
      display: none;
    }
  }

  .link {
    ${setFont(600, 'normal')}
  }

  ul.list {
    list-style: unset;
    margin-bottom: 1rem;
    li {
      margin-left: 2rem;
    }
  }
`

const GET_CREATOR_REFERRED_BRAND_EMAILS = gql`
  query GetCreatorReferredBrandEmails {
    session {
      creator {
        _id
        referredBrandEmails
      }
    }
  }
`

const ADD_REFERRED_BRAND_EMAIL = gql`
  mutation AddReferredBrandEmail($brandEmail: String!) {
    addReferredBrandEmail(brandEmail: $brandEmail) {
      _id
      referredBrandEmails
    }
  }
`

export const AMBASSADOR_BRAND_REWARD = 50
const brandSteps = [
  'A brand contacts you by email',
  "Your enter the brand's email below",
  'We contact the brand on your behalf',
  `If the brand creates a campaign on Revolt, we give you $${AMBASSADOR_BRAND_REWARD}`,
]

interface Props {
  creatorId: string
}

const AmbassadorProgramBrands: React.FC<Props> = ({ creatorId }) => {
  const [email, setEmail] = useState<string>('')
  const { data: { session } = { session: null }, loading, error } = useQuery<
    GetCreatorReferredBrandEmails,
    {}
  >(GET_CREATOR_REFERRED_BRAND_EMAILS)
  const [addReferredBrandEmail, { loading: addLoading, error: addError }] = useMutation<
    AddReferredBrandEmail,
    AddReferredBrandEmailVariables
  >(ADD_REFERRED_BRAND_EMAIL)

  const handleAddBrand = () => {
    addReferredBrandEmail({ variables: { brandEmail: email } })
    setEmail('')
  }

  return (
    <Styles>
      <SubTitle>Invite brands and earn a reward</SubTitle>
      <Flex
        flexDirection="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        flexWrap="wrap"
        mb={['2rem', '2rem', 0]}
      >
        {/* Creator referral */}
        <Box width={[1, 1, 8 / 12]}>
          <p>
            We give you ${AMBASSADOR_BRAND_REWARD} each time you bring a qualified influencer on the
            platform.
          </p>
          <LabelText withMargin>How it works</LabelText>
          <OrderedList items={brandSteps} />
          <LabelText withMargin>Your invited brands</LabelText>
          {error && <ErrorCard message="Could not show the brands you invited" />}
          {loading ? (
            <p>Loading...</p>
          ) : session.creator.referredBrandEmails.length === 0 ? (
            <p>You haven't invited any brands yet</p>
          ) : (
            <>
              <p>You have invited the following brands so far:</p>
              <ul className="list">
                {session.creator.referredBrandEmails.map(_email => (
                  <li key={_email}>{_email}</li>
                ))}
              </ul>
              <p>
                If these brands all create a campaign, you'll earn{' '}
                <Price>
                  ${session.creator.referredBrandEmails.length * AMBASSADOR_BRAND_REWARD}
                </Price>
              </p>
            </>
          )}
          <LabelText withMargin>Invite a brand</LabelText>
          <p>Invite another brand earn ${AMBASSADOR_BRAND_REWARD}</p>
          <Box width={[1, 10 / 12, 8 / 12]}>
            <FormInputLabel withMargin>
              Brand email
              <FormInput
                value={email}
                type="email"
                onChange={e => setEmail(e.target.value)}
                hasLabel
                placeholder="contact@brand.com"
              />
            </FormInputLabel>
          </Box>
          {addError && <ErrorCard message="Could not add the brand" />}
          <MainButton disabled={email.length === 0 || addLoading} onClick={handleAddBrand}>
            {addLoading ? 'Inviting brand...' : 'Invite brand'}
          </MainButton>
        </Box>
        <Box width={[0, 0, 4 / 12]}>
          <img src={illustrationSource} alt="ambassador" className="illustration" />
        </Box>
      </Flex>
    </Styles>
  )
}

export default AmbassadorProgramBrands
