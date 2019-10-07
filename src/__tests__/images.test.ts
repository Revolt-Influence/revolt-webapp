import { applyCloudinaryTransformations } from '../utils/images'

it('applies cloudinary transformation', () => {
  // Sample photo from Cloudinary
  const originalUrl =
    'https://res.cloudinary.com/revolt/image/upload/v1567164956/campaigns/yvxcl1fgqx1kn63q8jid.jpg'
  // With tranformations
  const urlWithTransformations =
    'https://res.cloudinary.com/revolt/image/upload/f_auto,w_50,q_70/v1567164956/campaigns/yvxcl1fgqx1kn63q8jid.jpg'
  expect(applyCloudinaryTransformations(originalUrl, { width: 50, quality: 70 })).toBe(
    urlWithTransformations
  )
})
