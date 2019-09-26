import React from 'react'
import { Flex, Box } from '@rebass/grid'
import styled from 'styled-components'
import { ICampaign } from '../models/Campaign'
import SplitView from './SplitView'
import TaskCard from './TaskCard'
import CheckList from './CheckList'
import { setFont } from '../utils/styles'
import { TextLinkExternal } from '../styles/Button'
import { LabelText } from '../styles/Text'
import { palette } from '../utils/colors'
import ImageWrapper from './ImageWrapper'
import { getCurrencySymbol } from '../utils/currency'
import { useWindowSize } from '../utils/hooks'
import { applyCloudinaryTransformations } from '../utils/images'

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

interface IExperiencePresentationProps {
  experience: ICampaign
}

const ExperiencePresentation: React.FC<IExperiencePresentationProps> = ({ experience }) => {
  const {
    brief: { description },
    brand,
    gift,
    task,
  } = experience.settings
  const fullLink = brand.link && `${brand.link.startsWith('http') ? '' : 'http://'}${brand.link}`

  const { width } = useWindowSize()
  const isMobile = width < 600

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
              src={gift.picture}
              alt={gift.name || 'Cadeau'}
              ratio={4 / 3}
              placeholderText="Pas d'image disponible"
            />
            <Box mt="2rem">
              <LabelText grey withMargin>
                Nom
              </LabelText>
              <p>{gift.name}</p>
              <LabelText grey withMargin>
                Description
              </LabelText>
              <p style={{ whiteSpace: 'pre-line' }}>{gift.details}</p>
              <LabelText grey withMargin>
                Lien vers le produit
              </LabelText>
              <ExternalLink
                // Preprend http:// if needed
                href={fullLink}
                title={gift.name}
                target="_blank"
              >
                {gift.link}
              </ExternalLink>
              {gift.valueIsShown && (
                <>
                  <LabelText grey withMargin>
                    Prix réel
                  </LabelText>
                  <p>
                    {gift.value} {getCurrencySymbol(gift.currency)}
                  </p>
                </>
              )}
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
              <p style={{ whiteSpace: 'pre-line' }}>{description}</p>
            </SplitView>
          </Box>
          <Box>
            <SplitView title="Votre revue" ratio={3.5 / 12} stacked>
              <TaskCard task={task} />
            </SplitView>
          </Box>
          <Box>
            <SplitView title="Conditions" ratio={3.5 / 12} stacked>
              <LabelText grey withMargin>
                Règles
              </LabelText>
              <CheckList items={task.rules} />
            </SplitView>
          </Box>
        </Box>
      </Flex>
    </Styles>
  )
}

export default ExperiencePresentation
