import { useQuery } from '@apollo/react-hooks'
import { Box, Flex } from '@rebass/grid'
import { gql } from 'apollo-boost'
import React from 'react'
import styled from 'styled-components'
import { TextLinkExternal } from '../styles/Button'
import { LabelText } from '../styles/Text'
import { palette } from '../utils/colors'
import { applyCloudinaryTransformations } from '../utils/images'
import { setFont } from '../utils/styles'
import CheckList from './CheckList'
import ErrorCard from './ErrorCard'
import ImageWrapper from './ImageWrapper'
import Loader from './Loader'
import SplitView from './SplitView'
import { BRAND_FRAGMENT } from './CampaignFormBrand'
import {
  GetCreatorCampaign,
  GetCreatorCampaignVariables,
} from '../__generated__/GetCreatorCampaign'
import { useDeviceType } from '../utils/hooks'

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

export const CREATOR_CAMPAIGN_PRESENTATION_FRAGMENT = gql`
  fragment CreatorCampaignPresentationFragment on Campaign {
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

const GET_CREATOR_CAMPAIGN = gql`
  query GetCreatorCampaign($campaignId: String!) {
    campaign(id: $campaignId) {
      ...CreatorCampaignPresentationFragment
    }
  }
  ${CREATOR_CAMPAIGN_PRESENTATION_FRAGMENT}
`

interface Props {
  campaignId: string
}

const CreatorCampaignPresentation: React.FC<Props> = ({ campaignId }) => {
  const { data: { campaign } = { campaign: null }, loading, error } = useQuery<
    GetCreatorCampaign,
    GetCreatorCampaignVariables
  >(GET_CREATOR_CAMPAIGN, { variables: { campaignId } })

  const deviceType = useDeviceType()

  if (loading) {
    return <Loader fullScreen />
  }
  if (error) {
    return <ErrorCard message="Could not show game" />
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
        <Box
          width={[1, 1, 6 / 12]}
          pr={[0, 0, '15rem']}
          my={deviceType === 'desktop' ? '-2rem' : 0}
        >
          <SplitView title="The game" stacked noBorder>
            <ImageWrapper
              src={product.pictures.length > 0 ? product.pictures[0] : null}
              alt={product.name || 'Cadeau'}
              ratio={4 / 3}
              placeholderText="No image available"
            />
            <Box mt="2rem">
              <LabelText grey withMargin>
                About the game
              </LabelText>
              <p style={{ whiteSpace: 'pre-line' }}>{product.pitch}</p>
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
          </SplitView>
        </Box>
        {/* Right column on desktop */}
        <Box width={[1, 1, 6 / 12]} mt="-2rem">
          <SplitView
            title="The publisher"
            noBorder={deviceType === 'desktop'}
            ratio={3.5 / 12}
            stacked
          >
            <Flex justifyContent="space-between" alignItems="center" flexWrap="wrap">
              <Box width={2 / 12} pr="1rem">
                <img
                  src={applyCloudinaryTransformations(brand.logo, {
                    width: 250,
                  })}
                  alt={brand.name}
                  className="logo"
                />
              </Box>
              <Box width={10 / 12} pl="1rem">
                <p>{brand.name}</p>
              </Box>
            </Flex>
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

export default CreatorCampaignPresentation
