import React, { useState, useCallback, useEffect } from 'react'
import { useDropzone, DropzoneOptions } from 'react-dropzone'
import styled from 'styled-components'
import { MainButton } from '../styles/Button'
import { request } from '../utils/request'
import { setOutline } from '../utils/styles'
import { palette } from '../utils/colors'
import { truncateString } from '../utils/strings'
import { useWindowSize } from '../utils/hooks'
import ErrorCard from './ErrorCard'

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
  const [newImages, setNewImages] = useState<{ name: string; data: string }[]>([])
  const [error, setError] = useState(null)
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const { width } = useWindowSize()

  // useEffect(() => {
  //   console.log('current iamages changed', currentImages)
  // }, [currentImages])

  // Handle drop/select function
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Reset state
      setError(null)
      // Save image to local state as base64 for display purposes
      const reader = new FileReader()
      reader.onload = () => {
        const imagesData = acceptedFiles.map(_file => ({
          name: acceptedFiles[0].name,
          data: reader.result as string,
        }))
        console.log(acceptedFiles, imagesData)
        setNewImages(imagesData)
      }
      if (acceptedFiles.length > 0) {
        reader.readAsDataURL(acceptedFiles[0] as Blob)
        // Upload to cloudinary then send to parent
        setIsUploading(true)
        request
          .post('https://api.cloudinary.com/v1_1/influencerz/upload')
          .field('file', acceptedFiles[0])
          .field('upload_preset', preset)
          .then(({ body }) => {
            handleDrop(body.secure_url)
            setIsUploading(false)
          })
          .catch(error => setError(error))
      }
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
        <>
          {newImages.length > 0
            ? newImages.map(_newImage => (
                <DroppedImagePreview key={`${_newImage.name}-${Date.now()}`}>
                  {console.log('from new image', _newImage)}
                  <img
                    src={_newImage && _newImage.data}
                    alt={(_newImage && _newImage.name) || 'Game promo'}
                  />
                  <p>{_newImage && _newImage.name}</p>
                </DroppedImagePreview>
              ))
            : currentImages.map(_currentImage => (
                <DroppedImagePreview key={_currentImage}>
                  {console.log('from current image', _currentImage)}
                  <img src={_currentImage} alt="Game promo" />
                </DroppedImagePreview>
              ))}
        </>
      )}
      {/* Don't suggest drag and drop on mobile */}
      {!isUploading && width > 700 && newImages.length === 0 && `Faites glisser une image ici`}
      {!isUploading && newImages.length !== 0 && `Votre image est prête`}
      {isUploading && 'Chargement de votre image...'}
      {idealSize && <p className="details">Format idéal : {idealSize}</p>}
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
        Sélectionner un fichier
      </MainButton>
    </DropStyles>
  )
}

export default DropImage
