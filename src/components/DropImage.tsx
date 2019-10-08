import React, { useState, useCallback } from 'react'
import { useDropzone, DropzoneOptions } from 'react-dropzone'
import styled from 'styled-components'
import { MainButton } from '../styles/Button'
import { request } from '../utils/request'
import { setOutline, shadow } from '../utils/styles'
import { palette } from '../utils/colors'
import { truncateString } from '../utils/strings'
import { useWindowSize } from '../utils/hooks'
import ErrorCard from './ErrorCard'
import { Flex } from '@rebass/grid'

const closeSource = require('../images/icons/close.svg')

interface IDropProps {
  isDragReject: boolean
  isDragActive: boolean
  isUploading: boolean
}

const getDropstylesColor = (props: IDropProps) => {
  if (props.isDragReject) {
    return palette.red._100
  }
  if (props.isDragActive) {
    return palette.green._100
  }
  return palette.grey._100
}

const DropStyles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 2.5rem 0;
  margin-top: 4px;
  border-width: 2px;
  border-radius: 8px;
  border: 2px solid ${palette.grey._200};
  ${(props: IDropProps) => {
    if (props.isDragActive) {
      return setOutline('blue')
    }
    if (props.isDragReject) {
      return setOutline('red')
    }
    if (props.isUploading) {
      return setOutline('orange')
    }
  }}
  background: ${(props: IDropProps) => getDropstylesColor(props)};

  p.details {
    color: ${palette.grey._500};
  }
`

const DroppedImagePreview = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-radius: 4px;
  border: 2px solid ${palette.grey._200};
  &:not(:last-child) {
    margin-right: 2rem;
  }
  img.preview {
    /* width: 10rem; */
    max-width: 10rem;
    /* height: 7.5rem; */
    max-height: 7.5rem;
    object-fit: contain;
  }
  margin-bottom: 1rem;
  p {
    ${truncateString('200px')}
  }
  button.close {
    position: absolute;
    z-index: 200;
    top: -1.5rem;
    left: calc(100% - 1.5rem);
    background: ${palette.grey._50};
    box-shadow: ${shadow._200};
    width: 3rem;
    height: 3rem;
    padding: 9px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    transition: 0.3s all ease-in-out;
    &:hover {
      box-shadow: ${shadow._400};
    }
    > img.close {
      width: 2.4rem;
      height: 2.4rem;
    }
  }
`

interface Props {
  handleDrop: (urls: string[]) => void
  preset: string
  allowMultiple?: boolean
  maxImages?: number
  currentImages: string[]
  idealSize?: string
}

const DropImage: React.FC<Props> = ({
  handleDrop,
  preset,
  currentImages,
  idealSize,
  allowMultiple,
  maxImages,
}) => {
  const [error, setError] = useState(null)
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const { width } = useWindowSize()

  // Handle drop/select function
  const onDrop = useCallback(
    (newAcceptedFiles: File[]) => {
      // Serate function since useCallback doesn't support async function as argument
      const handleAcceptedFiles = async (acceptedFiles: File[]) => {
        // Reset state
        setError(null)
        if (acceptedFiles.length > 0) {
          setIsUploading(true)
          const uploadImagesPromises: Promise<string>[] = acceptedFiles.map(
            async (_acceptedFile, _acceptedIndex) => {
              // Upload to cloudinary then send to parent
              try {
                const response = await request
                  .post('https://api.cloudinary.com/v1_1/revolt/upload')
                  .field('file', _acceptedFile)
                  .field('upload_preset', preset)
                return response.body.secure_url as string
              } catch (e) {
                setError(e)
              }
            }
          )
          const cloudinaryUrls = await Promise.all(uploadImagesPromises)
          // Add new images to the current ones
          const imagesToSave = [...currentImages, ...cloudinaryUrls].slice(0, maxImages)
          handleDrop(imagesToSave)
          setIsUploading(false)
        }
      }

      // Actually run the function
      handleAcceptedFiles(newAcceptedFiles)
    },
    [currentImages, handleDrop, maxImages, preset]
  )

  const dropSettings: DropzoneOptions = {
    accept: 'image/*',
    multiple: !!allowMultiple,
    onDrop,
  }
  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone(dropSettings)

  const handleRemoveImage = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imageToRemove: string
  ) => {
    e.stopPropagation()
    handleDrop(currentImages.filter(_image => _image !== imageToRemove))
  }

  return (
    <DropStyles
      {...getRootProps()}
      isDragActive={isDragActive}
      isDragReject={isDragReject}
      isUploading={isUploading}
    >
      {error ? (
        <ErrorCard message="Upload failed" />
      ) : (
        // Show current or new image
        <Flex flexDirection="row" justifyContent="center" flexWrap="wrap">
          {currentImages.map(_currentImage => (
            <DroppedImagePreview key={_currentImage}>
              <img className="preview" src={_currentImage} alt="Game promo" />
              {/* Remove button only is multiple allowed */}
              {allowMultiple && (
                <button
                  className="close"
                  onClick={e => handleRemoveImage(e, _currentImage)}
                  type="button"
                >
                  <img src={closeSource} alt="close" className="close" />
                </button>
              )}
            </DroppedImagePreview>
          ))}
        </Flex>
      )}
      {/* Don't suggest drag and drop on mobile */}
      {!isUploading &&
        width > 700 &&
        currentImages.length === 0 &&
        `Drop ${allowMultiple ? 'images' : 'an image'} here`}
      {isUploading && `Uploading your image${allowMultiple ? 's' : ''}...`}
      {idealSize && <p className="details">Ideal size: {idealSize}</p>}
      <input
        {...getInputProps()}
        style={{
          display: 'block !important',
          opacity: 0,
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
      <MainButton type="button" display="inline" smaller inverted>
        Add {allowMultiple ? 'images' : 'an image'}
      </MainButton>
    </DropStyles>
  )
}

DropImage.defaultProps = {
  maxImages: 4,
}

export default DropImage
