import React from 'react'
import styled from 'styled-components'

// Absolute URL so that it works in an iframe
const checkIconSource =
  'https://res.cloudinary.com/revolt/image/upload/v1569512887/icons/added_green.svg'

const Feature = styled.div<{ noMargin: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: ${props => (props.noMargin ? 0 : '1rem')};
  align-items: flex-start;
`

const CheckIcon = styled.img`
  width: 3rem;
  height: 3rem;
  min-width: 3rem;
  min-height: 3rem;
  margin-right: 1rem;
  transform: translateY(-0.3rem);
`

interface ICheckListProps {
  items: string[]
  noMargin?: boolean
}

const CheckList: React.FC<ICheckListProps> = ({ items, noMargin }) => (
  <ul>
    {items.map((_item, index) => (
      <Feature noMargin={!!noMargin && index === 0} key={index}>
        <CheckIcon src={checkIconSource} alt="Dot" />
        {_item}
      </Feature>
    ))}
  </ul>
)

export default CheckList
