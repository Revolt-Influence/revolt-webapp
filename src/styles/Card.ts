import styled, { css } from 'styled-components'
import { Box } from '@rebass/grid'
import { palette } from '../utils/colors'
import { shadow } from '../utils/styles'

interface IRadioCardProps {
  isActive: boolean
}

const RadioCard = styled.button`
  display: block;
  flex-shrink: 0;
  flex: 1;
  background: ${(props: IRadioCardProps) =>
    props.isActive ? palette.green._100 : palette.grey._100};
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  border-radius: 8px;
  padding: 13px 3px;
  padding-right: 10px;
  cursor: pointer;
  &:not(:first-child) {
    margin-left: 5px;
  }
  &:not(:last-child) {
    margin-right: 5px;
  }
  border: 2px solid
    ${(props: IRadioCardProps) => (props.isActive ? palette.green._300 : palette.grey._300)};
  img {
    width: 20px;
    height: 20px;
    margin-top: 3px;
    margin-right: 5px;
  }
  ${(props: IRadioCardProps) => {
    if (props.isActive) {
      return css`
        color: ${palette.green._900};
      `
    }
  }}
`

export { RadioCard }
