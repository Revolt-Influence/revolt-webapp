import React, { useEffect, useState, useRef } from 'react'
import { Flex, Box } from '@rebass/grid'
import gql from 'graphql-tag'
import { FormInputLabel, FormInput, FormTextarea } from '../styles/Form'
import DropImage from './DropImage'
import SplitView from './SplitView'
import { GetCampaign_campaign_product } from '../__generated__/GetCampaign'
import { CAMPAIGN_SAVE_DEBOUNCE } from '../pages/CampaignForm'
import { useDebouncedCallback } from 'use-debounce/lib'
import { CampaignProductInput } from '../__generated__/globalTypes'
import {
  UpdateCampaignProduct,
  UpdateCampaignProductVariables,
} from '../__generated__/UpdateCampaignProduct'
import { useMutation } from '@apollo/react-hooks'
import Toast from './Toast'

const UPDATE_CAMPAIGN_PRODUCT = gql`
  mutation UpdateCampaignProduct($campaignProduct: CampaignProductInput!, $campaignId: String!) {
    updateCampaignProduct(campaignProduct: $campaignProduct, campaignId: $campaignId) {
      _id
      product {
        name
        description
        website
        pictures
        youtubeLink
      }
    }
  }
`

interface Prop {
  product: GetCampaign_campaign_product
  campaignId: string
}

const CampaignFormProduct: React.FC<Prop> = ({ product, campaignId }) => {
  // Omit brand data that doesn't belong in the input type
  const { __typename, ...productInputData } = product

  // Update local form state
  const [productInput, setProductInput] = useState<CampaignProductInput>(productInputData)
  const [hasSaved, setHasSaved] = useState<boolean>(false)

  // Use a ref to prevent stale data in the event handle
  const productInputRef = useRef<CampaignProductInput>()
  useEffect(() => {
    productInputRef.current = productInput
  })

  const [debouncedCallback] = useDebouncedCallback(() => {
    updateProduct({ variables: { campaignId, campaignProduct: productInput } })
  }, CAMPAIGN_SAVE_DEBOUNCE)

  const handleUpdateProduct = (update: Partial<CampaignProductInput>) => {
    setHasSaved(false)
    if (update.pictures) {
      setProductInput({ ...productInputRef.current, ...update })
    } else {
      setProductInput({ ...productInput, ...update })
    }
    debouncedCallback()
  }

  // Prepare save to server request
  const [updateProduct, { error }] = useMutation<
    UpdateCampaignProduct,
    UpdateCampaignProductVariables
  >(UPDATE_CAMPAIGN_PRODUCT, {
    onCompleted: () => setHasSaved(true),
  })

  return (
    <SplitView title="Your game" ratio={4 / 12} stacked>
      <>
        {/* Notifications */}
        {hasSaved && <Toast nature="success" text="Changes saved" disappear />}
        {error && <Toast nature="error" text="Could not save changes" disappear />}
        {/* Form */}
        <Flex flexDirection="row" alignItems="flex-start" flexWrap="wrap">
          <Box width={[1, 1, 6 / 12]} pr={[0, 0, '1rem']}>
            {/* Product name */}
            <FormInputLabel>
              Game name
              <FormInput
                value={productInput.name}
                onChange={e => handleUpdateProduct({ name: e.target.value })}
                hasLabel
              />
            </FormInputLabel>
            <FormInputLabel>
              Lien vers plus de détails
              {/* Link to more details */}
              <FormInput
                value={productInput.website}
                onChange={e => handleUpdateProduct({ website: e.target.value })}
                placeholder="URL"
                hasLabel
              />
            </FormInputLabel>
          </Box>
          {/* Photo upload */}
          <Box width={[1, 1, 6 / 12]} pl={[0, 0, '1rem']} mt={['15px', 0, 0]}>
            <FormInputLabel>
              Photo du cadeau
              <DropImage
                handleDrop={newPhoto => handleUpdateProduct({ pictures: [newPhoto] })}
                preset="campaign_gift"
                currentImage={productInput.pictures[0]}
                idealSize="800x600 pixels (4:3)"
              />
            </FormInputLabel>
          </Box>
        </Flex>
        {/* Other info */}
        <FormInputLabel>
          Description du cadeau
          <FormTextarea
            value={productInput.description}
            rows={4}
            onChange={e => handleUpdateProduct({ description: e.target.value })}
            hasLabel
          />
        </FormInputLabel>
      </>
    </SplitView>
  )
}

export default CampaignFormProduct
