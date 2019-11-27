import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { ContainerBox } from '../styles/grid'
import PageHeader from '../components/PageHeader'
import InfoCard from '../components/InfoCard'
import { usePageTitle } from '../utils/hooks'
import { FormInputLabel, FormInput } from '../styles/Form'
import { PRODUCT_PRESENTATION_FRAGMENT } from '../components/ProductPresentation'
import { CreateCampaign, CreateCampaignVariables } from '../__generated__/CreateCampaign'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { GET_CAMPAIGNS } from './CampaignsList'
import { MainButton } from '../styles/Button'
import { GET_SESSION } from '../components/Session'
import { GetSession } from '../__generated__/GetSession'
import ErrorCard from '../components/ErrorCard'
import gql from 'graphql-tag'
import { Box } from '@rebass/grid'

export const CREATE_CAMPAIGN = gql`
  mutation CreateCampaign($campaignData: CreateCampaignInput!) {
    createCampaign(campaignData: $campaignData) {
      ...ProductPresentationFragment
      collabs {
        _id
        status
      }
    }
  }
  ${PRODUCT_PRESENTATION_FRAGMENT}
`

const PreCampaignForm: React.FC<{}> = () => {
  usePageTitle('Create a campaign')

  // Form state
  const {
    data: { session },
  } = useQuery<GetSession>(GET_SESSION, { fetchPolicy: 'cache-only' })
  const [product, setProduct] = useState<string>('')
  const [website, setWebsite] = useState<string>('')
  const [brand, setBrand] = useState<string>(session.user.company || '')

  // Publish campaign
  const history = useHistory()
  const [createCampaign, { loading, error }] = useMutation<CreateCampaign, CreateCampaignVariables>(
    CREATE_CAMPAIGN,
    {
      // Go to campaign page if campaign was created
      onCompleted: createdCampaign => {
        history.push(`/brand/campaigns/${createdCampaign.createCampaign._id}/dashboard?tab=brief`)
      },
      // Add created campaign to cache
      refetchQueries: [{ query: GET_CAMPAIGNS }],
    }
  )

  return (
    <ContainerBox>
      <PageHeader title="Create a campaign" />
      <InfoCard message="Tell us about your product and we will create a campaign for you" />
      <Box width={[1, 10 / 12, 6 / 12]}>
        <FormInputLabel withMargin>
          Product name
          <FormInput
            value={product}
            onChange={e => setProduct(e.target.value)}
            placeholder="My product"
            hasLabel
          />
        </FormInputLabel>
        <FormInputLabel>
          Product landing page
          <FormInput
            value={website}
            onChange={e => setWebsite(e.target.value)}
            placeholder="https..."
            hasLabel
          />
        </FormInputLabel>
        <FormInputLabel>
          Brand name
          <FormInput value={brand} onChange={e => setBrand(e.target.value)} hasLabel />
        </FormInputLabel>
        {error && <ErrorCard message="Could not create campaign" />}
        <MainButton
          disabled={loading || !brand || !website || !product}
          onClick={() =>
            createCampaign({
              variables: { campaignData: { brandName: brand, productName: product, website } },
            })
          }
        >
          {loading ? 'Creating the campaign...' : 'Create campaign'}
        </MainButton>
      </Box>
    </ContainerBox>
  )
}

export default PreCampaignForm
