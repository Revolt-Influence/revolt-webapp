import React, { useState } from 'react'
import { Box, Flex } from '@rebass/grid'
import { LabelText, SubTitle } from '../styles/Text'
import { MainButton } from '../styles/Button'
import OrderedList from '../components/OrderedList'
import styled from 'styled-components'
import { setFont } from '../utils/styles'
import { FormInputLabel, FormInput } from '../styles/Form'

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

  ul,
  ol {
    list-style: unset;
    margin-bottom: 1rem;
    li {
      margin-left: 2rem;
    }
  }
`

const brandSteps = [
  'A brand contacts you by email',
  "Your enter the brand's email below",
  'We contact the brand on your behalf, and recommend that they manage their campaign on Revolt',
  'If the brand manages their campaign on Revolt, we give you $50',
]

interface Props {
  creatorId: string
}

const AmbassadorProgramBrands: React.FC<Props> = ({ creatorId }) => {
  const [email, setEmail] = useState<string>('')
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
          <p>We give you $5 each time you bring a qualified influencer on the platform.</p>
          <LabelText withMargin>How it works</LabelText>
          <OrderedList items={brandSteps} />
          <LabelText withMargin>Your brands</LabelText>
          <p>You have invited the following brands so far:</p>
          <ul>
            <li>brand@gmail.com</li>
            <li>brand@gmail.com</li>
            <li>brand@gmail.com</li>
          </ul>
          <LabelText withMargin>Invite a brand</LabelText>
          <p>Invite another brand earn $50 more</p>
          <FormInputLabel>
            Brand email
            <FormInput
              value={email}
              type="email"
              onChange={e => setEmail(e.target.value)}
              hasLabel
              placeholder="contact@brand.com"
            />
          </FormInputLabel>
          <MainButton disabled={email.length === 0}>Invite brand</MainButton>
        </Box>
        <Box width={[0, 0, 4 / 12]}>
          <img src={illustrationSource} alt="ambassador" className="illustration" />
        </Box>
      </Flex>
    </Styles>
  )
}

export default AmbassadorProgramBrands
