import React, { useCallback, useState, useRef } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { getYoutubeEmbedLink, getYoutubeThumbnail } from '../utils/youtube'
import ImageWrapper from './ImageWrapper'
import { GetCampaign_campaign_product } from '../__generated__/GetCampaign'
import { Box, Flex } from '@rebass/grid'

interface Props {
  product: GetCampaign_campaign_product
  isInsideIframe?: boolean
}

const ProductCarousel: React.FC<Props> = ({ product, isInsideIframe }) => {
  const slider = useRef<Slider>(null)
  // const [currentSlide, setCurrentSlide] = useState<number>(0)
  const [frameWidth, setFrameWidth] = useState(0)
  const measuredRef = useCallback((node: HTMLElement) => {
    if (node != null) {
      setFrameWidth(node.offsetWidth)
    }
  }, [])

  const hasYoutube = !!product.youtubeLink

  return (
    <div>
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
      {/* Main slider */}
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
      {/* All media options */}
      <Flex flexDirection="row" justifyContent="flex-start" flexWrap="wrap" mt="1rem" mx="-0.5rem">
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
    </div>
  )
}

export default ProductCarousel
