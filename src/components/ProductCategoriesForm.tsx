import React from 'react'
import { ProductCategory } from '../__generated__/globalTypes'
import { Flex, Box } from '@rebass/grid'
import CheckBox from './CheckBox'
import { showProductCategory } from '../utils/enums'

const possibleCategories = Object.values(ProductCategory) as ProductCategory[]

interface Props {
  selectedCategories: ProductCategory[]
  handleNewSelectedCategories: (newSelectedCategories: ProductCategory[]) => void
}

const ProductCategoriesForm: React.FC<Props> = ({
  selectedCategories,
  handleNewSelectedCategories,
}) => {
  const handleToggleCategory = (categoryToToggle: ProductCategory) => {
    const wasCheckedBefore = selectedCategories.includes(categoryToToggle)
    let newSelection: ProductCategory[]
    if (wasCheckedBefore) {
      // Remove from selection
      newSelection = selectedCategories.filter(_category => _category !== categoryToToggle)
    } else {
      // Add to selection
      newSelection = [...selectedCategories, categoryToToggle]
    }
    handleNewSelectedCategories(newSelection)
  }
  return (
    <Flex flexDirection="row" flexWrap="wrap">
      {possibleCategories.map(_category => (
        <Box key={_category} width={[6 / 12, 6 / 12, 4 / 12]}>
          <CheckBox
            text={showProductCategory(_category)}
            isChecked={selectedCategories.includes(_category)}
            handleClick={() => handleToggleCategory(_category)}
          />
        </Box>
      ))}
    </Flex>
  )
}

export default ProductCategoriesForm
