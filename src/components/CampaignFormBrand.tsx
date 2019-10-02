import React, { useRef, useEffect, useState } from 'react'
import equal from 'fast-deep-equal'
import { Flex, Box } from '@rebass/grid'
import SplitView from './SplitView'
import { FormInputLabel, FormInput } from '../styles/Form'
import DropImage from './DropImage'
import gql from 'graphql-tag'
import { UpdateBrandInput } from '../__generated__/globalTypes'
import { BrandFragment } from '../__generated__/BrandFragment'
import { useDebounce, useRenderCount } from '../utils/hooks'
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

  // Use a ref to prevent stale data in the event handle
  const brandInputRef = useRef<UpdateBrandInput>()
  useEffect(() => {
    brandInputRef.current = brandInput
  })

  // Update logcal form state
  const [brandInput, setBrandInput] = useState<UpdateBrandInput>(brandInputData)
  const handleUpdateBrand = (update: Partial<UpdateBrandInput>) => {
    setBrandInput({ ...brandInputRef.current, ...update })
  }

  // Prepare save to server request
  const [hasSaved, setHasSaved] = useState<boolean>(false)
  const [updateBrand, { error, loading }] = useMutation<UpdateBrand, UpdateBrandVariables>(
    UPDATE_BRAND,
    { onCompleted: () => setHasSaved(true) }
  )

  // Debounce to throttle server requests
  const debouncedBrandInput = useDebounce(brandInput, CAMPAIGN_SAVE_DEBOUNCE)
  const debounceIsObsolete = debouncedBrandInput !== brandInputData
  const renderCount = useRenderCount()
  // Save on server once debounced and fresh data are in sync
  React.useEffect(() => {
    if (!debounceIsObsolete && renderCount > 0) {
      // Save on server
      updateBrand({ variables: { id: _id, updatedBrand: brandInput } })
    }
  }, [_id, brandInput, debounceIsObsolete, renderCount, updateBrand])

  return (
    <div>
      {/* Notifications */}
      {hasSaved && <Toast nature="success" text="Changements enregistrés" disappear />}
      {error && <Toast nature="error" text="Échec de l'enregistrement" disappear />}
      {/* Brand section */}
      <SplitView title="Votre marque" stacked noBorder>
        <Flex flexDirection="row" alignItems="flex-start" flexWrap="wrap">
          <Box width={[1, 1, 6 / 12]} pr={[0, 0, '2rem']}>
            <FormInputLabel>
              Nom de la marque
              <FormInput
                value={brand.name}
                onChange={e => handleUpdateBrand({ name: e.target.value })}
                placeholder="Adidas"
                hasLabel
                required
              />
            </FormInputLabel>
            <FormInputLabel>
              Lien vers votre site
              <FormInput
                value={brand.website}
                onChange={e => handleUpdateBrand({ website: e.target.value })}
                placeholder="https://yoursite.com"
                hasLabel
                required
              />
            </FormInputLabel>
          </Box>
          <Box width={[1, 1, 6 / 12]} pr={[0, 0, '2rem']} mt={['15px', 0, 0]}>
            <FormInputLabel>
              Votre logo
              <DropImage
                handleDrop={newLogo => handleUpdateBrand({ logo: newLogo })}
                preset="brand_logo"
                currentImage={brand.logo}
                idealSize="400x400 pixels (1:1)"
              />
            </FormInputLabel>
          </Box>
        </Flex>
      </SplitView>{' '}
    </div>
  )
}

export default React.memo(CampaignFormBrand, (prevProps, newProps) =>
  equal(prevProps.brand, newProps.brand)
)