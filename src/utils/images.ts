interface ImageOptions {
  width: number
  height: number
  quality: number // Between 1 and 100
}

function applyCloudinaryTransformations(
  cloudinaryLink: string,
  options: Partial<ImageOptions> = { quality: 80 }
): string {
  // Make sure it's a cloudinary link
  if (
    cloudinaryLink == null ||
    typeof cloudinaryLink !== 'string' ||
    !cloudinaryLink.includes('cloudinary.com')
  ) {
    // Return image URL with no transformations
    return cloudinaryLink
  }
  // Ensure HTTPS
  const secureCloudinaryLink = cloudinaryLink.replace(/^http:\/\//i, 'https://')
  // Split the cloudinary url in different sections
  const separator = '/image/upload'
  const [baseUrl, imagePath] = secureCloudinaryLink.split(separator)
  // Handle non-cloudinary images
  if (imagePath == null) {
    return cloudinaryLink
  }
  // Generate the options string section
  const defaultOptionsString = 'f_auto'
  const additionalOptionsString: string = Object.entries(options).reduce(
    (currentOptionsString, optionEntry) => {
      // Get cloudinary param name from option name
      const [key, value] = optionEntry as [keyof ImageOptions, number]
      switch (key) {
        case 'width':
          return `${currentOptionsString},w_${value}`
        case 'height':
          return `${currentOptionsString},h_${value}`
        case 'quality':
          return `${currentOptionsString},q_${value}`
        default:
          return currentOptionsString
      }
    },
    ''
  )
  const finalOptionsString = `${defaultOptionsString}${additionalOptionsString}`
  // Put the 3 sections together
  const transformedLink = `${baseUrl}${separator}/${finalOptionsString}${imagePath}`
  return transformedLink
}

function getCloudinarySourceSet(cloudinaryLink: string): string {
  const widths = [256, 512, 768, 1024, 1280]
  const setParts = widths.map(_width => {
    const link = applyCloudinaryTransformations(cloudinaryLink, { width: _width })
    return `${link} ${_width}w`
  })
  const srcSet = setParts.join(', ')
  return srcSet
}

export { applyCloudinaryTransformations, getCloudinarySourceSet }
