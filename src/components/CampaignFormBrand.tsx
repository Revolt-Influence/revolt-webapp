import React, { useRef, useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { Flex, Box } from '@rebass/grid'
import SplitView from './SplitView'
import { FormInputLabel, FormInput } from '../styles/Form'
import DropImage from './DropImage'
import gql from 'graphql-tag'
import { UpdateBrandInput } from '../__generated__/globalTypes'
import { BrandFragment } from '../__generated__/BrandFragment'
import { CAMPAIGN_SAVE_DEBOUNCE } from '../pages/CampaignForm'
import { useMutation } from '@apollo/react-hooks'
import { UpdateBrandVariables, UpdateBrand } from '../__generated__/UpdateBrand'
import Toast from './Toast'

export const BRAND_FRAGMENT = gql`
  fragment BrandFragment on Brand {
    _id
    name
    logo
    website
  }
`

const UPDATE_BRAND = gql`
  mutation UpdateBrand($updatedBrand: UpdateBrandInput!, $id: String!) {
    updateBrand(updatedBrand: $updatedBrand, id: $id) {
      ...BrandFragment
    }
  }
  ${BRAND_FRAGMENT}
`

interface Props {
  brand: BrandFragment
}

const CampaignFormBrand: React.FC<Props> = ({ brand }) => {
  // Omit brand data that doesn't belong in the input type
  const { __typename, _id, ...brandInputData } = brand

  // Update local form state
  const [brandInput, setBrandInput] = useState<UpdateBrandInput>(brandInputData)
  const [hasSaved, setHasSaved] = useState<boolean>(false)

  // Use a ref to prevent stale data in the event handle
  const brandInputRef = useRef<UpdateBrandInput>()
  useEffect(() => {
    brandInputRef.current = brandInput
  })

  const [debouncedCallback] = useDebouncedCallback(() => {
    updateBrand({ variables: { id: _id, updatedBrand: brandInput } })
  }, CAMPAIGN_SAVE_DEBOUNCE)

  const handleUpdateBrand = (update: Partial<UpdateBrandInput>) => {
    setHasSaved(false)
    if (update.logo) {
      setBrandInput({ ...brandInputRef.current, ...update })
    } else {
      setBrandInput({ ...brandInput, ...update })
    }
    debouncedCallback()
  }

  // Prepare save to server request
  const [updateBrand, { error }] = useMutation<UpdateBrand, UpdateBrandVariables>(UPDATE_BRAND, {
    onCompleted: () => setHasSaved(true),
  })

  return (
    <div>
      {/* Notifications */}
      {hasSaved && <Toast nature="success" text="Changes saved" disappear />}
      {error && <Toast nature="error" text="Could not save changes" disappear />}
      {/* Brand section */}
      <SplitView title="Your brand" stacked>
        <Flex flexDirection="row" alignItems="flex-start" flexWrap="wrap">
          <Box width={[1, 1, 6 / 12]} pr={[0, 0, '2rem']}>
            <FormInputLabel>
              Publisher name
              <FormInput
                value={brandInput.name}
                onChange={e => handleUpdateBrand({ name: e.target.value })}
                placeholder="Adidas"
                hasLabel
                required
              />
            </FormInputLabel>
            <FormInputLabel>
              Publisher website
              <FormInput
                value={brandInput.website}
                onChange={e => handleUpdateBrand({ website: e.target.value })}
                placeholder="https://yoursite.com"
                hasLabel
                required
              />
            </FormInputLabel>
          </Box>
          <Box width={[1, 1, 6 / 12]} pr={[0, 0, '2rem']} mt={['15px', 0, 0]}>
            <FormInputLabel>
              Publisher logo
              <DropImage
                handleDrop={newLogos => handleUpdateBrand({ logo: newLogos[0] })}
                preset="brand_logo"
                currentImages={[brandInput.logo]}
                idealSize="400x400 pixels (1:1)"
              />
            </FormInputLabel>
          </Box>
        </Flex>
      </SplitView>
    </div>
  )
}

export default CampaignFormBrand
