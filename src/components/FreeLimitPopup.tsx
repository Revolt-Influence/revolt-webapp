import React from 'react'
import styled from 'styled-components'
import LimitPopupWrapper from './LimitPopupWrapper'
import { MainLink } from '../styles/Button'
import FeaturesList from './FeaturesList'
import { setFont } from '../utils/styles'

const FormColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: left;
  padding: 20px;
  line-height: 25px;
`

const PopupTitle = styled.h2`
  ${setFont(600, 'big')}
  margin-bottom: 20px;
`

interface IFreeLimitPopupProps {}

class FreeLimitPopup extends React.Component<IFreeLimitPopupProps, {}> {
  render() {
    return (
      <LimitPopupWrapper>
        <FormColumn>
          <div>
            <PopupTitle>Vous avez trouvé une fonctionnalité Premium</PopupTitle>
            <FeaturesList plan="premium" />
          </div>
          <MainLink display="inline" to="/upgrade">
            Passer au Premium
          </MainLink>
        </FormColumn>
      </LimitPopupWrapper>
    )
  }
}

export default FreeLimitPopup
