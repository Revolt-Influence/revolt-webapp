import React from 'react'
import styled from 'styled-components'
import LimitPopupWrapper from './LimitPopupWrapper'
import { MainLink } from '../styles/Button'
import FeaturesList from './FeaturesList'
import { setFont } from '../utils/styles'
import { Plan } from '../__generated__/globalTypes'

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
  margin-bottom: 30px;
`

interface IGuestLimitPopupProps {}

class GuestLimitPopup extends React.Component<IGuestLimitPopupProps, {}> {
  render() {
    return (
      <LimitPopupWrapper>
        <FormColumn>
          <div>
            <PopupTitle>Créez un compte pour découvrir de nouveaux influenceurs</PopupTitle>
            <FeaturesList plan={Plan.FREE} />
          </div>
          <MainLink display="inline" to="/signup">
            S'incrire gratuitement
          </MainLink>
        </FormColumn>
      </LimitPopupWrapper>
    )
  }
}

export default GuestLimitPopup
