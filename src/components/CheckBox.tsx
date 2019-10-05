import React from 'react'
import { Flex } from '@rebass/grid'
import { IconButtonWrapper } from '../styles/Icon'

const checkboxEmpty = require('../images/icons/checkboxEmpty.svg')
const checkboxChecked = require('../images/icons/checkboxChecked.svg')

interface ICheckBoxProps {
  text: string
  handleClick: () => any
  isChecked: boolean
  noMargin?: boolean
  disabled?: boolean
}

const CheckBox: React.FC<ICheckBoxProps> = ({
  text,
  handleClick,
  isChecked,
  noMargin,
  disabled,
}) => (
  <Flex
    as="button"
    type="button"
    flexDirection="row"
    onClick={disabled ? null : handleClick}
    mt={noMargin ? '0' : '1rem'}
    alignItems="flex-start"
    style={disabled ? { opacity: 0.5, cursor: 'not-allowed' } : null}
  >
    <IconButtonWrapper as="div" style={{ marginRight: 10, height: '22px' }}>
      <img src={isChecked ? checkboxChecked : checkboxEmpty} alt={isChecked ? 'yes' : 'no'} />
    </IconButtonWrapper>
    <p style={{ cursor: 'default' }}>{text}</p>
  </Flex>
)

export default CheckBox
