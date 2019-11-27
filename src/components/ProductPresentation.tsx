import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import moment from 'moment'
import { Box, Flex } from '@rebass/grid'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { gql } from 'apollo-boost'
import styled from 'styled-components'
import { TextLinkExternal } from '../styles/Button'
import { LabelText } from '../styles/Text'
import { palette } from '../utils/colors'
import { setFont, shadow } from '../utils/styles'
import CheckList from './CheckList'
import ErrorCard from './ErrorCard'
import Loader from './Loader'
import SplitView from './SplitView'
import { BRAND_FRAGMENT } from './CampaignFormBrand'
import { GetProduct, GetProductVariables } from '../__generated__/GetProduct'
import { useDeviceType } from '../utils/hooks'
import { showProductCategory } from '../utils/enums'
import ProductCarousel from './ProductCarousel'

const Styles = styled.div`
  h3 {
    ${setFont(600, 'normal')}
    &:not(:first-child) {
      margin-top: 20px;
    }
  }

  h4.brandName {
    ${setFont(500, 'big')}
    margin-bottom: 1rem;
  }

  img.logo {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  img.check {
    flex-shrink: 0;
    width: 25px;
    height: 25px;
    margin-right: 10px;
  }

  iframe.video {
    box-shadow: ${shadow._200};
    border-radius: 8px;
  }
`

const ExternalLink = styled(TextLinkExternal)<{ black?: boolean }>`
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
  max-width: 300px;
  ${props => props.black && `color: ${palette.grey._900}`}
`

export const PRODUCT_PRESENTATION_FRAGMENT = gql`
  fragment ProductPresentationFragment on Campaign {
    _id
    brand {
      ...BrandFragment
    }
    product {
      name
      pitch
      categories
      website
      youtubeLink
      pictures
      launchedAt
    }
    rules
    createdAt
  }
  ${BRAND_FRAGMENT}
`

export const GET_PRODUCT = gql`
  query GetProduct($campaignId: String!) {
    campaign(id: $campaignId) {
      ...ProductPresentationFragment
    }
  }
  ${PRODUCT_PRESENTATION_FRAGMENT}
`

interface Props {
  campaignId: string
  isInsideIframe?: boolean
}

const ProductPresentation: React.FC<Props> = ({ campaignId, isInsideIframe }) => {
  const { data: { campaign } = { campaign: null }, loading, error } = useQuery<
    GetProduct,
    GetProductVariables
  >(GET_PRODUCT, { variables: { campaignId } })

  const deviceType = useDeviceType()

  if (loading) {
    return <Loader fullScreen />
  }
  if (error) {
    return <ErrorCard message="Could not show product" />
  }

  const { brand, product, rules } = campaign

  const fullLink =
    product.website && `${product.website.startsWith('http') ? '' : 'http://'}${product.website}`

  return (
    <Styles>
      <Flex
        flexDirection={['column', 'column', 'row']}
        justifyContent={['flex-start', 'flex-start', 'space-between']}
      >
        {/* Left column on desktop */}
        <Box mt="1.8rem" width={[1, 1, 6 / 12]}>
          {/* Main medias carousel */}
          <ProductCarousel product={product} isInsideIframe={isInsideIframe} />
          {/* Other info */}
          <LabelText grey withMargin>
            Genres
          </LabelText>
          <p>{product.categories.map(_cat => showProductCategory(_cat)).join(', ')}</p>
          <Box>
            <LabelText grey withMargin>
              Website
            </LabelText>
            <ExternalLink
              // Preprend http:// if needed
              href={fullLink}
              title={product.name}
              target="_blank"
            >
              {product.website}
            </ExternalLink>
          </Box>
          <LabelText grey withMargin>
            Publisher
          </LabelText>
          {brand.name}
          {product.launchedAt && (
            <>
              <LabelText grey withMargin>
                Release date
              </LabelText>
              {moment(product.launchedAt).format('MMMM Do YYYY')}
            </>
          )}
        </Box>
        {/* Right column on desktop */}
        <Box width={[1, 1, 6 / 12]} mt={['2rem', '2rem', '-2rem']} pl={[0, 0, '5rem']}>
          <SplitView
            title="About the product"
            noBorder={deviceType === 'desktop'}
            ratio={3.5 / 12}
            stacked
          >
            <p style={{ whiteSpace: 'pre-line' }}>{product.pitch}</p>
          </SplitView>
          <Box>
            <SplitView title="Rules" ratio={3.5 / 12} stacked>
              <CheckList items={rules} />
            </SplitView>
          </Box>
        </Box>
      </Flex>
    </Styles>
  )
}

export default ProductPresentation
