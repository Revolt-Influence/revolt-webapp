import React from 'react'
import { useLastLocation } from 'react-router-last-location'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { Flex } from '@rebass/grid'
import { palette } from '../utils/colors'
import { Title } from '../styles/Text'

const backIcon = require('../images/icons/back.svg')

const BackButton = styled.button`
  background: ${palette.grey._50};
  flex-shrink: 0;
  width: 4rem;
  height: 4rem;
  padding: 0.5rem;
  border-radius: 50%;
  margin-top: -0.35rem;
  cursor: pointer;
  margin-right: 15px;
  transition: 0.3s all ease-in-out;
  &:hover {
    background: ${palette.grey._200};
  }
`

interface IPageHeaderProps extends RouteComponentProps {
  title: string
  destination?: string
  noMargin?: boolean
  smallerOnMobile?: boolean
}

const PageHeader: React.FC<IPageHeaderProps> = ({
  title,
  history,
  destination,
  noMargin,
  smallerOnMobile,
}) => {
  const lastLocation = useLastLocation()
  const goBack = () => {
    if (destination == null) {
      if (lastLocation == null) {
        // Is new tab, redirect home instead
        history.push('/')
      } else {
        history.goBack()
      }
    } else {
      history.push(destination)
    }
  }
  const marginTop = smallerOnMobile ? '2.2rem' : '2.5rem'
  const marginBottom = smallerOnMobile ? '2.3rem' : '2.7rem'
  return (
    <Flex
      flexDirection="row"
      justifyContent="flex-start"
      alignItems="flex-start"
      mt={noMargin ? 0 : marginTop}
      mb={noMargin ? 0 : marginBottom}
    >
      <BackButton onClick={goBack}>
        <img src={backIcon} alt="back" />
      </BackButton>
      <Title noMargin>{title}</Title>
    </Flex>
  )
}

export default withRouter(PageHeader)
