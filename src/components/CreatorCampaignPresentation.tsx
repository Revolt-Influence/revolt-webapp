import React, { useRef, useState, useCallback } from 'react'
import { useQuery } from '@apollo/react-hooks'
import moment from 'moment'
import { Box, Flex } from '@rebass/grid'
import Slider from 'react-slick'
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
import ImageWrapper from './ImageWrapper'
import Loader from './Loader'
import SplitView from './SplitView'
import { BRAND_FRAGMENT } from './CampaignFormBrand'
import {
  GetCreatorCampaign,
  GetCreatorCampaignVariables,
} from '../__generated__/GetCreatorCampaign'
import { useDeviceType } from '../utils/hooks'
import { getYoutubeEmbedLink, getYoutubeThumbnail } from '../utils/youtube'
import { showGameCategory } from '../utils/enums'

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
  isInsideIframe?: boolean
}

const CreatorCampaignPresentation: React.FC<Props> = ({ campaignId, isInsideIframe }) => {
  const { data: { campaign } = { campaign: null }, loading, error } = useQuery<
    GetCreatorCampaign,
    GetCreatorCampaignVariables
  >(GET_CREATOR_CAMPAIGN, { variables: { campaignId } })

  const deviceType = useDeviceType()

  const slider = useRef<Slider>(null)
  // const [currentSlide, setCurrentSlide] = useState<number>(0)
  const [frameWidth, setFrameWidth] = useState(0)
  const measuredRef = useCallback((node: HTMLElement) => {
    if (node != null) {
      setFrameWidth(node.offsetWidth)
    }
  }, [])

  if (loading) {
    return <Loader fullScreen />
  }
  if (error) {
    return <ErrorCard message="Could not show game" />
  }

  const { brand, product, rules } = campaign
  const hasYoutube = !!product.youtubeLink

  const fullLink =
    product.website && `${product.website.startsWith('http') ? '' : 'http://'}${product.website}`

  return (
    <Styles>
      {/* Load Slick styles if inside iframe */}
      {isInsideIframe && (
        <>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick-theme.min.css"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.css"
          />
        </>
      )}
      <Flex
        flexDirection={['column', 'column', 'row']}
        justifyContent={['flex-start', 'flex-start', 'space-between']}
      >
        {/* Left column on desktop */}
        <Box mt="1.8rem" width={[1, 1, 6 / 12]}>
          <Slider
            infinite
            easing="ease-in-out"
            ref={slider}
            focusOnSelect
            speed={300}
            // afterChange={newSlide => setCurrentSlide(newSlide)}
          >
            {hasYoutube && (
              <div ref={measuredRef}>
                <iframe
                  className="video"
                  width={frameWidth}
                  height={(frameWidth * 3) / 4}
                  src={getYoutubeEmbedLink(product.youtubeLink)}
                  title="Game demo"
                />
              </div>
            )}
            {product.pictures.map(_picture => (
              <ImageWrapper
                src={_picture}
                alt={product.name || 'Game'}
                key={_picture}
                ratio={4 / 3}
                placeholderText="No image available"
              />
            ))}
          </Slider>
          <Flex flexDirection="row" justifyContent="flex-start" flexWrap="wrap">
            {hasYoutube && (
              <Box
                as="button"
                width={3 / 4}
                px="0.5rem"
                style={{ flex: 1 }}
                onClick={() => slider.current.slickGoTo(0)}
              >
                <ImageWrapper
                  src={getYoutubeThumbnail(product.youtubeLink)}
                  alt={product.name || 'Game'}
                  ratio={4 / 3}
                  placeholderText="No image available"
                />
              </Box>
            )}
            {product.pictures.map((_picture, _index) => (
              <Box
                as="button"
                width={3 / 4}
                px="0.5rem"
                key={_picture}
                style={{ flex: 1 }}
                onClick={() => slider.current.slickGoTo(_index + (hasYoutube ? 1 : 0))}
              >
                <ImageWrapper
                  src={_picture}
                  alt={product.name || 'Game'}
                  ratio={4 / 3}
                  placeholderText="No image available"
                />
              </Box>
            ))}
          </Flex>
          <LabelText grey withMargin>
            Genres
          </LabelText>
          <p>{product.categories.map(_cat => showGameCategory(_cat)).join(', ')}</p>
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
          <LabelText grey withMargin>
            Release date
          </LabelText>
          {moment(product.launchedAt).format('MMMM Do YYYY')}
        </Box>
        {/* Right column on desktop */}
        <Box width={[1, 1, 6 / 12]} mt={['2rem', '2rem', '-2rem']} pl={[0, 0, '5rem']}>
          <SplitView
            title="About the game"
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

export default CreatorCampaignPresentation
