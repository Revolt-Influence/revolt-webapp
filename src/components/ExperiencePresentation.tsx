import { useQuery } from '@apollo/react-hooks'
import { Box, Flex } from '@rebass/grid'
import { gql } from 'apollo-boost'
import React from 'react'
import styled from 'styled-components'
import { TextLinkExternal } from '../styles/Button'
import { LabelText } from '../styles/Text'
import { palette } from '../utils/colors'
import { useWindowSize } from '../utils/hooks'
import { applyCloudinaryTransformations } from '../utils/images'
import { setFont } from '../utils/styles'
import { Experience, ExperienceVariables } from '../__generated__/Experience'
import CheckList from './CheckList'
import ErrorCard from './ErrorCard'
import ImageWrapper from './ImageWrapper'
import Loader from './Loader'
import SplitView from './SplitView'
import { BRAND_FRAGMENT } from './CampaignFormBrand'

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

const EXPERIENCE_PRESENTATION_FRAGMENT = gql`
  fragment ExperiencePresentation on Campaign {
    _id
    name
    description
    brand {
      ...BrandFragment
    }
    product {
      name
      description
      website
      youtubeLink
      pictures
    }
    rules
    createdAt
  }
  ${BRAND_FRAGMENT}
`

const GET_EXPERIENCE = gql`
  query Experience($campaignId: String!) {
    campaign(id: $campaignId) {
      ...ExperiencePresentation
    }
  }
  ${EXPERIENCE_PRESENTATION_FRAGMENT}
`

interface Props {
  experienceId: string
}

const ExperiencePresentation: React.FC<Props> = ({ experienceId }) => {
  const { data: { campaign: experience } = { campaign: null }, loading, error } = useQuery<
    Experience,
    ExperienceVariables
  >(GET_EXPERIENCE, { variables: { campaignId: experienceId } })

  const { width } = useWindowSize()
  const isMobile = width < 600

  if (loading) {
    return <Loader fullScreen />
  }
  if (error) {
    return <ErrorCard message="L'expérience n'a pas pu être affichée" />
  }

  const { brand, product, rules } = experience

  const fullLink =
    brand.website && `${brand.website.startsWith('http') ? '' : 'http://'}${brand.website}`

  return (
    <Styles>
      <Flex
        flexDirection={['column', 'column', 'row']}
        justifyContent={['flex-start', 'flex-start', 'space-between']}
      >
        {/* Left column on desktop */}
        <Box width={[1, 1, 6 / 12]} pr={[0, 0, '15rem']}>
          <SplitView title="Votre cadeau" stacked noBorder>
            <ImageWrapper
              src={product.pictures.length > 0 && product.pictures[0]}
              alt={product.name || 'Cadeau'}
              ratio={4 / 3}
              placeholderText="Pas d'image disponible"
            />
            <Box mt="2rem">
              <LabelText grey withMargin>
                Nom
              </LabelText>
              <p>{product.name}</p>
              <LabelText grey withMargin>
                Description
              </LabelText>
              <p style={{ whiteSpace: 'pre-line' }}>{product.description}</p>
              <LabelText grey withMargin>
                Lien vers le produit
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
        <Box width={[1, 1, 6 / 12]}>
          <SplitView title="La marque" ratio={3.5 / 12} stacked noBorder={!isMobile}>
            <Flex justifyContent="space-between" alignItems="flex-start" flexWrap="wrap">
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
                <LabelText grey>Nom</LabelText>
                <p>{brand.name}</p>
                <LabelText grey withMargin>
                  Site web
                </LabelText>
                <ExternalLink href={fullLink} title={brand.name} target="_blank" black>
                  {fullLink}
                </ExternalLink>
              </Box>
            </Flex>
          </SplitView>
          <Box>
            <SplitView title="La campagne" ratio={3.5 / 12} stacked>
              <p style={{ whiteSpace: 'pre-line' }}>{experience.description}</p>
            </SplitView>
          </Box>
          <Box>
            <SplitView title="Conditions" ratio={3.5 / 12} stacked>
              <LabelText grey withMargin>
                Règles
              </LabelText>
              <CheckList items={rules} />
            </SplitView>
          </Box>
        </Box>
      </Flex>
    </Styles>
  )
}

export { EXPERIENCE_PRESENTATION_FRAGMENT }
export default ExperiencePresentation
