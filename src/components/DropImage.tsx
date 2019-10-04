import React, { useState, useCallback, useRef, useEffect } from 'react'
import { useDropzone, DropzoneOptions } from 'react-dropzone'
import styled from 'styled-components'
import { MainButton } from '../styles/Button'
import { request } from '../utils/request'
import { setOutline } from '../utils/styles'
import { palette } from '../utils/colors'
import { truncateString } from '../utils/strings'
import { useWindowSize } from '../utils/hooks'
import ErrorCard from './ErrorCard'
import { Flex } from '@rebass/grid'

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
  padding: 20px 0;
  margin-top: 4px;
  border-width: 2px;
  border-radius: 5px;
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
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  img {
    width: 8rem;
    max-width: 100%;
    height: 5rem;
    object-fit: contain;
    margin-right: 1rem;
  }
  margin-bottom: 1rem;
  p {
    ${truncateString('200px')}
  }
`

interface Props {
  handleDrop: (urls: string[]) => void
  preset: string
  allowMultiple?: boolean
  currentImages: string[]
  idealSize?: string
}

const DropImage: React.FC<Props> = ({
  handleDrop,
  preset,
  currentImages,
  idealSize,
  allowMultiple,
}) => {
  // const [newImages, setNewImages] = useState<{ name: string; data: string }[]>([])
  const [error, setError] = useState(null)
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const { width } = useWindowSize()

  // const newImagesRef = useRef<{ name: string; data: string }[]>(newImages)

  // useEffect(() => {
  //   newImagesRef.current = newImages
  // }, [newImages])

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
          handleDrop(cloudinaryUrls)
          setIsUploading(false)
        }
      }

      // Actually run the function
      handleAcceptedFiles(newAcceptedFiles)
    },
    [handleDrop, preset]
  )

  const dropSettings: DropzoneOptions = {
    accept: 'image/*',
    multiple: !!allowMultiple,
    onDrop,
  }
  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone(dropSettings)

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
              <img src={_currentImage} alt="Game promo" />
            </DroppedImagePreview>
          ))}
        </Flex>
      )}
      {/* Don't suggest drag and drop on mobile */}
      {!isUploading &&
        width > 700 &&
        currentImages.length === 0 &&
        `Drop ${allowMultiple ? 'images' : 'an image'} here`}
      {!isUploading &&
        currentImages.length !== 0 &&
        `Your image${allowMultiple ? 's are' : 'is'} ready`}
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
        Select {allowMultiple ? 'images' : 'an image'}
      </MainButton>
    </DropStyles>
  )
}

export default DropImage
