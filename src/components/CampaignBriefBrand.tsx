import React, { useRef } from 'react'
import equal from 'fast-deep-equal'
import { Flex, Box } from '@rebass/grid'
import SplitView from './SplitView'
import { FormInputLabel, FormInput } from '../styles/Form'
import { IBrand } from '../models/Brand'
import DropImage from './DropImage'

interface IProps {
  brand: IBrand
  setBrand: (newBrand: IBrand) => void
}

const CampaignBriefBrand: React.FC<IProps> = ({ brand, setBrand }) => {
  // Use a ref to prevent stale data in the event handle
  const brandRef = useRef<IBrand>()
  React.useEffect(() => {
    brandRef.current = brand
  })
  const handleLogoDrop = (newLogoUrl: string) => {
    setBrand({ ...brandRef.current, logo: newLogoUrl })
  }

  return (
    <div>
      {/* Brand section */}
      <SplitView title="Votre marque" stacked noBorder>
        <Flex flexDirection="row" alignItems="flex-start" flexWrap="wrap">
          <Box width={[1, 1, 6 / 12]} pr={[0, 0, '2rem']}>
            <FormInputLabel>
              Nom de la marque
              <FormInput
                value={brand.name}
                onChange={e => setBrand({ ...brand, name: e.target.value })}
                placeholder="Adidas"
                hasLabel
                required
              />
            </FormInputLabel>
            <FormInputLabel>
              Lien vers votre site
              <FormInput
                value={brand.link}
                onChange={e => setBrand({ ...brand, link: e.target.value })}
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
                handleDrop={handleLogoDrop}
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

export default React.memo(CampaignBriefBrand, (prevProps, newProps) =>
  equal(prevProps.brand, newProps.brand)
)
