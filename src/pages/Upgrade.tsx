import React from 'react'
import styled from 'styled-components'
import { Container, Col, Row } from '../utils/grid'
import { Title } from '../styles/Text'
import UpgradePlan from '../components/UpgradePlan'

const Style = styled.div`
  text-align: center;
  padding-bottom: 20px;
`

const Upgrade: React.FC<{}> = () => (
  <Style>
    <Container>
      <Title>Switch to Premium</Title>
      <Row justify="center">
        <Col size={6 / 12}>
          <UpgradePlan />
        </Col>
      </Row>
    </Container>
  </Style>
)

export default Upgrade
