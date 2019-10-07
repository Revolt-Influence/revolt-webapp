import React from 'react'
import styled from 'styled-components'

// Absolute URL so that it works in an iframe
const checkIconSource =
  'https://res.cloudinary.com/revolt/image/upload/v1569512887/icons/added_green.svg'

const Feature = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 1.5rem;
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
}

const CheckList: React.FC<ICheckListProps> = ({ items }) => (
  <ul>
    {items.map((_item, index) => (
      <Feature key={index}>
        <CheckIcon src={checkIconSource} alt="Dot" />
        {_item}
      </Feature>
    ))}
  </ul>
)

export default CheckList
