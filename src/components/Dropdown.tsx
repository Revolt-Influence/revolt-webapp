import React from 'react'
import styled from 'styled-components'
import { Flex } from '@rebass/grid'
import { capitalizeFirstLetter, truncateString } from '../utils/strings'
import { shadow } from '../utils/styles'
import { palette } from '../utils/colors'

const arrowUp = require('../images/icons/arrowUp.svg')
const arrowDown = require('../images/icons/arrowDown.svg')

interface IStyleProps {
  expanded: boolean
}

const Style = styled.div`
  position: relative;
  margin: 0 20px;
  background: ${palette.grey._50};
  width: 250px;
  border: 2px solid ${palette.grey._200};
  transition: box-shadow 0.3s ease-in-out;
  border-radius: 8px;
  &:focus-within {
    box-shadow: ${shadow._300};
  }
  ${(props: IStyleProps) => `
    border-bottom-left-radius: ${props.expanded ? '0' : '4px'};
    border-bottom-right-radius: ${props.expanded ? '0' : '4px'};
  `}
`

const Selection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  line-height: 50px;
  padding: 0 10px;
  cursor: default;
  user-select: none;
  width: 100%;
  ${truncateString('100%')}
`

const List = styled.div`
  position: absolute;
  top: 100%;
  width: 100%;
  background: ${palette.grey._50};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  max-height: 200px;
  overflow-y: scroll;
  border-top: 1px solid ${palette.grey._200};
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  z-index: 200;
  box-shadow: ${shadow._200};
`

const ListItem = styled.button`
  display: block;
  padding: 0 10px;
  line-height: 40px;
  ${truncateString('100%')}
  cursor: default;
  &:not(:first-child) {
    border-top: 1px solid ${palette.grey._200};
  }
`

const SmallIcon = styled.button`
  width: 24px;
  height: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

interface IDropdownProps {
  options: string[]
  handleChange: (newSelection: string) => any
  selection: string
  name?: string
  withMargin?: boolean
}

const Dropdown: React.FC<IDropdownProps> = ({
  options,
  selection,
  handleChange,
  name,
  withMargin,
}) => {
  const [expanded, setExpanded] = React.useState<boolean>(false)

  // Expand or not expand
  const toggleSelf = () => setExpanded(!expanded)

  return (
    <Flex alignItems="baseline" mb={withMargin ? '1rem' : 0}>
      {name != null ? <p>{name} :</p> : null}
      <Style onClick={toggleSelf} expanded={expanded}>
        <Selection>
          <p>{capitalizeFirstLetter(selection)}</p>
          <SmallIcon>
            <img src={expanded ? arrowUp : arrowDown} alt={expanded ? 'close' : 'open'} />
          </SmallIcon>
        </Selection>
        {expanded ? (
          <List>
            {options
              .filter(option => option !== selection)
              .map((option, index) => (
                <ListItem key={index} onClick={() => handleChange(option)}>
                  {capitalizeFirstLetter(option)}
                </ListItem>
              ))}
          </List>
        ) : null}
      </Style>
    </Flex>
  )
}

export default Dropdown
