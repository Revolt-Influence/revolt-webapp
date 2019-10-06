import React from 'react'
import { Flex } from '@rebass/grid'
import styled from 'styled-components'
import { LabelText, Title } from '../styles/Text'
import { MainButton } from '../styles/Button'

const Styles = styled(Flex)`
  @media screen and (min-width: ${props => props.theme.breakpoints[0]}) {
    height: calc(100vh - 70px);
    padding-top: 0;
    padding-bottom: 0;
  }

  .step {
    margin-bottom: 0.5rem;
  }
  .description {
    margin-top: 2rem;
  }

  .illustration {
    flex: 1;
    max-width: 600px;
    height: auto;
  }
`

interface IOnboardingSlideProps {
  title: string
  description: string
  index: number
  buttonText: string
  handleButtonClick: () => any
  image: any // Image or URL string
}

const OnboardingSlide: React.FunctionComponent<IOnboardingSlideProps> = ({
  title,
  description,
  index,
  buttonText,
  handleButtonClick,
  image,
}) => (
  <Styles
    flexDirection={['column', 'row', 'row']}
    justifyContent={['flex-start', 'space-between', 'space-between']}
    alignItems="center"
  >
    <Flex
      width={[1, 1, 1 / 2]}
      flexDirection="column"
      alignItems="flex-start"
      justifyContent={['flex-start', 'center', 'center']}
    >
      <LabelText className="step">Step {index}</LabelText>
      <Title noMargin>{title}</Title>
      {/* <h2 className="title">{title}</h2> */}
      <p className="description">{description}</p>
      <MainButton onClick={handleButtonClick} style={{ flexGrow: 0 }}>
        {buttonText}
      </MainButton>
    </Flex>
    <img className="illustration" src={image} alt={title} />
  </Styles>
)

export default OnboardingSlide
