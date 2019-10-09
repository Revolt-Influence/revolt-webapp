import React, { useRef } from 'react'
import styled, { css } from 'styled-components'
import { shadow } from '../utils/styles'
import { palette } from '../utils/colors'
import { applyCloudinaryTransformations, getCloudinarySourceSet } from '../utils/images'
import { useRect } from '../utils/hooks'

interface IStylesProps {
  ratio: number // width by height, e.g.: 4/3, 16/9
  width?: string
  unstyled?: boolean
  objectFit?: 'cover' | 'contain'
}

const Styles = styled.div<IStylesProps>`
  position: relative;
  width: ${props => props.width};
  height: 0;
  padding-bottom: ${props => 100 / props.ratio}%; /* revert ratio to get height based on width */
  ${props =>
    props.unstyled
      ? null
      : css`
          overflow: hidden;
          border-radius: 8px;
          transition: 0.3s all ease-in-out;
          box-shadow: ${shadow._200};
          &:hover {
            box-shadow: ${shadow._300};
          }
        `}
  img.image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: ${props => props.objectFit};
  }
  .placeholder {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 1rem;
    background: ${palette.grey._200};
    color: ${palette.grey._500};
  }
  > .label {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
  }
`

interface IImageWrapperProps extends IStylesProps {
  src: string
  alt: string
  placeholderText?: string
  showLabel?: () => any
}

const ImageWrapper: React.FC<IImageWrapperProps> = ({
  src,
  alt,
  placeholderText,
  ratio,
  unstyled,
  objectFit,
  width,
  showLabel,
}) => {
  const selfRef = useRef()
  const { width: calculatedWidth } = useRect(selfRef)

  return (
    <div ref={selfRef}>
      {calculatedWidth > 0 && (
        <Styles ratio={ratio} unstyled={unstyled} objectFit={objectFit} width={width}>
          {src != null && src !== '' ? (
            <img
              className="image"
              srcSet={getCloudinarySourceSet(src)}
              src={applyCloudinaryTransformations(src)}
              alt={alt}
              sizes={`${calculatedWidth}px`}
            />
          ) : (
            <div className="placeholder">{placeholderText}</div>
          )}
          {showLabel && <div className="label">{showLabel()}</div>}
        </Styles>
      )}
    </div>
  )
}

ImageWrapper.defaultProps = {
  width: '100%',
  unstyled: false,
  objectFit: 'cover',
  placeholderText: 'Image non disponible',
}

export default ImageWrapper
